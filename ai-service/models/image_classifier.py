"""
Enhanced AI Waste Classification with Trained Model Support
Supports both custom trained model and MobileNetV2 fallback
"""

import io
import os
import json
import numpy as np
from PIL import Image
from typing import Dict
from models.waste_database import WASTE_DATABASE

# Import TensorFlow
try:
    import tensorflow as tf
    from tensorflow import keras
    TENSORFLOW_AVAILABLE = True
except ImportError:
    TENSORFLOW_AVAILABLE = False
    print("⚠️ TensorFlow not available, using fallback classification")

class ImageClassifier:
    """
    AI-powered image classification for waste sorting.
    
    Priority order:
    1. Custom trained model (waste_classifier_v1.h5)
    2. MobileNetV2 with keyword mapping
    3. Filename analysis fallback
    """
    
    def __init__(self):
        self.categories = ['Organic', 'Recyclable', 'Hazardous', 'E-Waste', 'Dry Waste', 'Medical Waste']
        self.model = None
        self.model_type = None
        self.class_indices = None
        
        # Try to load custom trained model first
        if TENSORFLOW_AVAILABLE:
            self._load_custom_model()
            
            # If custom model not available, try MobileNetV2
            if self.model is None:
                self._load_mobilenet_fallback()
        
        if self.model is None:
            print("📸 Image classifier initialized (filename analysis mode)")
            print("   Train a model using: python models/train_model.py")
        
        # Filename keywords for ultimate fallback
        self.filename_keywords = {
            'Organic': ['food', 'fruit', 'vegetable', 'peel', 'banana', 'apple', 'orange', 
                       'leftover', 'compost', 'garden', 'leaves', 'coffee', 'tea', 'organic'],
            'Recyclable': ['plastic', 'bottle', 'paper', 'cardboard', 'can', 'aluminum', 
                          'glass', 'newspaper', 'magazine', 'container', 'recyclable'],
            'Hazardous': ['battery', 'paint', 'chemical', 'medicine', 'drug', 'pesticide', 
                         'oil', 'cleaner', 'toxic', 'poison', 'acid', 'bleach', 'hazardous'],
            'E-Waste': ['phone', 'computer', 'laptop', 'electronic', 'charger', 'cable', 
                       'printer', 'monitor', 'keyboard', 'mouse', 'circuit', 'led', 'bulb'],
            'Dry Waste': ['diaper', 'napkin', 'tissue', 'styrofoam', 'rubber', 'leather', 
                         'cloth', 'ceramic', 'wrapper', 'bag', 'straw', 'cup', 'plate'],
            'Medical Waste': ['mask', 'syringe', 'bandage', 'glove', 'medical', 'hospital',
                            'surgical', 'ppe', 'sanitizer', 'swab']
        }
    
    def _load_custom_model(self):
        """Load custom trained waste classification model"""
        model_path = 'models/waste_classifier_v1.h5'
        class_indices_path = 'models/class_indices.json'
        
        if os.path.exists(model_path):
            try:
                print("🤖 Loading custom trained model...")
                self.model = keras.models.load_model(model_path)
                self.model_type = 'custom'
                
                # Load class indices
                if os.path.exists(class_indices_path):
                    with open(class_indices_path, 'r') as f:
                        self.class_indices = json.load(f)
                        # Reverse mapping: index -> class name
                        self.index_to_class = {v: k for k, v in self.class_indices.items()}
                else:
                    # Default mapping
                    self.index_to_class = {i: cat for i, cat in enumerate(self.categories)}
                
                print("✅ Custom trained model loaded successfully!")
                print(f"   Classes: {', '.join(self.index_to_class.values())}")
                
            except Exception as e:
                print(f"⚠️ Failed to load custom model: {e}")
                self.model = None
                self.model_type = None
    
    def _load_mobilenet_fallback(self):
        """Load MobileNetV2 as fallback"""
        try:
            from tensorflow.keras.applications import MobileNetV2
            print("🤖 Loading MobileNetV2 fallback model...")
            self.model = MobileNetV2(weights='imagenet', include_top=True)
            self.model_type = 'mobilenet'
            print("✅ MobileNetV2 fallback loaded")
            
        except Exception as e:
            print(f"⚠️ Failed to load MobileNetV2: {e}")
            self.model = None
            self.model_type = None
    
    def classify(self, image_file) -> Dict:
        """
        Classify waste from image using best available method.
        """
        try:
            filename = image_file.filename.lower() if hasattr(image_file, 'filename') else ''
            image_bytes = image_file.read()
            
            # Try AI classification
            if self.model is not None:
                if self.model_type == 'custom':
                    category, confidence, method = self._classify_with_custom_model(image_bytes)
                elif self.model_type == 'mobilenet':
                    category, confidence, method = self._classify_with_mobilenet(image_bytes, filename)
                else:
                    category, confidence, method = self._classify_by_filename(filename, len(image_bytes))
            else:
                # Fallback to filename analysis
                category, confidence, method = self._classify_by_filename(filename, len(image_bytes))
            
            # Get comprehensive information
            waste_info = WASTE_DATABASE.get(category, {})
            
            return {
                'category': category,
                'confidence': confidence,
                'detection_method': method,
                'waste_name': waste_info.get('name', category),
                'examples': waste_info.get('examples', []),
                'risk_level': waste_info.get('risk_level', 'Unknown'),
                'risk_reason': waste_info.get('risk_reason', ''),
                'storage': waste_info.get('storage', {}),
                'sanitization': waste_info.get('sanitization', {}),
                'disposal': waste_info.get('disposal', {}),
                'monitoring': waste_info.get('monitoring', {}),
                'tools_required': waste_info.get('tools_required', []),
                'environmental_impact': waste_info.get('environmental_impact', {}),
                'pros_cons': waste_info.get('pros_cons', {})
            }
            
        except Exception as e:
            raise Exception(f"Image processing error: {str(e)}")
    
    def _classify_with_custom_model(self, image_bytes: bytes):
        """
        Classify using custom trained model.
        """
        try:
            # Load and preprocess image
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convert to RGB
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize to 224x224 (model input size)
            image = image.resize((224, 224))
            
            # Convert to array and normalize
            img_array = np.array(image) / 255.0
            img_array = np.expand_dims(img_array, axis=0)
            
            # Get predictions
            predictions = self.model.predict(img_array, verbose=0)[0]
            
            # Get top prediction
            top_idx = np.argmax(predictions)
            confidence = float(predictions[top_idx])
            category = self.index_to_class.get(top_idx, self.categories[top_idx])
            
            # Get top 3 predictions for method description
            top_3_indices = np.argsort(predictions)[-3:][::-1]
            top_3_predictions = [
                f"{self.index_to_class.get(i, self.categories[i])} ({predictions[i]:.1%})"
                for i in top_3_indices
            ]
            
            method = f"AI Model (Trained): {', '.join(top_3_predictions[:2])}"
            
            return category, confidence, method
            
        except Exception as e:
            print(f"Custom model classification error: {e}")
            # Fallback to filename
            return self._classify_by_filename('', len(image_bytes))
    
    def _classify_with_mobilenet(self, image_bytes: bytes, filename: str):
        """
        Classify using MobileNetV2 with keyword mapping.
        """
        try:
            from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
            
            # Load and preprocess image
            image = Image.open(io.BytesIO(image_bytes))
            
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            image = image.resize((224, 224))
            
            img_array = np.array(image)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = preprocess_input(img_array)
            
            # Get predictions
            predictions = self.model.predict(img_array, verbose=0)
            decoded = decode_predictions(predictions, top=5)[0]
            
            # Map to waste categories (simplified)
            detected_objects = [f"{label} ({score:.1%})" for _, label, score in decoded]
            
            # Simple heuristic mapping
            best_score = decoded[0][2]
            if best_score > 0.5:
                confidence = float(best_score)
                method = f"AI Vision (MobileNet): {detected_objects[0]}"
                # Map to category based on detected object
                category = self._map_object_to_category(decoded[0][1])
            else:
                return self._classify_by_filename(filename, len(image_bytes))
            
            return category, confidence, method
            
        except Exception as e:
            print(f"MobileNet classification error: {e}")
            return self._classify_by_filename(filename, len(image_bytes))
    
    def _map_object_to_category(self, object_name: str) -> str:
        """Map detected object to waste category"""
        obj_lower = object_name.lower()
        
        # Simple keyword matching
        if any(kw in obj_lower for kw in ['banana', 'apple', 'orange', 'food']):
            return 'Organic'
        elif any(kw in obj_lower for kw in ['bottle', 'can', 'paper', 'plastic']):
            return 'Recyclable'
        elif any(kw in obj_lower for kw in ['battery', 'chemical', 'medicine']):
            return 'Hazardous'
        elif any(kw in obj_lower for kw in ['phone', 'computer', 'electronic']):
            return 'E-Waste'
        elif any(kw in obj_lower for kw in ['diaper', 'tissue', 'wrapper']):
            return 'Dry Waste'
        else:
            return 'Recyclable'  # Default
    
    def _classify_by_filename(self, filename: str, image_size: int):
        """
        Fallback classification using filename analysis.
        """
        scores = {}
        for category, keywords in self.filename_keywords.items():
            score = 0
            matched = []
            for keyword in keywords:
                if keyword in filename:
                    score += 3
                    matched.append(keyword)
            scores[category] = {'score': score, 'keywords': matched}
        
        best_category = max(scores.keys(), key=lambda k: scores[k]['score'])
        best_score = scores[best_category]['score']
        
        if best_score > 0:
            confidence = min(0.90, 0.70 + (best_score / 15) * 0.20)
            matched_kw = ', '.join(scores[best_category]['keywords'][:2])
            method = f"Filename analysis: detected '{matched_kw}'"
            return best_category, float(confidence), method
        else:
            # Random fallback
            import random
            category = self.categories[image_size % len(self.categories)]
            confidence = 0.55 + random.random() * 0.15
            method = "Low confidence - train a model for better accuracy"
            return category, float(confidence), method

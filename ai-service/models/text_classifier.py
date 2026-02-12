import re
from typing import Dict
from models.waste_database import WASTE_DATABASE

class TextClassifier:
    """
    Text classification model for waste sorting.
    
    This implementation uses weighted keyword matching for classification.
    Can be enhanced with ML models (TF-IDF + Random Forest or BERT-based models).
    """
    
    def __init__(self):
        self.categories = ['Organic', 'Recyclable', 'Hazardous', 'E-Waste', 'Dry Waste']
        
        # Weighted keywords for each category
        self.keywords = {
            'Organic': {
                'high': ['compost', 'biodegradable', 'food waste', 'garden waste', 'organic'],
                'medium': ['fruit', 'vegetable', 'peel', 'leftover', 'scraps', 'leaves', 'grass'],
                'low': ['banana', 'apple', 'orange', 'potato', 'coffee', 'tea', 'egg', 'bread']
            },
            'Recyclable': {
                'high': ['recyclable', 'recycle', 'recycling'],
                'medium': ['plastic', 'bottle', 'paper', 'cardboard', 'glass', 'aluminum', 'can'],
                'low': ['container', 'packaging', 'box', 'jar', 'newspaper', 'magazine', 'metal']
            },
            'Hazardous': {
                'high': ['hazardous', 'toxic', 'poison', 'dangerous', 'chemical', 'fire', 'flammable', 'explosive'],
                'medium': ['battery', 'paint', 'medicine', 'pesticide', 'oil', 'acid', 'bleach', 'lighter', 'matches'],
                'low': ['cleaner', 'solvent', 'pharmaceutical', 'expired', 'drug', 'aerosol', 'spray']
            },
            'E-Waste': {
                'high': ['electronic', 'e-waste', 'ewaste', 'circuit'],
                'medium': ['phone', 'computer', 'laptop', 'charger', 'printer', 'monitor'],
                'low': ['cable', 'keyboard', 'mouse', 'device', 'gadget', 'led', 'bulb']
            },
            'Dry Waste': {
                'high': ['dry waste', 'non-recyclable'],
                'medium': ['diaper', 'napkin', 'tissue', 'styrofoam', 'rubber'],
                'low': ['leather', 'cloth', 'ceramic', 'wrapper', 'straw']
            }
        }
        
        print("📝 Text classifier initialized (using keyword-based classification + comprehensive database)")
        print("   Can be enhanced with ML models (TF-IDF + Random Forest or BERT)")
    
    def classify(self, text: str) -> Dict:
        """
        Classify waste from text description and return comprehensive analysis.
        
        Args:
            text: User's description of the waste item
            
        Returns:
            Dictionary with comprehensive waste information
        """
        try:
            # Preprocess text
            text_lower = text.lower()
            text_clean = re.sub(r'[^\w\s]', ' ', text_lower)
            
            # Calculate weighted scores
            category, confidence = self._calculate_scores(text_clean)
            
            # Get comprehensive information from database
            waste_info = WASTE_DATABASE.get(category, {})
            
            # Build comprehensive response
            result = {
                'category': category,
                'confidence': confidence,
                'detection_method': f"Classified based on text analysis: '{text[:50]}...'",
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
            
            return result
            
        except Exception as e:
            raise Exception(f"Text processing error: {str(e)}")
    
    def _calculate_scores(self, text: str):
        """
        Calculate weighted scores for each category.
        Returns: (category, confidence)
        """
        scores = {category: 0 for category in self.categories}
        
        # Weight values
        weights = {'high': 5, 'medium': 3, 'low': 1}
        
        # Calculate scores
        for category, keyword_groups in self.keywords.items():
            for weight_level, keywords in keyword_groups.items():
                weight = weights[weight_level]
                for keyword in keywords:
                    if keyword in text:
                        scores[category] += weight
        
        # Find best match
        best_category = max(scores.keys(), key=lambda k: scores[k])
        best_score = scores[best_category]
        
        # Calculate confidence
        if best_score == 0:
            # No keywords matched - default to Dry Waste with low confidence
            return 'Dry Waste', 0.50
        
        total_score = sum(scores.values())
        confidence = min(0.95, 0.65 + (best_score / max(total_score, 1)) * 0.30)
        
        return best_category, float(confidence)
    
    def train_model(self, training_data):
        """
        Train a machine learning model on labeled data.
        
        Example with scikit-learn:
            from sklearn.feature_extraction.text import TfidfVectorizer
            from sklearn.ensemble import RandomForestClassifier
            
            self.vectorizer = TfidfVectorizer()
            self.model = RandomForestClassifier()
            
            X = self.vectorizer.fit_transform(texts)
            self.model.fit(X, labels)
        """
        # TODO: Implement when training data is available
        pass

# AI Service Models

This directory contains the machine learning models for waste classification.

## Current Implementation

The current implementation uses **rule-based classification** as a working demonstration:

- **Image Classifier** (`image_classifier.py`): Analyzes image color properties
- **Text Classifier** (`text_classifier.py`): Keyword-based classification with weighted scoring

## Upgrading to Real AI Models

### Image Classification

To use a real CNN model trained on the TrashNet dataset:

1. **Download TrashNet Dataset**:
   ```bash
   git clone https://github.com/garythung/trashnet.git
   ```

2. **Train the Model** (example script):
   ```python
   from tensorflow import keras
   from tensorflow.keras.applications import MobileNetV2
   from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
   from tensorflow.keras.models import Model
   
   # Load pre-trained MobileNetV2
   base_model = MobileNetV2(weights='imagenet', include_top=False)
   
   # Add custom classification layers
   x = base_model.output
   x = GlobalAveragePooling2D()(x)
   x = Dense(128, activation='relu')(x)
   predictions = Dense(5, activation='softmax')(x)  # 5 waste categories
   
   model = Model(inputs=base_model.input, outputs=predictions)
   
   # Train on TrashNet data
   # ... training code ...
   
   # Save model
   model.save('saved_models/waste_image_classifier.h5')
   ```

3. **Load in ImageClassifier**:
   ```python
   from tensorflow import keras
   self.model = keras.models.load_model('saved_models/waste_image_classifier.h5')
   ```

### Text Classification

To use a machine learning model for text:

1. **Prepare Training Data**:
   Create a CSV file with waste descriptions and labels:
   ```csv
   text,category
   "plastic water bottle",Recyclable
   "banana peel",Organic
   "used battery",Hazardous
   ...
   ```

2. **Train TF-IDF + Random Forest**:
   ```python
   from sklearn.feature_extraction.text import TfidfVectorizer
   from sklearn.ensemble import RandomForestClassifier
   import joblib
   
   vectorizer = TfidfVectorizer(max_features=1000)
   X = vectorizer.fit_transform(texts)
   
   model = RandomForestClassifier(n_estimators=100)
   model.fit(X, labels)
   
   # Save models
   joblib.dump(vectorizer, 'saved_models/text_vectorizer.pkl')
   joblib.dump(model, 'saved_models/text_classifier.pkl')
   ```

3. **Load in TextClassifier**:
   ```python
   import joblib
   self.vectorizer = joblib.load('saved_models/text_vectorizer.pkl')
   self.model = joblib.load('saved_models/text_classifier.pkl')
   ```

## Datasets

See `DATASETS.md` in the project root for links to public datasets:
- TrashNet (image classification)
- Kaggle Waste Classification datasets
- Custom text descriptions

## Model Performance

Current rule-based models:
- **Accuracy**: ~70-75% (estimated)
- **Response Time**: <100ms

Expected with trained models:
- **Accuracy**: 90-95% (with TrashNet)
- **Response Time**: 200-500ms (depending on model size)

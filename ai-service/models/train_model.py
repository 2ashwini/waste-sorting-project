"""
AI Waste Classification Model Training Script
Uses Transfer Learning with MobileNetV2
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
import json
from datetime import datetime

# Configuration
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS_PHASE1 = 20
EPOCHS_PHASE2 = 30
NUM_CLASSES = 6
LEARNING_RATE = 0.0001

# Class names
CLASS_NAMES = ['Organic', 'Recyclable', 'Hazardous', 'E-Waste', 'Dry Waste', 'Medical Waste']

print("=" * 60)
print("🚀 AI Waste Classification Model Training")
print("=" * 60)
print(f"Image Size: {IMG_SIZE}")
print(f"Batch Size: {BATCH_SIZE}")
print(f"Number of Classes: {NUM_CLASSES}")
print(f"Classes: {', '.join(CLASS_NAMES)}")
print("=" * 60)

# Create directories
os.makedirs('models', exist_ok=True)
os.makedirs('logs', exist_ok=True)

# Data Augmentation for Training
print("\n📊 Setting up data augmentation...")
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2],
    fill_mode='nearest'
)

# Validation data (no augmentation, only rescaling)
val_datagen = ImageDataGenerator(rescale=1./255)
test_datagen = ImageDataGenerator(rescale=1./255)

# Load Data
print("\n📁 Loading datasets...")
try:
    train_generator = train_datagen.flow_from_directory(
        'datasets/train',
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=True
    )
    
    val_generator = val_datagen.flow_from_directory(
        'datasets/validation',
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )
    
    test_generator = test_datagen.flow_from_directory(
        'datasets/test',
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )
    
    print(f"✅ Training samples: {train_generator.samples}")
    print(f"✅ Validation samples: {val_generator.samples}")
    print(f"✅ Test samples: {test_generator.samples}")
    print(f"✅ Class indices: {train_generator.class_indices}")
    
except Exception as e:
    print(f"❌ Error loading datasets: {e}")
    print("\n⚠️  Please ensure datasets are organized as:")
    print("   datasets/")
    print("   ├── train/")
    print("   │   ├── Organic/")
    print("   │   ├── Recyclable/")
    print("   │   ├── Hazardous/")
    print("   │   ├── E-Waste/")
    print("   │   ├── Dry Waste/")
    print("   │   └── Medical Waste/")
    print("   ├── validation/ (same structure)")
    print("   └── test/ (same structure)")
    exit(1)

# Build Model
print("\n🏗️  Building model architecture...")

def create_model():
    """Create transfer learning model with MobileNetV2 base"""
    
    # Load pre-trained MobileNetV2
    base_model = MobileNetV2(
        input_shape=IMG_SIZE + (3,),
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze base model initially
    base_model.trainable = False
    
    # Build custom top layers
    model = keras.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.BatchNormalization(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(NUM_CLASSES, activation='softmax', name='predictions')
    ], name='WasteClassifier')
    
    return model, base_model

model, base_model = create_model()

# Print model summary
print("\n📋 Model Summary:")
model.summary()

# Compile model
print("\n⚙️  Compiling model...")
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=LEARNING_RATE),
    loss='categorical_crossentropy',
    metrics=['accuracy', keras.metrics.TopKCategoricalAccuracy(k=3, name='top_3_accuracy')]
)

# Callbacks
print("\n📌 Setting up callbacks...")
callbacks = [
    keras.callbacks.ModelCheckpoint(
        'models/waste_classifier_best.h5',
        save_best_only=True,
        monitor='val_accuracy',
        mode='max',
        verbose=1
    ),
    keras.callbacks.EarlyStopping(
        patience=10,
        restore_best_weights=True,
        monitor='val_accuracy',
        verbose=1
    ),
    keras.callbacks.ReduceLROnPlateau(
        factor=0.5,
        patience=5,
        min_lr=1e-7,
        monitor='val_loss',
        verbose=1
    ),
    keras.callbacks.TensorBoard(
        log_dir=f'logs/training_{datetime.now().strftime("%Y%m%d-%H%M%S")}',
        histogram_freq=1
    ),
    keras.callbacks.CSVLogger('logs/training_history.csv')
]

# Phase 1: Train with frozen base
print("\n" + "=" * 60)
print("🎯 PHASE 1: Training with frozen MobileNetV2 base")
print("=" * 60)

history_phase1 = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS_PHASE1,
    callbacks=callbacks,
    verbose=1
)

# Phase 2: Fine-tuning
print("\n" + "=" * 60)
print("🎯 PHASE 2: Fine-tuning (unfreezing last 30 layers)")
print("=" * 60)

# Unfreeze the base model
base_model.trainable = True

# Freeze all layers except the last 30
for layer in base_model.layers[:-30]:
    layer.trainable = False

print(f"✅ Trainable layers: {len([l for l in model.layers if l.trainable])}")

# Recompile with lower learning rate
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=LEARNING_RATE/10),
    loss='categorical_crossentropy',
    metrics=['accuracy', keras.metrics.TopKCategoricalAccuracy(k=3, name='top_3_accuracy')]
)

# Continue training
history_phase2 = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS_PHASE2,
    callbacks=callbacks,
    verbose=1
)

# Evaluate on test set
print("\n" + "=" * 60)
print("📊 FINAL EVALUATION ON TEST SET")
print("=" * 60)

test_loss, test_accuracy, test_top3 = model.evaluate(test_generator, verbose=1)
print(f"\n✅ Test Loss: {test_loss:.4f}")
print(f"✅ Test Accuracy: {test_accuracy*100:.2f}%")
print(f"✅ Top-3 Accuracy: {test_top3*100:.2f}%")

# Save final model
print("\n💾 Saving final model...")
model.save('models/waste_classifier_v1.h5')
model.save('models/waste_classifier_v1')  # SavedModel format

# Save class indices
with open('models/class_indices.json', 'w') as f:
    json.dump(train_generator.class_indices, f, indent=2)

print("\n✅ Model saved successfully!")
print("   - Keras H5: models/waste_classifier_v1.h5")
print("   - SavedModel: models/waste_classifier_v1/")
print("   - Class Indices: models/class_indices.json")

# Generate classification report
print("\n" + "=" * 60)
print("📈 GENERATING CLASSIFICATION REPORT")
print("=" * 60)

from sklearn.metrics import classification_report, confusion_matrix
import numpy as np

# Get predictions
print("Generating predictions on test set...")
test_generator.reset()
predictions = model.predict(test_generator, verbose=1)
predicted_classes = np.argmax(predictions, axis=1)
true_classes = test_generator.classes

# Classification report
print("\n📊 Classification Report:")
print(classification_report(
    true_classes, 
    predicted_classes, 
    target_names=CLASS_NAMES
))

# Confusion matrix
print("\n🔢 Confusion Matrix:")
cm = confusion_matrix(true_classes, predicted_classes)
print(cm)

# Save metrics
metrics = {
    'test_accuracy': float(test_accuracy),
    'test_loss': float(test_loss),
    'test_top3_accuracy': float(test_top3),
    'training_date': datetime.now().isoformat(),
    'model_architecture': 'MobileNetV2',
    'image_size': IMG_SIZE,
    'num_classes': NUM_CLASSES,
    'class_names': CLASS_NAMES
}

with open('models/metrics.json', 'w') as f:
    json.dump(metrics, f, indent=2)

print("\n" + "=" * 60)
print("🎉 TRAINING COMPLETE!")
print("=" * 60)
print(f"Final Test Accuracy: {test_accuracy*100:.2f}%")
print("Model ready for deployment! 🚀")
print("=" * 60)

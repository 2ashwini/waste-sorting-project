# Waste Classification Dataset

## Directory Structure

This directory should contain waste images organized by category:

- **Organic**: Food waste, leaves, garden waste
- **Recyclable**: Plastic bottles, paper, cardboard, glass, metal cans
- **Hazardous**: Batteries, chemicals, paint cans, pesticides
- **E-Waste**: Old phones, laptops, monitors, cables
- **Dry Waste**: Diapers, wrappers, non-recyclable plastics
- **Medical Waste**: Masks, syringes, medical supplies

## Data Split

- **train/**: 70% of images (for training)
- **validation/**: 20% of images (for validation during training)
- **test/**: 10% of images (for final evaluation)

## Recommended Sources

1. **Kaggle Waste Classification**: https://www.kaggle.com/datasets/techsash/waste-classification-data
2. **TrashNet**: https://github.com/garythung/trashnet
3. **TACO Dataset**: http://tacodataset.org/

## Image Requirements

- Format: JPG, PNG
- Minimum resolution: 224x224 pixels
- Recommended: 500-1000 images per category
- Clear, well-lit images
- Variety of angles and backgrounds

## Usage

After populating with images, run:
```bash
python models/train_model.py
```

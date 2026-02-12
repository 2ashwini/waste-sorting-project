"""
Dataset Download and Preparation Script
Downloads waste classification datasets and organizes them
"""

import os
import shutil
import requests
from pathlib import Path
import zipfile
from tqdm import tqdm

print("=" * 60)
print("📦 Waste Classification Dataset Preparation")
print("=" * 60)

# Create directory structure
DATASET_DIR = Path('datasets')
TRAIN_DIR = DATASET_DIR / 'train'
VAL_DIR = DATASET_DIR / 'validation'
TEST_DIR = DATASET_DIR / 'test'

CATEGORIES = ['Organic', 'Recyclable', 'Hazardous', 'E-Waste', 'Dry Waste', 'Medical Waste']

def create_directory_structure():
    """Create the required directory structure"""
    print("\n📁 Creating directory structure...")
    
    for split in [TRAIN_DIR, VAL_DIR, TEST_DIR]:
        for category in CATEGORIES:
            category_path = split / category
            category_path.mkdir(parents=True, exist_ok=True)
            print(f"✅ Created: {category_path}")

def download_file(url, destination):
    """Download file with progress bar"""
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    
    with open(destination, 'wb') as file, tqdm(
        desc=destination.name,
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as progress_bar:
        for data in response.iter_content(chunk_size=1024):
            size = file.write(data)
            progress_bar.update(size)

def download_sample_dataset():
    """
    Download sample waste images
    Note: For production, use Kaggle API or manual download
    """
    print("\n⚠️  DATASET DOWNLOAD INSTRUCTIONS")
    print("=" * 60)
    print("\nFor best results, download datasets manually from:")
    print("\n1. Kaggle Waste Classification Dataset:")
    print("   https://www.kaggle.com/datasets/techsash/waste-classification-data")
    print("\n2. TrashNet Dataset:")
    print("   https://github.com/garythung/trashnet")
    print("\n3. TACO Dataset:")
    print("   http://tacodataset.org/")
    print("\n" + "=" * 60)
    
    print("\n📋 MANUAL SETUP INSTRUCTIONS:")
    print("=" * 60)
    print("\n1. Download one of the datasets above")
    print("2. Extract the images")
    print("3. Organize images into these folders:")
    print("\n   datasets/")
    print("   ├── train/")
    print("   │   ├── Organic/          (food waste, leaves, etc.)")
    print("   │   ├── Recyclable/       (plastic, paper, glass, metal)")
    print("   │   ├── Hazardous/        (batteries, chemicals, paint)")
    print("   │   ├── E-Waste/          (electronics, phones, laptops)")
    print("   │   ├── Dry Waste/        (diapers, wrappers, etc.)")
    print("   │   └── Medical Waste/    (masks, syringes, etc.)")
    print("   ├── validation/ (same structure, 20% of data)")
    print("   └── test/ (same structure, 10% of data)")
    
    print("\n💡 TIP: Aim for 200-500 images per category minimum")
    print("=" * 60)

def create_sample_data():
    """
    Create placeholder structure for testing
    This is just for demonstration - replace with real images!
    """
    print("\n🎨 Creating sample placeholder structure...")
    print("⚠️  Remember to replace with real images!")
    
    # Create empty .gitkeep files to preserve structure
    for split in [TRAIN_DIR, VAL_DIR, TEST_DIR]:
        for category in CATEGORIES:
            gitkeep = split / category / '.gitkeep'
            gitkeep.touch()
    
    # Create README
    readme_content = """# Waste Classification Dataset

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
"""
    
    with open(DATASET_DIR / 'README.md', 'w') as f:
        f.write(readme_content)
    
    print("✅ Created README.md with instructions")

def check_dataset_ready():
    """Check if dataset is ready for training"""
    print("\n🔍 Checking dataset status...")
    
    ready = True
    for split_name, split_dir in [('Train', TRAIN_DIR), ('Validation', VAL_DIR), ('Test', TEST_DIR)]:
        print(f"\n{split_name} Set:")
        for category in CATEGORIES:
            category_path = split_dir / category
            if category_path.exists():
                # Count image files
                image_count = len([f for f in category_path.iterdir() 
                                 if f.suffix.lower() in ['.jpg', '.jpeg', '.png']])
                
                if image_count > 0:
                    print(f"  ✅ {category}: {image_count} images")
                else:
                    print(f"  ⚠️  {category}: No images found")
                    ready = False
            else:
                print(f"  ❌ {category}: Directory not found")
                ready = False
    
    if ready:
        print("\n✅ Dataset is ready for training!")
        return True
    else:
        print("\n⚠️  Dataset is not ready. Please add images.")
        return False

def main():
    """Main execution"""
    create_directory_structure()
    download_sample_dataset()
    create_sample_data()
    
    print("\n" + "=" * 60)
    print("📊 DATASET PREPARATION COMPLETE")
    print("=" * 60)
    
    is_ready = check_dataset_ready()
    
    if not is_ready:
        print("\n⚠️  NEXT STEPS:")
        print("1. Download waste images from the sources mentioned above")
        print("2. Organize them into the created folder structure")
        print("3. Run this script again to verify")
        print("4. Once ready, run: python models/train_model.py")
    else:
        print("\n🚀 Ready to train! Run: python models/train_model.py")
    
    print("=" * 60)

if __name__ == "__main__":
    main()

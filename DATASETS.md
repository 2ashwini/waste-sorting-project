# Public Datasets for AI Waste Sorting System

This document contains links to public datasets used for training the AI models in this application.

## 1️⃣ Waste Image Classification Dataset

### Primary Dataset: TrashNet
- **Source**: [TrashNet on GitHub](https://github.com/garythung/trashnet)
- **Description**: Dataset of 2,527 images of waste divided into 6 categories
- **Categories**: Glass, Paper, Cardboard, Plastic, Metal, Trash
- **Format**: JPG images (512x384 pixels)
- **License**: MIT License
- **Download**: Clone the repository or download from GitHub

### Alternative Dataset: Waste Classification Data
- **Source**: [Kaggle - Waste Classification](https://www.kaggle.com/datasets/techsash/waste-classification-data)
- **Description**: 25,000+ images across multiple waste categories
- **Categories**: Organic (O) and Recyclable (R)
- **Format**: JPG images
- **License**: CC0: Public Domain

### Additional Dataset: Garbage Classification
- **Source**: [Kaggle - Garbage Classification](https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification)
- **Description**: 15,000+ images in 12 categories
- **Categories**: Battery, Biological, Brown-glass, Cardboard, Clothes, Green-glass, Metal, Paper, Plastic, Shoes, Trash, White-glass
- **Format**: JPG images
- **License**: Database Contents License (DbCL)

## 2️⃣ Text Classification Dataset

### Waste Description Dataset
- **Source**: Custom dataset created from waste categories
- **Description**: Text descriptions of common waste items
- **Examples**:
  - "plastic water bottle" → Recyclable
  - "banana peel" → Organic
  - "used battery" → Hazardous/E-Waste
  - "old newspaper" → Recyclable
  - "expired medicine" → Hazardous
- **Note**: We'll create this programmatically using common waste item descriptions

### Alternative: Product Descriptions
- **Source**: [UCI Machine Learning Repository - Product Descriptions](https://archive.ics.uci.edu/ml/datasets.php)
- **Description**: Can be adapted for waste classification
- **Format**: CSV with text descriptions

## 3️⃣ Sanitation Monitoring Dataset

### NYC 311 Service Requests
- **Source**: [NYC Open Data - 311 Service Requests](https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9)
- **Description**: Real-world sanitation complaints and service requests
- **Fields**: Location, complaint type, date, status, resolution time
- **Format**: CSV (very large dataset - 20M+ rows)
- **License**: Public Domain
- **Use Case**: Train sanitation risk prediction model

### Alternative: Chicago Sanitation Complaints
- **Source**: [Chicago Data Portal - Sanitation Complaints](https://data.cityofchicago.org/Service-Requests/311-Service-Requests-Sanitation-Code-Complaints/me59-5fac)
- **Description**: Sanitation code complaints with location and time data
- **Format**: CSV
- **License**: Public Domain

### Synthetic Dataset
- **Description**: We'll also generate synthetic sanitation data for demonstration
- **Features**: Location, complaint count, frequency, cleanliness score
- **Format**: JSON/CSV

## 📥 How to Download and Use

### For TrashNet (Primary Image Dataset):
```bash
# Clone the repository
git clone https://github.com/garythung/trashnet.git

# Or download as ZIP from GitHub
# Extract to: ai-service/data/trashnet/
```

### For Kaggle Datasets:
1. Create a Kaggle account
2. Install Kaggle CLI: `pip install kaggle`
3. Download API token from Kaggle settings
4. Download datasets:
```bash
kaggle datasets download -d techsash/waste-classification-data
kaggle datasets download -d asdasdasasdas/garbage-classification
```

### For NYC 311 Data:
```bash
# Download via API (first 100k rows for demo)
# Or use the provided synthetic data generator in the AI service
```

## 🎯 Dataset Integration Plan

1. **Image Classification**: Use TrashNet as primary dataset, fine-tune MobileNetV2
2. **Text Classification**: Create custom dataset + use NLP on waste item names
3. **Sanitation Prediction**: Use synthetic data generator + optional NYC 311 data

## 📝 Notes

- The application includes **pre-configured sample data** for immediate testing
- Models will work with placeholder data initially
- You can swap in real datasets later for improved accuracy
- All datasets are publicly available and free to use for educational purposes

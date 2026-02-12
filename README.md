# 🌍 AI-Powered Waste Sorting, Disposal and Sanitation Monitoring System

A comprehensive full-stack web application that uses Artificial Intelligence to classify waste, recommend proper disposal methods, and monitor sanitation levels through data analytics and predictive modeling.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Python](https://img.shields.io/badge/python-%3E%3D3.9-blue.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Datasets](#-datasets)
- [Upgrading AI Models](#-upgrading-ai-models)
- [Screenshots](#-screenshots)

## ✨ Features

### 🗑️ AI Waste Sorting
- **Image Recognition**: Upload photos of waste items for instant AI classification
- **Text Analysis**: Describe waste items in natural language for classification
- **5 Categories**: Organic, Recyclable, Hazardous, E-Waste, Dry Waste
- **Confidence Scores**: Get AI confidence levels for each classification

### ♻️ Smart Disposal Guide
- **Detailed Recommendations**: Step-by-step disposal instructions for each waste category
- **Safety Warnings**: Critical safety information for hazardous materials
- **Environmental Impact**: Learn about the environmental effects of different waste types
- **Do's and Don'ts**: Clear guidelines for proper waste handling

### 🏥 Sanitation Monitoring
- **Issue Reporting**: Submit sanitation complaints with location and severity
- **Analytics Dashboard**: View cleanliness scores and trends across different areas
- **Risk Prediction**: AI-powered prediction of sanitation issues
- **Data Visualization**: Interactive charts showing historical trends and area comparisons

## 🛠 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, responsive styling
- **Chart.js** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling

### AI Service
- **Python 3.9+** - Programming language
- **Flask** - Lightweight web framework
- **TensorFlow** - Machine learning framework
- **Scikit-learn** - ML algorithms
- **Pillow** - Image processing

## 📁 Project Structure

```
waste-sorting-sanitation-system/
├── app/                          # Next.js frontend
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── waste-sorting/           # Waste sorting module
│   ├── disposal/                # Disposal guide module
│   └── sanitation/              # Sanitation monitoring module
├── server/                       # Node.js backend
│   └── src/
│       ├── index.ts             # Server entry point
│       ├── config/              # Configuration files
│       ├── models/              # MongoDB models
│       ├── routes/              # API routes
│       └── services/            # Business logic
├── ai-service/                   # Python AI service
│   ├── app.py                   # Flask application
│   ├── models/                  # ML models
│   │   ├── image_classifier.py
│   │   └── text_classifier.py
│   └── requirements.txt
├── DATASETS.md                   # Public datasets information
└── README.md                     # This file
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (v5.0 or higher)
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd waste-sorting-sanitation-system
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### Step 4: Install AI Service Dependencies

```bash
cd ai-service
pip install -r requirements.txt
cd ..
```

### Step 5: Set Up Environment Variables

Create `.env` files in the root, server, and ai-service directories:

**Root `.env`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

**Server `.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/waste-sorting-system
AI_SERVICE_URL=http://localhost:8000
NODE_ENV=development
```

**AI Service `.env`:**
```env
FLASK_PORT=8000
FLASK_ENV=development
MODEL_PATH=./models/saved_models
```

### Step 6: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

## 🏃 Running the Application

You need to run three services simultaneously:

### Terminal 1: Frontend (Next.js)

```bash
npm run dev
```

The frontend will be available at: **http://localhost:3000**

### Terminal 2: Backend (Node.js/Express)

```bash
cd server
npm run dev
```

The backend API will be available at: **http://localhost:5000**

### Terminal 3: AI Service (Python/Flask)

```bash
cd ai-service
python app.py
```

The AI service will be available at: **http://localhost:8000**

## 📡 API Documentation

### Waste Classification Endpoints

#### Classify Image
```http
POST /api/waste/classify-image
Content-Type: multipart/form-data

Body: { image: <file> }

Response: {
  category: "Recyclable",
  confidence: 0.87,
  description: "This looks like recyclable material..."
}
```

#### Classify Text
```http
POST /api/waste/classify-text
Content-Type: application/json

Body: { text: "plastic water bottle" }

Response: {
  category: "Recyclable",
  confidence: 0.92,
  description: "Classified as Recyclable based on keywords..."
}
```

### Sanitation Endpoints

#### Submit Report
```http
POST /api/sanitation/report
Content-Type: application/json

Body: {
  location: "Area A, Street 5",
  issueType: "Garbage Accumulation",
  description: "Large pile of waste...",
  severity: "High"
}
```

#### Get Analytics
```http
GET /api/sanitation/analytics

Response: [
  {
    area: "Area A",
    cleanlinessScore: 75,
    riskProbability: 35,
    complaintCount: 12,
    trend: "improving"
  },
  ...
]
```

## 📊 Datasets

This application uses public datasets for AI training. See [DATASETS.md](./DATASETS.md) for detailed information:

- **TrashNet** - 2,527 images across 6 waste categories
- **Kaggle Waste Classification** - 25,000+ images
- **NYC 311 Service Requests** - Real-world sanitation data

## 🤖 Upgrading AI Models

The current implementation uses **rule-based classification** for demonstration. To upgrade to real AI models:

### Image Classification

1. Download the TrashNet dataset
2. Train a CNN model (MobileNetV2 recommended)
3. Update `ai-service/models/image_classifier.py`

See `ai-service/models/README.md` for detailed instructions.

### Text Classification

1. Prepare training data (waste descriptions + labels)
2. Train TF-IDF + Random Forest or BERT model
3. Update `ai-service/models/text_classifier.py`

## 🎨 Design Features

- **Glassmorphism UI** - Modern frosted glass effects
- **Gradient Backgrounds** - Beautiful color transitions
- **Smooth Animations** - Micro-interactions for better UX
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Dark Theme** - Eye-friendly dark color scheme

## 🧪 Testing

### Frontend
```bash
npm run test
```

### Backend
```bash
cd server
npm run test
```

### AI Service
```bash
cd ai-service
python -m pytest
```

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- TrashNet dataset by Gary Thung
- Kaggle waste classification datasets
- NYC Open Data for sanitation data
- All open-source libraries used in this project

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for a cleaner, smarter world**

# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..

# AI Service
cd ai-service && pip install -r requirements.txt && cd ..
```

### 2. Start MongoDB

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 3. Run All Services

Open **3 separate terminals**:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 3 - AI Service:**
```bash
cd ai-service
python app.py
```

### 4. Open the Application

Visit **http://localhost:3000** in your browser!

## 🎯 What to Try

1. **Waste Sorting**: Go to "Waste Sorting" and upload an image or type "plastic bottle"
2. **Disposal Guide**: Click on any waste category to see disposal instructions
3. **Sanitation Monitor**: Submit a test report and view the analytics dashboard

## ⚠️ Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is installed and running
- Check that port 27017 is not in use

### Port Already in Use
- Frontend (3000): Change in `package.json` dev script
- Backend (5000): Change `PORT` in `server/.env`
- AI Service (8000): Change `FLASK_PORT` in `ai-service/.env`

### AI Service Not Working
- The app will still work! Backend has fallback classification
- Check Python version: `python --version` (should be 3.9+)
- Reinstall dependencies: `pip install -r requirements.txt`

## 📚 Next Steps

- Read the full [README.md](./README.md)
- Check out [DATASETS.md](./DATASETS.md) for AI model training
- Explore the code and customize!

---

**Need help?** Open an issue on GitHub!

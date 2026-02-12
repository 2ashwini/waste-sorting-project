import { Router, Request, Response } from 'express';
import multer from 'multer';
import WasteClassification from '../models/WasteClassification';
import { classifyImage, classifyText } from '../services/ai.service';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Classify image
router.post('/classify-image', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Call AI service
        const result = await classifyImage(req.file.buffer);

        // Save to database
        const classification = new WasteClassification({
            category: result.category,
            confidence: result.confidence,
            description: result.description,
            inputType: 'image',
            inputData: `image_${Date.now()}.${req.file.mimetype.split('/')[1]}`
        });

        await classification.save();

        res.json(result);
    } catch (error: any) {
        console.error('Image classification error:', error);
        res.status(500).json({
            error: 'Failed to classify image',
            message: error.message
        });
    }
});

// Classify text
router.post('/classify-text', async (req: Request, res: Response) => {
    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({ error: 'Invalid text input' });
        }

        // Call AI service
        const result = await classifyText(text);

        // Save to database
        const classification = new WasteClassification({
            category: result.category,
            confidence: result.confidence,
            description: result.description,
            inputType: 'text',
            inputData: text
        });

        await classification.save();

        res.json(result);
    } catch (error: any) {
        console.error('Text classification error:', error);
        res.status(500).json({
            error: 'Failed to classify text',
            message: error.message
        });
    }
});

// Get classification history
router.get('/history', async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const classifications = await WasteClassification
            .find()
            .sort({ timestamp: -1 })
            .limit(limit);

        res.json(classifications);
    } catch (error: any) {
        console.error('Error fetching history:', error);
        res.status(500).json({
            error: 'Failed to fetch classification history',
            message: error.message
        });
    }
});

export default router;

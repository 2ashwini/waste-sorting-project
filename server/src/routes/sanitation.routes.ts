import { Router, Request, Response } from 'express';
import SanitationReport from '../models/SanitationReport';
import { getSanitationAnalytics } from '../services/sanitation.service';

const router = Router();

// Submit sanitation report
router.post('/report', async (req: Request, res: Response) => {
    try {
        const { location, issueType, description, severity } = req.body;

        if (!location || !issueType || !description || !severity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const report = new SanitationReport({
            location,
            issueType,
            description,
            severity
        });

        await report.save();

        res.status(201).json({
            message: 'Report submitted successfully',
            report
        });
    } catch (error: any) {
        console.error('Error submitting report:', error);
        res.status(500).json({
            error: 'Failed to submit report',
            message: error.message
        });
    }
});

// Get sanitation analytics
router.get('/analytics', async (req: Request, res: Response) => {
    try {
        const analytics = await getSanitationAnalytics();
        res.json(analytics);
    } catch (error: any) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({
            error: 'Failed to fetch analytics',
            message: error.message
        });
    }
});

// Get reports by location
router.get('/reports/:location', async (req: Request, res: Response) => {
    try {
        const { location } = req.params;
        const reports = await SanitationReport
            .find({ location: new RegExp(location, 'i') })
            .sort({ timestamp: -1 });

        res.json(reports);
    } catch (error: any) {
        console.error('Error fetching reports:', error);
        res.status(500).json({
            error: 'Failed to fetch reports',
            message: error.message
        });
    }
});

// Get all reports
router.get('/reports', async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 100;
        const reports = await SanitationReport
            .find()
            .sort({ timestamp: -1 })
            .limit(limit);

        res.json(reports);
    } catch (error: any) {
        console.error('Error fetching reports:', error);
        res.status(500).json({
            error: 'Failed to fetch reports',
            message: error.message
        });
    }
});

export default router;

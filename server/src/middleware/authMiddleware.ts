import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Extend Express Request to include user
export interface AuthRequest extends Request {
    user?: IUser;
}

// JWT Secret (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Generate JWT token
export const generateToken = (userId: string): string => {
    return jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );
};

// Verify JWT token middleware
export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please login to access this resource.'
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        // Get user from token
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Token is invalid.'
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};

// Check if user is admin
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
};

// Check if user has premium access
export const isPremium = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.isPremium) {
        // Check if premium hasn't expired
        if (req.user.premiumExpiresAt && req.user.premiumExpiresAt > new Date()) {
            next();
        } else if (req.user.isPremium && !req.user.premiumExpiresAt) {
            // Lifetime premium
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: 'Premium subscription expired. Please renew to access this feature.'
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            message: 'Premium subscription required to access this feature.'
        });
    }
};

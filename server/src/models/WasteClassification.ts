import mongoose, { Schema, Document } from 'mongoose';

export interface IWasteClassification extends Document {
    category: 'Organic' | 'Recyclable' | 'Hazardous' | 'E-Waste' | 'Dry Waste';
    confidence: number;
    description: string;
    inputType: 'image' | 'text';
    inputData: string;
    timestamp: Date;
}

const WasteClassificationSchema: Schema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ['Organic', 'Recyclable', 'Hazardous', 'E-Waste', 'Dry Waste']
    },
    confidence: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    description: {
        type: String,
        required: true
    },
    inputType: {
        type: String,
        required: true,
        enum: ['image', 'text']
    },
    inputData: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IWasteClassification>('WasteClassification', WasteClassificationSchema);

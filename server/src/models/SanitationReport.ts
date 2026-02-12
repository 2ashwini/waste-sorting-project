import mongoose, { Schema, Document } from 'mongoose';

export interface ISanitationReport extends Document {
    location: string;
    issueType: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'In Progress' | 'Resolved';
    timestamp: Date;
    resolvedAt?: Date;
}

const SanitationReportSchema: Schema = new Schema({
    location: {
        type: String,
        required: true
    },
    issueType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'In Progress', 'Resolved']
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    resolvedAt: {
        type: Date
    }
});

export default mongoose.model<ISanitationReport>('SanitationReport', SanitationReportSchema);

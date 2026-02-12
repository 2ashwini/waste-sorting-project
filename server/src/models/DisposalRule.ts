import mongoose, { Schema, Document } from 'mongoose';

export interface IDisposalRule extends Document {
    category: string;
    methods: string[];
    warnings: string[];
    environmentalImpact: string;
    examples: string[];
}

const DisposalRuleSchema: Schema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    methods: [{
        type: String,
        required: true
    }],
    warnings: [{
        type: String,
        required: true
    }],
    environmentalImpact: {
        type: String,
        required: true
    },
    examples: [{
        type: String
    }]
});

export default mongoose.model<IDisposalRule>('DisposalRule', DisposalRuleSchema);

import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

interface ClassificationResult {
    category: 'Organic' | 'Recyclable' | 'Hazardous' | 'E-Waste' | 'Dry Waste';
    confidence: number;
    description: string;
}

// Helper function to convert comprehensive AI response to simple format
const convertToSimpleFormat = (aiResponse: any): ClassificationResult => {
    // If it's already in simple format, return as is
    if (aiResponse.description && !aiResponse.waste_name) {
        return aiResponse;
    }

    // Convert comprehensive format to simple format
    const category = aiResponse.category;
    const confidence = aiResponse.confidence;

    // Build a simple description from comprehensive data
    let description = `${aiResponse.waste_name || category}\n\n`;
    description += `Risk Level: ${aiResponse.risk_level}\n`;
    description += `${aiResponse.risk_reason}\n\n`;

    if (aiResponse.disposal && aiResponse.disposal.methods) {
        description += `Disposal: ${aiResponse.disposal.methods[0] || 'See disposal guide'}\n\n`;
    }

    description += `${aiResponse.detection_method || 'Classified by AI'}`;

    return {
        category,
        confidence,
        description
    };
};

export const classifyImage = async (imageBuffer: Buffer): Promise<ClassificationResult> => {
    try {
        const formData = new FormData();
        const blob = new Blob([imageBuffer]);
        formData.append('image', blob, 'image.jpg');

        const response = await axios.post(`${AI_SERVICE_URL}/classify/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 30000 // 30 second timeout
        });

        // Convert comprehensive response to simple format
        return convertToSimpleFormat(response.data);
    } catch (error: any) {
        console.error('AI Service error (image):', error.message);

        // Fallback to mock classification if AI service is unavailable
        return mockImageClassification();
    }
};

export const classifyText = async (text: string): Promise<ClassificationResult> => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/classify/text`, {
            text
        }, {
            timeout: 10000 // 10 second timeout
        });

        // Convert comprehensive response to simple format
        return convertToSimpleFormat(response.data);
    } catch (error: any) {
        console.error('AI Service error (text):', error.message);

        // Fallback to rule-based classification if AI service is unavailable
        return ruleBasedTextClassification(text);
    }
};

// Fallback mock classification for images
const mockImageClassification = (): ClassificationResult => {
    const categories: Array<'Organic' | 'Recyclable' | 'Hazardous' | 'E-Waste' | 'Dry Waste'> = [
        'Organic', 'Recyclable', 'Hazardous', 'E-Waste', 'Dry Waste'
    ];

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    return {
        category: randomCategory,
        confidence: 0.75 + Math.random() * 0.2, // 75-95% confidence
        description: `This appears to be ${randomCategory.toLowerCase()} waste. (Mock classification - AI service unavailable)`
    };
};

// Rule-based text classification fallback
const ruleBasedTextClassification = (text: string): ClassificationResult => {
    const lowerText = text.toLowerCase();

    // Organic waste keywords
    const organicKeywords = ['food', 'fruit', 'vegetable', 'peel', 'banana', 'apple', 'orange', 'leftover',
        'compost', 'garden', 'leaves', 'coffee', 'tea', 'eggshell'];

    // Recyclable keywords
    const recyclableKeywords = ['plastic', 'bottle', 'paper', 'cardboard', 'can', 'aluminum', 'glass',
        'newspaper', 'magazine', 'container'];

    // Hazardous keywords
    const hazardousKeywords = ['battery', 'paint', 'chemical', 'medicine', 'drug', 'pesticide', 'oil',
        'cleaner', 'toxic', 'poison', 'acid', 'bleach'];

    // E-waste keywords
    const ewasteKeywords = ['phone', 'computer', 'laptop', 'electronic', 'charger', 'cable', 'printer',
        'monitor', 'keyboard', 'mouse', 'circuit', 'led', 'bulb'];

    // Dry waste keywords
    const dryWasteKeywords = ['diaper', 'napkin', 'tissue', 'styrofoam', 'rubber', 'leather', 'cloth',
        'ceramic', 'wrapper'];

    let category: 'Organic' | 'Recyclable' | 'Hazardous' | 'E-Waste' | 'Dry Waste' = 'Dry Waste';
    let confidence = 0.6;

    if (organicKeywords.some(keyword => lowerText.includes(keyword))) {
        category = 'Organic';
        confidence = 0.85;
    } else if (recyclableKeywords.some(keyword => lowerText.includes(keyword))) {
        category = 'Recyclable';
        confidence = 0.85;
    } else if (hazardousKeywords.some(keyword => lowerText.includes(keyword))) {
        category = 'Hazardous';
        confidence = 0.9;
    } else if (ewasteKeywords.some(keyword => lowerText.includes(keyword))) {
        category = 'E-Waste';
        confidence = 0.85;
    } else if (dryWasteKeywords.some(keyword => lowerText.includes(keyword))) {
        category = 'Dry Waste';
        confidence = 0.8;
    }

    return {
        category,
        confidence,
        description: `Classified as ${category} based on text analysis. Confidence: ${Math.round(confidence * 100)}%`
    };
};

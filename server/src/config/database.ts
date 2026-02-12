import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/waste-sorting-system';

        await mongoose.connect(mongoUri);

        console.log('✅ MongoDB connected successfully');

        // Seed initial data if database is empty
        await seedDatabase();
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
};

const seedDatabase = async () => {
    try {
        const DisposalRule = mongoose.model('DisposalRule');
        const count = await DisposalRule.countDocuments();

        if (count === 0) {
            console.log('📦 Seeding disposal rules...');

            const disposalRules = [
                {
                    category: 'Organic',
                    methods: [
                        'Compost in your backyard or use a composting bin',
                        'Use municipal organic waste collection services',
                        'Create vermicompost using earthworms',
                        'Use as mulch for garden plants'
                    ],
                    warnings: [
                        'Do not mix with plastic or other non-organic materials',
                        'Avoid composting meat and dairy products at home',
                        'Keep compost moist but not waterlogged'
                    ],
                    environmentalImpact: 'Organic waste in landfills produces methane. Proper composting reduces emissions by 50-70%.',
                    examples: ['Food scraps', 'Fruit peels', 'Vegetable waste', 'Garden waste']
                },
                {
                    category: 'Recyclable',
                    methods: [
                        'Clean and dry items before recycling',
                        'Place in designated recycling bins',
                        'Take to local recycling centers',
                        'Participate in municipal recycling programs'
                    ],
                    warnings: [
                        'Remove caps and lids from bottles',
                        'Do not recycle contaminated items',
                        'Flatten cardboard boxes to save space'
                    ],
                    environmentalImpact: 'Recycling saves 60% energy compared to producing from raw materials.',
                    examples: ['Plastic bottles', 'Paper', 'Cardboard', 'Glass bottles', 'Aluminum cans']
                },
                {
                    category: 'Hazardous',
                    methods: [
                        'Take to designated hazardous waste collection centers',
                        'Use pharmacy take-back programs for medicines',
                        'Contact local waste management for pickup services',
                        'Never dispose in regular trash or down drains'
                    ],
                    warnings: [
                        'DANGER: Can cause serious health and environmental harm',
                        'Keep away from children and pets',
                        'Do not mix different hazardous materials',
                        'Wear gloves when handling'
                    ],
                    environmentalImpact: 'Hazardous waste can contaminate soil and water for decades.',
                    examples: ['Batteries', 'Paint', 'Chemicals', 'Pesticides', 'Expired medicines']
                },
                {
                    category: 'E-Waste',
                    methods: [
                        'Take to certified e-waste recycling centers',
                        'Use manufacturer take-back programs',
                        'Donate working electronics to charities',
                        'Participate in e-waste collection drives'
                    ],
                    warnings: [
                        'Remove personal data before disposal',
                        'Do not dismantle electronics yourself',
                        'Keep batteries separate from devices'
                    ],
                    environmentalImpact: 'E-waste contains toxic materials. Proper recycling recovers 95% of valuable materials.',
                    examples: ['Old phones', 'Computers', 'Laptops', 'Chargers', 'Printers']
                },
                {
                    category: 'Dry Waste',
                    methods: [
                        'Separate from wet waste',
                        'Place in designated dry waste bins',
                        'Consider upcycling or creative reuse',
                        'Donate usable items to thrift stores'
                    ],
                    warnings: [
                        'Ensure items are completely dry',
                        'Remove any wet or organic contamination',
                        'Sharp objects should be wrapped safely'
                    ],
                    environmentalImpact: 'Dry waste takes 20-200 years to decompose. Proper segregation reduces landfill burden by 40%.',
                    examples: ['Packaging materials', 'Styrofoam', 'Rubber', 'Leather', 'Cloth']
                }
            ];

            await DisposalRule.insertMany(disposalRules);
            console.log('✅ Disposal rules seeded successfully');
        }
    } catch (error) {
        console.log('Note: Disposal rules seeding skipped (model may not be registered yet)');
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB error:', error);
});

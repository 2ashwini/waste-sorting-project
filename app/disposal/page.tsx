"use client";

import { useState } from "react";
import { Recycle, AlertTriangle, Leaf, Info, ExternalLink } from "lucide-react";

type WasteCategory = "Organic" | "Recyclable" | "Hazardous" | "E-Waste" | "Dry Waste";

interface DisposalInfo {
    category: WasteCategory;
    methods: string[];
    warnings: string[];
    environmentalImpact: string;
    examples: string[];
    dosDonts: {
        dos: string[];
        donts: string[];
    };
}

const disposalData: Record<WasteCategory, DisposalInfo> = {
    "Organic": {
        category: "Organic",
        methods: [
            "Compost in your backyard or use a composting bin",
            "Use municipal organic waste collection services",
            "Create vermicompost using earthworms",
            "Use as mulch for garden plants"
        ],
        warnings: [
            "Do not mix with plastic or other non-organic materials",
            "Avoid composting meat and dairy products at home (attracts pests)",
            "Keep compost moist but not waterlogged"
        ],
        environmentalImpact: "Organic waste in landfills produces methane, a potent greenhouse gas. Proper composting reduces emissions by 50-70% and creates nutrient-rich soil.",
        examples: ["Food scraps", "Fruit peels", "Vegetable waste", "Garden waste", "Coffee grounds", "Tea bags"],
        dosDonts: {
            dos: [
                "Separate organic waste daily",
                "Use biodegradable bags for collection",
                "Chop large pieces for faster decomposition"
            ],
            donts: [
                "Don't throw in regular trash",
                "Don't add diseased plants to compost",
                "Don't compost pet waste"
            ]
        }
    },
    "Recyclable": {
        category: "Recyclable",
        methods: [
            "Clean and dry items before recycling",
            "Place in designated recycling bins",
            "Take to local recycling centers",
            "Participate in municipal recycling programs"
        ],
        warnings: [
            "Remove caps and lids from bottles",
            "Do not recycle contaminated items (food residue)",
            "Flatten cardboard boxes to save space"
        ],
        environmentalImpact: "Recycling saves 60% energy compared to producing from raw materials. One ton of recycled plastic saves 5,774 kWh of energy.",
        examples: ["Plastic bottles", "Paper", "Cardboard", "Glass bottles", "Aluminum cans", "Metal containers"],
        dosDonts: {
            dos: [
                "Rinse containers thoroughly",
                "Remove labels when possible",
                "Sort by material type"
            ],
            donts: [
                "Don't recycle greasy pizza boxes",
                "Don't include plastic bags (take to store drop-off)",
                "Don't mix different recyclable types"
            ]
        }
    },
    "Hazardous": {
        category: "Hazardous",
        methods: [
            "Take to designated hazardous waste collection centers",
            "Use pharmacy take-back programs for medicines",
            "Contact local waste management for pickup services",
            "Never dispose in regular trash or down drains"
        ],
        warnings: [
            "⚠️ DANGER: Can cause serious health and environmental harm",
            "Keep away from children and pets",
            "Do not mix different hazardous materials",
            "Wear gloves when handling"
        ],
        environmentalImpact: "Hazardous waste can contaminate soil and water for decades. One liter of oil can pollute 1 million liters of water.",
        examples: ["Batteries", "Paint", "Chemicals", "Pesticides", "Motor oil", "Expired medicines", "Cleaning products"],
        dosDonts: {
            dos: [
                "Store in original containers",
                "Keep labels intact",
                "Transport safely to collection points"
            ],
            donts: [
                "NEVER pour down drains",
                "NEVER burn hazardous waste",
                "NEVER mix with regular trash"
            ]
        }
    },
    "E-Waste": {
        category: "E-Waste",
        methods: [
            "Take to certified e-waste recycling centers",
            "Use manufacturer take-back programs",
            "Donate working electronics to charities",
            "Participate in e-waste collection drives"
        ],
        warnings: [
            "Remove personal data before disposal",
            "Do not dismantle electronics yourself (contains hazardous materials)",
            "Keep batteries separate from devices"
        ],
        environmentalImpact: "E-waste contains toxic materials like lead and mercury. Proper recycling recovers 95% of valuable materials and prevents soil contamination.",
        examples: ["Old phones", "Computers", "Laptops", "Chargers", "Printers", "Circuit boards", "LED bulbs"],
        dosDonts: {
            dos: [
                "Wipe all personal data",
                "Remove batteries if possible",
                "Use certified recyclers only"
            ],
            donts: [
                "Don't throw in regular trash",
                "Don't burn electronic waste",
                "Don't export to developing countries"
            ]
        }
    },
    "Dry Waste": {
        category: "Dry Waste",
        methods: [
            "Separate from wet waste",
            "Place in designated dry waste bins",
            "Consider upcycling or creative reuse",
            "Donate usable items to thrift stores"
        ],
        warnings: [
            "Ensure items are completely dry",
            "Remove any wet or organic contamination",
            "Sharp objects should be wrapped safely"
        ],
        environmentalImpact: "Dry waste takes 20-200 years to decompose in landfills. Proper segregation enables recycling and reduces landfill burden by 40%.",
        examples: ["Packaging materials", "Styrofoam", "Rubber", "Leather", "Cloth", "Ceramics", "Diapers"],
        dosDonts: {
            dos: [
                "Keep completely dry",
                "Compress to save space",
                "Reuse when possible"
            ],
            donts: [
                "Don't mix with wet waste",
                "Don't include recyclables",
                "Don't burn plastic materials"
            ]
        }
    }
};

export default function DisposalPage() {
    const [selectedCategory, setSelectedCategory] = useState<WasteCategory>("Recyclable");
    const disposal = disposalData[selectedCategory];

    const getCategoryColor = (category: WasteCategory) => {
        const colors = {
            "Organic": "from-green-400 to-green-600",
            "Recyclable": "from-blue-400 to-blue-600",
            "Hazardous": "from-red-400 to-red-600",
            "E-Waste": "from-yellow-400 to-yellow-600",
            "Dry Waste": "from-gray-400 to-gray-600",
        };
        return colors[category];
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 fade-in">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Smart Disposal Guide
                    </h1>
                    <p className="text-xl text-gray-200">
                        Learn the correct way to dispose of different types of waste
                    </p>
                </div>

                {/* Category Selection */}
                <div className="glass rounded-2xl p-4 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {(Object.keys(disposalData) as WasteCategory[]).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`py-4 px-4 rounded-xl font-semibold transition-all ${selectedCategory === category
                                        ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg scale-105`
                                        : "bg-white/5 text-white hover:bg-white/10"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Disposal Information */}
                <div className="space-y-6 fade-in">
                    {/* Header Card */}
                    <div className={`bg-gradient-to-r ${getCategoryColor(selectedCategory)} rounded-2xl p-8`}>
                        <h2 className="text-4xl font-bold text-white mb-3">
                            {disposal.category}
                        </h2>
                        <p className="text-white/90 text-lg">
                            Complete disposal guidelines and environmental impact information
                        </p>
                    </div>

                    {/* Disposal Methods */}
                    <div className="glass rounded-2xl p-8">
                        <div className="flex items-center mb-6">
                            <Recycle className="h-8 w-8 text-green-400 mr-3" />
                            <h3 className="text-2xl font-bold text-white">
                                Disposal Methods
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {disposal.methods.map((method, index) => (
                                <li key={index} className="flex items-start text-gray-200">
                                    <span className="bg-green-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-semibold text-sm">
                                        {index + 1}
                                    </span>
                                    <span>{method}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Warnings */}
                    <div className="glass rounded-2xl p-8 border-l-4 border-red-500">
                        <div className="flex items-center mb-6">
                            <AlertTriangle className="h-8 w-8 text-red-400 mr-3" />
                            <h3 className="text-2xl font-bold text-white">
                                Important Warnings
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {disposal.warnings.map((warning, index) => (
                                <li key={index} className="flex items-start text-gray-200">
                                    <span className="text-red-400 mr-3 text-xl">⚠️</span>
                                    <span>{warning}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Environmental Impact */}
                    <div className="glass rounded-2xl p-8">
                        <div className="flex items-center mb-6">
                            <Leaf className="h-8 w-8 text-green-400 mr-3" />
                            <h3 className="text-2xl font-bold text-white">
                                Environmental Impact
                            </h3>
                        </div>
                        <p className="text-gray-200 text-lg leading-relaxed">
                            {disposal.environmentalImpact}
                        </p>
                    </div>

                    {/* Examples & Do's and Don'ts */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Examples */}
                        <div className="glass rounded-2xl p-8">
                            <div className="flex items-center mb-6">
                                <Info className="h-8 w-8 text-blue-400 mr-3" />
                                <h3 className="text-2xl font-bold text-white">
                                    Examples
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {disposal.examples.map((example, index) => (
                                    <span
                                        key={index}
                                        className="bg-white/10 text-white px-4 py-2 rounded-full text-sm"
                                    >
                                        {example}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Do's and Don'ts */}
                        <div className="glass rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Do's & Don'ts
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                                        <span className="mr-2">✓</span> DO:
                                    </h4>
                                    <ul className="space-y-1 text-gray-200 text-sm">
                                        {disposal.dosDonts.dos.map((item, index) => (
                                            <li key={index} className="ml-6">• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                                        <span className="mr-2">✗</span> DON'T:
                                    </h4>
                                    <ul className="space-y-1 text-gray-200 text-sm">
                                        {disposal.dosDonts.donts.map((item, index) => (
                                            <li key={index} className="ml-6">• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="glass rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Need to classify waste first?
                        </h3>
                        <a href="/waste-sorting" className="btn-primary inline-block">
                            Go to Waste Sorting
                            <ExternalLink className="inline-block ml-2 h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

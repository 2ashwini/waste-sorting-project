'use client';

import { useState } from 'react';
import { Search, Filter, Recycle, Trash2, AlertTriangle, Zap, Package } from 'lucide-react';

const WASTE_CATEGORIES = [
    { id: 'all', name: 'All Categories', icon: Package, color: 'gray' },
    { id: 'Organic', name: 'Organic', icon: Recycle, color: 'green' },
    { id: 'Recyclable', name: 'Recyclable', icon: Recycle, color: 'blue' },
    { id: 'Hazardous', name: 'Hazardous', icon: AlertTriangle, color: 'red' },
    { id: 'E-Waste', name: 'E-Waste', icon: Zap, color: 'purple' },
    { id: 'Dry Waste', name: 'Dry Waste', icon: Trash2, color: 'gray' }
];

const WASTE_ITEMS = [
    {
        id: 1,
        name: 'Food Scraps',
        category: 'Organic',
        description: 'Leftover food, vegetable peels, fruit waste',
        riskLevel: 'Low',
        disposal: 'Compost or green waste bin'
    },
    {
        id: 2,
        name: 'Plastic Bottles',
        category: 'Recyclable',
        description: 'PET bottles, water bottles, soda bottles',
        riskLevel: 'Low',
        disposal: 'Blue recycling bin after cleaning'
    },
    {
        id: 3,
        name: 'Batteries',
        category: 'Hazardous',
        description: 'AA, AAA, lithium batteries',
        riskLevel: 'High',
        disposal: 'Hazardous waste collection center'
    },
    {
        id: 4,
        name: 'Old Phones',
        category: 'E-Waste',
        description: 'Mobile phones, smartphones, tablets',
        riskLevel: 'Medium',
        disposal: 'E-waste recycling center'
    },
    {
        id: 5,
        name: 'Paper & Cardboard',
        category: 'Recyclable',
        description: 'Newspapers, magazines, cardboard boxes',
        riskLevel: 'Low',
        disposal: 'Blue recycling bin'
    },
    {
        id: 6,
        name: 'Diapers',
        category: 'Dry Waste',
        description: 'Used diapers, sanitary products',
        riskLevel: 'Medium',
        disposal: 'Sealed bag in dry waste bin'
    },
    {
        id: 7,
        name: 'Paint Cans',
        category: 'Hazardous',
        description: 'Paint, varnish, chemical containers',
        riskLevel: 'High',
        disposal: 'Hazardous waste facility'
    },
    {
        id: 8,
        name: 'Laptops',
        category: 'E-Waste',
        description: 'Old computers, laptops, monitors',
        riskLevel: 'Medium',
        disposal: 'Certified e-waste recycler'
    }
];

export default function KnowledgePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredItems = WASTE_ITEMS.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'Low': return 'text-green-400 bg-green-500/20 border-green-500';
            case 'Medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
            case 'High': return 'text-red-400 bg-red-500/20 border-red-500';
            default: return 'text-gray-400 bg-gray-500/20 border-gray-500';
        }
    };

    const getCategoryColor = (category: string) => {
        const cat = WASTE_CATEGORIES.find(c => c.name === category);
        return cat?.color || 'gray';
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Waste Knowledge Base</h1>
                <p className="text-gray-300">Learn about different waste types and proper disposal methods</p>
            </div>

            {/* Search Bar */}
            <div className="glass-card p-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search waste types..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="glass-card p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <h3 className="text-white font-semibold">Filter by Category</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    {WASTE_CATEGORIES.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${selectedCategory === category.id
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Results Count */}
            <div className="text-gray-400">
                Showing {filteredItems.length} of {WASTE_ITEMS.length} items
            </div>

            {/* Waste Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.id} className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{item.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(item.riskLevel)}`}>
                                {item.riskLevel} Risk
                            </span>
                        </div>

                        <div className="mb-4">
                            <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium bg-${getCategoryColor(item.category)}-500/20 text-${getCategoryColor(item.category)}-400 border border-${getCategoryColor(item.category)}-500`}>
                                {item.category}
                            </span>
                        </div>

                        <p className="text-gray-300 text-sm mb-4">{item.description}</p>

                        <div className="border-t border-white/10 pt-4">
                            <p className="text-gray-400 text-xs mb-1">Disposal Method:</p>
                            <p className="text-white text-sm">{item.disposal}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results */}
            {filteredItems.length === 0 && (
                <div className="glass-card p-12 text-center">
                    <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No waste items found</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
}

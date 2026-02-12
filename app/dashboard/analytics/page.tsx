'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Recycle, Award, Download, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('30days');

    const stats = [
        {
            label: 'Total Classifications',
            value: '0',
            change: '+0%',
            icon: Recycle,
            color: 'from-green-400 to-emerald-500'
        },
        {
            label: 'This Month',
            value: '0',
            change: '+0%',
            icon: TrendingUp,
            color: 'from-blue-400 to-cyan-500'
        },
        {
            label: 'Contribution Score',
            value: '0',
            change: '+0 pts',
            icon: Award,
            color: 'from-purple-400 to-pink-500'
        },
        {
            label: 'Environmental Impact',
            value: 'Low',
            change: 'Keep going!',
            icon: BarChart3,
            color: 'from-yellow-400 to-orange-500'
        }
    ];

    const categoryData = [
        { category: 'Organic', count: 0, percentage: 0, color: 'bg-green-500' },
        { category: 'Recyclable', count: 0, percentage: 0, color: 'bg-blue-500' },
        { category: 'Hazardous', count: 0, percentage: 0, color: 'bg-red-500' },
        { category: 'E-Waste', count: 0, percentage: 0, color: 'bg-purple-500' },
        { category: 'Dry Waste', count: 0, percentage: 0, color: 'bg-gray-500' }
    ];

    const monthlyData = [
        { month: 'Jan', count: 0 },
        { month: 'Feb', count: 0 },
        { month: 'Mar', count: 0 },
        { month: 'Apr', count: 0 },
        { month: 'May', count: 0 },
        { month: 'Jun', count: 0 }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-300">Track your waste classification progress and environmental impact</p>
                </div>
                <button className="btn-secondary flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Export PDF</span>
                </button>
            </div>

            {/* Date Range Selector */}
            <div className="glass-card p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <h3 className="text-white font-semibold">Time Period</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    {['7days', '30days', '90days', 'year', 'all'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`px-4 py-2 rounded-lg transition-all ${dateRange === range
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                        >
                            {range === '7days' && 'Last 7 Days'}
                            {range === '30days' && 'Last 30 Days'}
                            {range === '90days' && 'Last 90 Days'}
                            {range === 'year' && 'This Year'}
                            {range === 'all' && 'All Time'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Category Breakdown */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Category Breakdown</h2>
                <div className="space-y-4">
                    {categoryData.map((item, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white font-medium">{item.category}</span>
                                <span className="text-gray-400">{item.count} items ({item.percentage}%)</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-3">
                                <div
                                    className={`${item.color} h-3 rounded-full transition-all duration-500`}
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Monthly Trends */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Monthly Trends</h2>
                <div className="flex items-end justify-between space-x-2 h-64">
                    {monthlyData.map((data, index) => {
                        const maxCount = Math.max(...monthlyData.map(d => d.count), 1);
                        const height = (data.count / maxCount) * 100;
                        return (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="w-full flex items-end justify-center h-48">
                                    <div
                                        className="w-full bg-gradient-to-t from-green-500 to-blue-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                                        style={{ height: height > 0 ? `${height}%` : '4px' }}
                                    />
                                </div>
                                <p className="text-gray-400 text-sm mt-2">{data.month}</p>
                                <p className="text-white font-medium">{data.count}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Environmental Impact */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Environmental Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-6">
                        <p className="text-green-400 text-sm mb-2">CO₂ Saved</p>
                        <p className="text-3xl font-bold text-white">0 kg</p>
                        <p className="text-gray-400 text-xs mt-2">Through proper recycling</p>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-6">
                        <p className="text-blue-400 text-sm mb-2">Water Saved</p>
                        <p className="text-3xl font-bold text-white">0 L</p>
                        <p className="text-gray-400 text-xs mt-2">Through waste reduction</p>
                    </div>
                    <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-6">
                        <p className="text-purple-400 text-sm mb-2">Energy Saved</p>
                        <p className="text-3xl font-bold text-white">0 kWh</p>
                        <p className="text-gray-400 text-xs mt-2">Through proper disposal</p>
                    </div>
                </div>
            </div>

            {/* No Data Message */}
            <div className="glass-card p-12 text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No classification data yet</p>
                <p className="text-gray-500 text-sm mb-6">
                    Start uploading waste images to see your analytics and environmental impact!
                </p>
                <a href="/dashboard/upload" className="btn-primary inline-block">
                    Upload Waste Image
                </a>
            </div>
        </div>
    );
}

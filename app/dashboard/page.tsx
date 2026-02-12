'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import {
    Upload,
    BookOpen,
    MapPin,
    BarChart3,
    TrendingUp,
    Leaf,
    Recycle,
    AlertTriangle,
    ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
    const { user } = useAuth();

    const quickStats = [
        {
            label: 'Classifications',
            value: '0',
            icon: Recycle,
            color: 'from-green-400 to-emerald-500',
            bgColor: 'bg-green-500/20',
            borderColor: 'border-green-500'
        },
        {
            label: 'Issues Reported',
            value: '0',
            icon: AlertTriangle,
            color: 'from-yellow-400 to-orange-500',
            bgColor: 'bg-yellow-500/20',
            borderColor: 'border-yellow-500'
        },
        {
            label: 'Environmental Impact',
            value: 'Low',
            icon: Leaf,
            color: 'from-blue-400 to-cyan-500',
            bgColor: 'bg-blue-500/20',
            borderColor: 'border-blue-500'
        },
        {
            label: 'Contribution Score',
            value: '0',
            icon: TrendingUp,
            color: 'from-purple-400 to-pink-500',
            bgColor: 'bg-purple-500/20',
            borderColor: 'border-purple-500'
        }
    ];

    const quickActions = [
        {
            title: 'Upload Waste Image',
            description: 'Get instant AI classification',
            icon: Upload,
            href: '/dashboard/upload',
            color: 'from-green-400 to-blue-500'
        },
        {
            title: 'Browse Knowledge Base',
            description: 'Learn about waste types',
            icon: BookOpen,
            href: '/dashboard/knowledge',
            color: 'from-blue-400 to-purple-500'
        },
        {
            title: 'Report Issue',
            description: 'Report waste management issues',
            icon: MapPin,
            href: '/dashboard/report-issue',
            color: 'from-orange-400 to-red-500'
        },
        {
            title: 'View Analytics',
            description: 'Track your progress',
            icon: BarChart3,
            href: '/dashboard/analytics',
            color: 'from-purple-400 to-pink-500'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="glass-card p-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.username}! 👋
                </h1>
                <p className="text-gray-300">
                    Ready to make a positive environmental impact today?
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`glass-card p-6 border ${stat.borderColor}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={index}
                                href={action.href}
                                className="glass-card p-6 hover:scale-105 transition-transform duration-200 group"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`bg-gradient-to-r ${action.color} p-3 rounded-lg`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-between">
                                            {action.title}
                                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </h3>
                                        <p className="text-gray-400">{action.description}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="text-center py-12">
                    <div className="bg-white/5 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                        <Upload className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-gray-400 mb-4">No activity yet</p>
                    <Link
                        href="/dashboard/upload"
                        className="btn-primary inline-block"
                    >
                        Upload Your First Waste Image
                    </Link>
                </div>
            </div>
        </div>
    );
}

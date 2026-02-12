'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Calendar, Crown, Edit } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return null;
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
                <p className="text-gray-300">Manage your account information</p>
            </div>

            {/* Profile Card */}
            <div className="glass-card p-8">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full">
                            <User className="h-12 w-12 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                            <p className="text-gray-400">{user.role === 'admin' ? 'Administrator' : 'User'}</p>
                        </div>
                    </div>
                    {user.isPremium && (
                        <div className="flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500 rounded-lg px-4 py-2">
                            <Crown className="h-5 w-5 text-yellow-400" />
                            <span className="text-yellow-400 font-medium">Premium</span>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                        <Mail className="h-6 w-6 text-gray-400" />
                        <div>
                            <p className="text-gray-400 text-sm">Email Address</p>
                            <p className="text-white font-medium">{user.email}</p>
                        </div>
                    </div>

                    {/* Member Since */}
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                        <Calendar className="h-6 w-6 text-gray-400" />
                        <div>
                            <p className="text-gray-400 text-sm">Member Since</p>
                            <p className="text-white font-medium">{formatDate(user.createdAt)}</p>
                        </div>
                    </div>

                    {/* Premium Status */}
                    {user.isPremium && user.premiumExpiresAt && (
                        <div className="flex items-center space-x-4 p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
                            <Crown className="h-6 w-6 text-yellow-400" />
                            <div>
                                <p className="text-gray-400 text-sm">Premium Expires</p>
                                <p className="text-white font-medium">{formatDate(user.premiumExpiresAt)}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                    <p className="text-gray-400 text-sm mb-1">Total Classifications</p>
                    <p className="text-3xl font-bold text-white">0</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-gray-400 text-sm mb-1">Issues Reported</p>
                    <p className="text-3xl font-bold text-white">0</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-gray-400 text-sm mb-1">Contribution Score</p>
                    <p className="text-3xl font-bold text-white">0</p>
                </div>
            </div>

            {/* Actions */}
            <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-6">Account Actions</h3>
                <div className="space-y-4">
                    <button className="btn-secondary w-full md:w-auto">
                        Change Password
                    </button>
                    {!user.isPremium && (
                        <button className="btn-primary w-full md:w-auto ml-0 md:ml-4">
                            <Crown className="h-5 w-5 mr-2" />
                            Upgrade to Premium
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

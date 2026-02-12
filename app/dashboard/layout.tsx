'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import {
    LayoutDashboard,
    Upload,
    BookOpen,
    MapPin,
    BarChart3,
    History,
    User,
    LogOut,
    Crown
} from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading, logout, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto"></div>
                    <p className="text-white mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 glass-dark min-h-screen fixed left-0 top-16 bottom-0 overflow-y-auto">
                <div className="p-6">
                    {/* User Info */}
                    <div className="mb-8 pb-6 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-full">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-semibold">{user?.username}</p>
                                <p className="text-gray-400 text-sm">{user?.email}</p>
                            </div>
                        </div>
                        {user?.isPremium && (
                            <div className="mt-3 flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500 rounded-lg px-3 py-2">
                                <Crown className="h-4 w-4 text-yellow-400" />
                                <span className="text-yellow-400 text-sm font-medium">Premium User</span>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        <Link
                            href="/dashboard"
                            className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/dashboard/upload"
                            className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors"
                        >
                            <Upload className="h-5 w-5" />
                            <span>Upload Waste</span>
                        </Link>
                        <Link
                            href="/dashboard/knowledge"
                            className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors"
                        >
                            <BookOpen className="h-5 w-5" />
                            <span>Knowledge Base</span>
                        </Link>
                        <Link
                            href="/dashboard/report-issue"
                            className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors"
                        >
                            <MapPin className="h-5 w-5" />
                            <span>Report Issue</span>
                        </Link>
                        <Link
                            href="/dashboard/analytics"
                            className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors"
                        >
                            <BarChart3 className="h-5 w-5" />
                            <span>Analytics</span>
                        </Link>
                        <Link
                            href="/dashboard/history"
                            className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors"
                        >
                            <History className="h-5 w-5" />
                            <span>History</span>
                        </Link>
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg px-4 py-3 transition-colors"
                        >
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </Link>
                        {!user?.isPremium && (
                            <Link
                                href="/dashboard/premium"
                                className="flex items-center space-x-3 text-yellow-400 hover:bg-yellow-500/10 rounded-lg px-4 py-3 transition-colors border border-yellow-500/50"
                            >
                                <Crown className="h-5 w-5" />
                                <span>Go Premium</span>
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 text-red-400 hover:bg-red-500/10 rounded-lg px-4 py-3 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}

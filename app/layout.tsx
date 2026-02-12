import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Recycle, Trash2, Activity } from "lucide-react";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Waste Sorting System",
    description: "AI-Powered Waste Sorting, Disposal and Sanitation Monitoring System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <nav className="glass-dark sticky top-0 z-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <Link href="/" className="flex items-center space-x-2">
                                    <Recycle className="h-8 w-8 text-green-400" />
                                    <span className="text-white font-bold text-xl">EcoSort AI</span>
                                </Link>

                                <div className="hidden md:flex space-x-8">
                                    <Link
                                        href="/waste-sorting"
                                        className="text-white hover:text-green-400 transition-colors flex items-center space-x-2"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                        <span>Waste Sorting</span>
                                    </Link>
                                    <Link
                                        href="/disposal"
                                        className="text-white hover:text-green-400 transition-colors flex items-center space-x-2"
                                    >
                                        <Recycle className="h-5 w-5" />
                                        <span>Disposal Guide</span>
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        className="text-white hover:text-green-400 transition-colors"
                                    >
                                        <span>Dashboard</span>
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="text-white hover:text-green-400 transition-colors"
                                    >
                                        <span>Login</span>
                                    </Link>
                                </div>

                                {/* Mobile menu button */}
                                <div className="md:hidden">
                                    <button className="text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <main className="min-h-screen">
                        {children}
                    </main>

                    <footer className="glass-dark mt-20 py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center text-white">
                                <p className="text-sm">
                                    © 2026 EcoSort AI - AI-Powered Waste Management System
                                </p>
                                <p className="text-xs mt-2 text-gray-300">
                                    Making the world cleaner with Artificial Intelligence
                                </p>
                            </div>
                        </div>
                    </footer>
                </AuthProvider>
            </body>
        </html>
    );
}

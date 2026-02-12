import Link from "next/link";
import { Recycle, Trash2, Activity, Sparkles, Brain, TrendingUp } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center fade-in">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            AI-Powered
                            <span className="block mt-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                Waste Management
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                            Sort waste intelligently, dispose responsibly, and monitor sanitation with cutting-edge AI technology
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/waste-sorting" className="btn-primary inline-block">
                                Start Sorting Waste
                            </Link>
                            <Link href="/sanitation" className="btn-secondary inline-block">
                                View Sanitation Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Three Powerful Modules
                        </h2>
                        <p className="text-gray-200 text-lg">
                            Everything you need for intelligent waste management
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Waste Sorting Card */}
                        <Link href="/waste-sorting" className="block">
                            <div className="glass rounded-2xl p-8 card-hover h-full">
                                <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Trash2 className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    AI Waste Sorting
                                </h3>
                                <p className="text-gray-200 mb-6">
                                    Upload images or describe waste items. Our AI instantly classifies them into proper categories.
                                </p>
                                <ul className="space-y-2 text-gray-200">
                                    <li className="flex items-start">
                                        <Sparkles className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                                        <span>Image recognition AI</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Sparkles className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                                        <span>Text description analysis</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Sparkles className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                                        <span>5 waste categories</span>
                                    </li>
                                </ul>
                            </div>
                        </Link>

                        {/* Disposal Guide Card */}
                        <Link href="/disposal" className="block">
                            <div className="glass rounded-2xl p-8 card-hover h-full">
                                <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Recycle className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Smart Disposal
                                </h3>
                                <p className="text-gray-200 mb-6">
                                    Get detailed disposal recommendations with safety warnings and environmental impact information.
                                </p>
                                <ul className="space-y-2 text-gray-200">
                                    <li className="flex items-start">
                                        <Brain className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                                        <span>Eco-friendly methods</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Brain className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                                        <span>Safety precautions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Brain className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                                        <span>Step-by-step guides</span>
                                    </li>
                                </ul>
                            </div>
                        </Link>

                        {/* Sanitation Monitor Card */}
                        <Link href="/sanitation" className="block">
                            <div className="glass rounded-2xl p-8 card-hover h-full">
                                <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Activity className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Sanitation Monitoring
                                </h3>
                                <p className="text-gray-200 mb-6">
                                    Report issues, view analytics, and predict sanitation risks using machine learning.
                                </p>
                                <ul className="space-y-2 text-gray-200">
                                    <li className="flex items-start">
                                        <TrendingUp className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                                        <span>Predictive analytics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <TrendingUp className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                                        <span>Cleanliness scoring</span>
                                    </li>
                                    <li className="flex items-start">
                                        <TrendingUp className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                                        <span>Risk prediction</span>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="glass rounded-2xl p-12">
                        <div className="grid md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
                                <div className="text-gray-200">Classification Accuracy</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-400 mb-2">5</div>
                                <div className="text-gray-200">Waste Categories</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                                <div className="text-gray-200">Monitoring</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
                                <div className="text-gray-200">Software-Based</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-200 text-lg">
                            Simple, fast, and completely software-based
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-green-400 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Upload or Describe</h3>
                            <p className="text-gray-200">
                                Take a photo of waste or type a description
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">AI Analysis</h3>
                            <p className="text-gray-200">
                                Our AI classifies and provides disposal recommendations
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Take Action</h3>
                            <p className="text-gray-200">
                                Follow the guidance to dispose waste properly
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

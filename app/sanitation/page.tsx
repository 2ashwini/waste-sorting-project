"use client";

import { useState, useEffect } from "react";
import { MapPin, Send, TrendingUp, AlertCircle, CheckCircle2, BarChart3 } from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface SanitationReport {
    location: string;
    issueType: string;
    description: string;
    severity: "Low" | "Medium" | "High";
}

interface AreaAnalytics {
    area: string;
    cleanlinessScore: number;
    riskProbability: number;
    complaintCount: number;
    trend: "improving" | "stable" | "declining";
}

export default function SanitationPage() {
    const [activeView, setActiveView] = useState<"report" | "dashboard">("dashboard");
    const [formData, setFormData] = useState<SanitationReport>({
        location: "",
        issueType: "Garbage Accumulation",
        description: "",
        severity: "Medium"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [analytics, setAnalytics] = useState<AreaAnalytics[]>([]);

    useEffect(() => {
        // Load analytics data
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const response = await axios.get('/api/sanitation/analytics');
            setAnalytics(response.data);
        } catch (error) {
            // Use mock data if API fails
            setAnalytics([
                { area: "Area A", cleanlinessScore: 75, riskProbability: 35, complaintCount: 12, trend: "improving" },
                { area: "Area B", cleanlinessScore: 60, riskProbability: 55, complaintCount: 28, trend: "declining" },
                { area: "Area C", cleanlinessScore: 85, riskProbability: 20, complaintCount: 5, trend: "stable" },
                { area: "Area D", cleanlinessScore: 70, riskProbability: 40, complaintCount: 15, trend: "improving" },
                { area: "Area E", cleanlinessScore: 55, riskProbability: 65, complaintCount: 35, trend: "declining" },
            ]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);

        try {
            await axios.post('/api/sanitation/report', formData);
            setSubmitSuccess(true);
            setFormData({
                location: "",
                issueType: "Garbage Accumulation",
                description: "",
                severity: "Medium"
            });
            // Reload analytics
            setTimeout(() => loadAnalytics(), 1000);
        } catch (error) {
            console.error('Failed to submit report:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const trendChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
            {
                label: 'Cleanliness Score',
                data: [65, 68, 70, 72, 75, 78],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Risk Probability',
                data: [55, 52, 48, 45, 40, 35],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const areaComparisonData = {
        labels: analytics.map(a => a.area),
        datasets: [
            {
                label: 'Cleanliness Score',
                data: analytics.map(a => a.cleanlinessScore),
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
            },
            {
                label: 'Risk Probability',
                data: analytics.map(a => a.riskProbability),
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    };

    const getRiskColor = (risk: number) => {
        if (risk < 30) return "text-green-400";
        if (risk < 60) return "text-yellow-400";
        return "text-red-400";
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "from-green-400 to-green-600";
        if (score >= 60) return "from-yellow-400 to-yellow-600";
        return "from-red-400 to-red-600";
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 fade-in">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Sanitation Monitoring
                    </h1>
                    <p className="text-xl text-gray-200">
                        Report issues and monitor sanitation levels with AI-powered analytics
                    </p>
                </div>

                {/* View Toggle */}
                <div className="glass rounded-2xl p-2 mb-8 flex gap-2">
                    <button
                        onClick={() => setActiveView("dashboard")}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeView === "dashboard"
                                ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg"
                                : "text-white hover:bg-white/10"
                            }`}
                    >
                        <BarChart3 className="inline-block mr-2 h-5 w-5" />
                        Analytics Dashboard
                    </button>
                    <button
                        onClick={() => setActiveView("report")}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeView === "report"
                                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg"
                                : "text-white hover:bg-white/10"
                            }`}
                    >
                        <Send className="inline-block mr-2 h-5 w-5" />
                        Report Issue
                    </button>
                </div>

                {/* Dashboard View */}
                {activeView === "dashboard" && (
                    <div className="space-y-6 fade-in">
                        {/* Area Cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {analytics.slice(0, 3).map((area, index) => (
                                <div key={index} className="glass rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">{area.area}</h3>
                                        <MapPin className="h-6 w-6 text-purple-400" />
                                    </div>

                                    <div className={`bg-gradient-to-r ${getScoreColor(area.cleanlinessScore)} rounded-xl p-4 mb-4`}>
                                        <div className="text-white text-sm mb-1">Cleanliness Score</div>
                                        <div className="text-white text-3xl font-bold">{area.cleanlinessScore}%</div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-200">Risk Probability</span>
                                            <span className={`font-bold ${getRiskColor(area.riskProbability)}`}>
                                                {area.riskProbability}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-200">Complaints</span>
                                            <span className="font-bold text-white">{area.complaintCount}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-200">Trend</span>
                                            <span className={`font-bold ${area.trend === "improving" ? "text-green-400" :
                                                    area.trend === "declining" ? "text-red-400" : "text-yellow-400"
                                                }`}>
                                                {area.trend === "improving" ? "↑" : area.trend === "declining" ? "↓" : "→"} {area.trend}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Trend Chart */}
                        <div className="glass rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <TrendingUp className="h-7 w-7 text-green-400 mr-3" />
                                6-Week Trend Analysis
                            </h3>
                            <div className="h-80">
                                <Line data={trendChartData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Area Comparison */}
                        <div className="glass rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <BarChart3 className="h-7 w-7 text-purple-400 mr-3" />
                                Area Comparison
                            </h3>
                            <div className="h-80">
                                <Bar data={areaComparisonData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Predictions */}
                        <div className="glass rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <AlertCircle className="h-7 w-7 text-yellow-400 mr-3" />
                                AI Predictions & Alerts
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <AlertCircle className="h-6 w-6 text-red-400 mr-3 mt-0.5" />
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">High Risk Alert - Area E</h4>
                                            <p className="text-gray-200 text-sm">
                                                65% probability of sanitation issue next week. Recommend immediate inspection and cleanup.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-yellow-500/20 border-l-4 border-yellow-500 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <AlertCircle className="h-6 w-6 text-yellow-400 mr-3 mt-0.5" />
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">Medium Risk - Area B</h4>
                                            <p className="text-gray-200 text-sm">
                                                Declining trend detected. Monitor closely and increase cleaning frequency.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-500/20 border-l-4 border-green-500 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 mt-0.5" />
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">Good Performance - Area C</h4>
                                            <p className="text-gray-200 text-sm">
                                                Excellent cleanliness score. Maintain current sanitation practices.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Report View */}
                {activeView === "report" && (
                    <div className="glass rounded-2xl p-8 max-w-2xl mx-auto fade-in">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Report Sanitation Issue
                        </h2>

                        {submitSuccess && (
                            <div className="bg-green-500/20 border-l-4 border-green-500 rounded-lg p-4 mb-6">
                                <div className="flex items-start">
                                    <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 mt-0.5" />
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Report Submitted Successfully!</h4>
                                        <p className="text-gray-200 text-sm">
                                            Thank you for helping keep our community clean. Your report has been recorded.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    <MapPin className="inline-block h-5 w-5 mr-2" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g., Area A, Street 5, Near Park"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Issue Type
                                </label>
                                <select
                                    value={formData.issueType}
                                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                >
                                    <option value="Garbage Accumulation">Garbage Accumulation</option>
                                    <option value="Overflowing Bins">Overflowing Bins</option>
                                    <option value="Illegal Dumping">Illegal Dumping</option>
                                    <option value="Blocked Drainage">Blocked Drainage</option>
                                    <option value="Pest Infestation">Pest Infestation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Severity Level
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(["Low", "Medium", "High"] as const).map((level) => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, severity: level })}
                                            className={`py-3 px-4 rounded-xl font-semibold transition-all ${formData.severity === level
                                                    ? level === "Low"
                                                        ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                                        : level === "Medium"
                                                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                                                            : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                                                    : "bg-white/5 text-white hover:bg-white/10"
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Provide details about the sanitation issue..."
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                    rows={5}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="spinner inline-block mr-2" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="inline-block mr-2 h-5 w-5" />
                                        Submit Report
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

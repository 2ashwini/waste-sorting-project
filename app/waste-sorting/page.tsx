"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon, Type, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

type WasteCategory = "Organic" | "Recyclable" | "Hazardous" | "E-Waste" | "Dry Waste";

interface ClassificationResult {
    category: WasteCategory;
    confidence: number;
    description: string;
    disposalLink?: string;
}

export default function WasteSortingPage() {
    const [activeTab, setActiveTab] = useState<"image" | "text">("image");
    const [textInput, setTextInput] = useState("");
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ClassificationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Classify the image
            await classifyImage(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
        },
        multiple: false
    });

    const classifyImage = async (file: File) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post('/api/waste/classify-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResult(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to classify image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const classifyText = async () => {
        if (!textInput.trim()) {
            setError('Please enter a waste description');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post('/api/waste/classify-text', {
                text: textInput,
            });

            setResult(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to classify text. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getCategoryColor = (category: WasteCategory) => {
        const colors = {
            "Organic": "from-green-400 to-green-600",
            "Recyclable": "from-blue-400 to-blue-600",
            "Hazardous": "from-red-400 to-red-600",
            "E-Waste": "from-yellow-400 to-yellow-600",
            "Dry Waste": "from-gray-400 to-gray-600",
        };
        return colors[category] || "from-gray-400 to-gray-600";
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 fade-in">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        AI Waste Sorting
                    </h1>
                    <p className="text-xl text-gray-200">
                        Upload an image or describe your waste item for instant AI classification
                    </p>
                </div>

                {/* Tab Selection */}
                <div className="glass rounded-2xl p-2 mb-8 flex gap-2">
                    <button
                        onClick={() => setActiveTab("image")}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === "image"
                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg"
                                : "text-white hover:bg-white/10"
                            }`}
                    >
                        <ImageIcon className="inline-block mr-2 h-5 w-5" />
                        Image Upload
                    </button>
                    <button
                        onClick={() => setActiveTab("text")}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === "text"
                                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg"
                                : "text-white hover:bg-white/10"
                            }`}
                    >
                        <Type className="inline-block mr-2 h-5 w-5" />
                        Text Description
                    </button>
                </div>

                {/* Image Upload Tab */}
                {activeTab === "image" && (
                    <div className="glass rounded-2xl p-8 mb-8">
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${isDragActive
                                    ? "border-green-400 bg-green-400/10"
                                    : "border-gray-300 hover:border-green-400 hover:bg-white/5"
                                }`}
                        >
                            <input {...getInputProps()} />
                            <Upload className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                            <p className="text-white text-lg font-semibold mb-2">
                                {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                            </p>
                            <p className="text-gray-300">or click to select a file</p>
                        </div>

                        {uploadedImage && (
                            <div className="mt-6">
                                <img
                                    src={uploadedImage}
                                    alt="Uploaded waste"
                                    className="max-h-64 mx-auto rounded-xl shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Text Input Tab */}
                {activeTab === "text" && (
                    <div className="glass rounded-2xl p-8 mb-8">
                        <label className="block text-white font-semibold mb-3">
                            Describe the waste item:
                        </label>
                        <textarea
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder="e.g., plastic water bottle, banana peel, used battery, expired medicine..."
                            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            rows={4}
                        />
                        <button
                            onClick={classifyText}
                            disabled={isLoading}
                            className="mt-4 btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="inline-block mr-2 h-5 w-5 animate-spin" />
                                    Classifying...
                                </>
                            ) : (
                                "Classify Waste"
                            )}
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="glass rounded-2xl p-8 text-center">
                        <div className="spinner mx-auto mb-4"></div>
                        <p className="text-white text-lg">Analyzing with AI...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="glass rounded-2xl p-6 mb-8 border-l-4 border-red-500">
                        <div className="flex items-start">
                            <AlertCircle className="h-6 w-6 text-red-400 mr-3 mt-0.5" />
                            <div>
                                <h3 className="text-white font-semibold mb-1">Error</h3>
                                <p className="text-gray-200">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Result Display */}
                {result && !isLoading && (
                    <div className="glass rounded-2xl p-8 fade-in">
                        <div className="flex items-start mb-6">
                            <CheckCircle className="h-8 w-8 text-green-400 mr-3 mt-1" />
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Classification Complete
                                </h2>
                                <p className="text-gray-200">
                                    AI has analyzed your waste item
                                </p>
                            </div>
                        </div>

                        <div className={`bg-gradient-to-r ${getCategoryColor(result.category)} rounded-xl p-6 mb-6`}>
                            <h3 className="text-white text-3xl font-bold mb-2">
                                {result.category}
                            </h3>
                            <div className="flex items-center">
                                <div className="bg-white/20 rounded-full px-4 py-1">
                                    <span className="text-white font-semibold">
                                        {Math.round(result.confidence * 100)}% Confidence
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 mb-6">
                            <h4 className="text-white font-semibold mb-2">Description:</h4>
                            <p className="text-gray-200">{result.description}</p>
                        </div>

                        {result.disposalLink && (
                            <a
                                href="/disposal"
                                className="btn-secondary w-full block text-center"
                            >
                                View Disposal Recommendations
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

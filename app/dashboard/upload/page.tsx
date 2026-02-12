'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Upload, Image as ImageIcon, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
                setResult(null);
                setError('');
            }
        }
    });

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/waste/classify-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setResult(response.data.data);
            } else {
                setError(response.data.message || 'Classification failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error uploading image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Upload Waste Image</h1>
                <p className="text-gray-300">Get instant AI-powered waste classification</p>
            </div>

            {/* Upload Area */}
            <div className="glass-card p-8">
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${isDragActive
                        ? 'border-green-400 bg-green-500/10'
                        : 'border-gray-600 hover:border-green-400'
                        }`}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center space-y-4">
                        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full">
                            {preview ? (
                                <ImageIcon className="h-12 w-12 text-white" />
                            ) : (
                                <Upload className="h-12 w-12 text-white" />
                            )}
                        </div>
                        {preview ? (
                            <div className="space-y-2">
                                <p className="text-white font-medium">{selectedFile?.name}</p>
                                <p className="text-gray-400 text-sm">Click to change image</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-white font-medium">
                                    {isDragActive ? 'Drop image here' : 'Drag & drop waste image here'}
                                </p>
                                <p className="text-gray-400 text-sm">or click to browse</p>
                                <p className="text-gray-500 text-xs">Supports: PNG, JPG, JPEG, GIF, WEBP</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview */}
                {preview && (
                    <div className="mt-6">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-w-md mx-auto rounded-lg shadow-lg"
                        />
                    </div>
                )}

                {/* Upload Button */}
                {selectedFile && !result && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <Loader className="animate-spin mr-2 h-5 w-5" />
                                    Classifying...
                                </span>
                            ) : (
                                'Classify Waste'
                            )}
                        </button>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mt-6 bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}
            </div>

            {/* Results */}
            {result && (
                <div className="glass-card p-8 space-y-6">
                    <div className="flex items-center space-x-3 pb-6 border-b border-white/10">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                        <div>
                            <h2 className="text-2xl font-bold text-white">Classification Complete</h2>
                            <p className="text-gray-400">Here are the results</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Category</p>
                            <p className="text-2xl font-bold text-white">{result.category}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Confidence</p>
                            <p className="text-2xl font-bold text-green-400">{(result.confidence * 100).toFixed(1)}%</p>
                        </div>
                    </div>

                    {result.description && (
                        <div>
                            <p className="text-gray-400 text-sm mb-2">Description</p>
                            <p className="text-white">{result.description}</p>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            setSelectedFile(null);
                            setPreview(null);
                            setResult(null);
                        }}
                        className="btn-secondary"
                    >
                        Upload Another Image
                    </button>
                </div>
            )}
        </div>
    );
}

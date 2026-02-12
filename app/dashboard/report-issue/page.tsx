'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MapPin, Upload as UploadIcon, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const ISSUE_TYPES = [
    'Illegal Dumping',
    'Overflowing Bins',
    'Hazardous Waste',
    'Littering',
    'Broken Bins',
    'Other'
];

const SEVERITY_LEVELS = [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'medium', label: 'Medium', color: 'yellow' },
    { value: 'high', label: 'High', color: 'orange' },
    { value: 'critical', label: 'Critical', color: 'red' }
];

export default function ReportIssuePage() {
    const [formData, setFormData] = useState({
        issueType: '',
        severity: '',
        location: '',
        description: ''
    });
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg']
        },
        maxFiles: 5,
        onDrop: (acceptedFiles) => {
            setImages(prev => [...prev, ...acceptedFiles].slice(0, 5));
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.issueType || !formData.severity || !formData.location || !formData.description) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            // Reset form
            setFormData({
                issueType: '',
                severity: '',
                location: '',
                description: ''
            });
            setImages([]);
        }, 2000);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    if (success) {
        return (
            <div className="space-y-8">
                <div className="glass-card p-12 text-center">
                    <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Issue Reported Successfully!</h2>
                    <p className="text-gray-300 mb-6">
                        Thank you for reporting this issue. Our team will review it shortly.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="btn-primary"
                    >
                        Report Another Issue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Report Waste Issue</h1>
                <p className="text-gray-300">Help us keep your community clean by reporting waste management issues</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Issue Type */}
                <div className="glass-card p-6">
                    <label className="block text-white font-semibold mb-3">
                        Issue Type <span className="text-red-400">*</span>
                    </label>
                    <select
                        name="issueType"
                        value={formData.issueType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-green-400"
                        required
                    >
                        <option value="" className="bg-gray-800">Select issue type</option>
                        {ISSUE_TYPES.map(type => (
                            <option key={type} value={type} className="bg-gray-800">{type}</option>
                        ))}
                    </select>
                </div>

                {/* Severity */}
                <div className="glass-card p-6">
                    <label className="block text-white font-semibold mb-3">
                        Severity Level <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {SEVERITY_LEVELS.map(level => (
                            <button
                                key={level.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, severity: level.value })}
                                className={`px-4 py-3 rounded-lg font-medium transition-all ${formData.severity === level.value
                                        ? `bg-${level.color}-500 text-white`
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                    }`}
                            >
                                {level.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Location */}
                <div className="glass-card p-6">
                    <label className="block text-white font-semibold mb-3">
                        Location <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter address or location"
                            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="glass-card p-6">
                    <label className="block text-white font-semibold mb-3">
                        Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the issue in detail..."
                        rows={5}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 resize-none"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div className="glass-card p-6">
                    <label className="block text-white font-semibold mb-3">
                        Upload Images (Optional, max 5)
                    </label>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                                ? 'border-green-400 bg-green-500/10'
                                : 'border-gray-600 hover:border-green-400'
                            }`}
                    >
                        <input {...getInputProps()} />
                        <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-white mb-1">
                            {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
                        </p>
                        <p className="text-gray-400 text-sm">or click to browse</p>
                    </div>

                    {/* Image Previews */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                            {images.map((file, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <Loader className="animate-spin mr-2 h-5 w-5" />
                            Submitting...
                        </span>
                    ) : (
                        'Submit Report'
                    )}
                </button>
            </form>
        </div>
    );
}

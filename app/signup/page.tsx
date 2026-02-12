'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Password strength validation
    const validatePassword = (password: string) => {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        const strength = Object.values(checks).filter(Boolean).length;
        return { checks, strength };
    };

    const passwordValidation = validatePassword(formData.password);
    const isPasswordStrong = passwordValidation.strength === 5;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Gmail validation
        if (!formData.email.endsWith('@gmail.com')) {
            setError('Please use a Gmail address (@gmail.com)');
            return;
        }

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Strong password validation
        if (!isPasswordStrong) {
            setError('Password must meet all requirements');
            return;
        }

        setLoading(true);

        try {
            await register(formData.username, formData.email, formData.password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="glass-card max-w-md w-full p-8 space-y-6">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-full">
                            <UserPlus className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-300">Join EcoSort AI and start managing waste smartly</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength={3}
                                maxLength={30}
                                className="input-field pl-10"
                                placeholder="johndoe"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                            Email Address (Gmail only)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-field pl-10"
                                placeholder="you@gmail.com"
                            />
                        </div>
                        {formData.email && !formData.email.endsWith('@gmail.com') && (
                            <p className="text-xs text-red-400 mt-1 flex items-center">
                                <XCircle className="h-3 w-3 mr-1" />
                                Must be a Gmail address
                            </p>
                        )}
                        {formData.email.endsWith('@gmail.com') && (
                            <p className="text-xs text-green-400 mt-1 flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Valid Gmail address
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-field pl-10"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Password Strength Indicator */}
                        {formData.password && (
                            <div className="mt-3 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-white/10 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${passwordValidation.strength === 5 ? 'bg-green-500' :
                                                    passwordValidation.strength >= 3 ? 'bg-yellow-500' :
                                                        'bg-red-500'
                                                }`}
                                            style={{ width: `${(passwordValidation.strength / 5) * 100}%` }}
                                        />
                                    </div>
                                    <span className={`text-xs font-medium ${passwordValidation.strength === 5 ? 'text-green-400' :
                                            passwordValidation.strength >= 3 ? 'text-yellow-400' :
                                                'text-red-400'
                                        }`}>
                                        {passwordValidation.strength === 5 ? 'Strong' :
                                            passwordValidation.strength >= 3 ? 'Medium' :
                                                'Weak'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className={`flex items-center ${passwordValidation.checks.length ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordValidation.checks.length ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                        8+ characters
                                    </div>
                                    <div className={`flex items-center ${passwordValidation.checks.uppercase ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordValidation.checks.uppercase ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                        Uppercase
                                    </div>
                                    <div className={`flex items-center ${passwordValidation.checks.lowercase ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordValidation.checks.lowercase ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                        Lowercase
                                    </div>
                                    <div className={`flex items-center ${passwordValidation.checks.number ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordValidation.checks.number ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                        Number
                                    </div>
                                    <div className={`flex items-center ${passwordValidation.checks.special ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordValidation.checks.special ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                        Special (!@#$...)
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="input-field pl-10"
                                placeholder="••••••••"
                            />
                            {passwordsMatch && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating account...
                            </span>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-gray-300">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { Search, MapPin } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-light-blue/50 via-white to-white">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column - Content */}
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-blue text-primary font-medium text-sm mb-6 animate-pulse">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Over 10,000+ New Jobs Daily
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight tracking-tight mb-6">
                            Find Your <span className="text-primary relative">
                                Dream Job
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" className="path-animation" />
                                </svg>
                            </span> <br />
                            Faster
                        </h1>
                        <p className="text-xl text-text-secondary mb-10 leading-relaxed">
                            Explore thousands of job opportunities from top companies and apply instantly. Your next big career move starts here.
                        </p>

                        {/* Search Box */}
                        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-primary/5 flex flex-col sm:flex-row gap-3 border border-gray-100 relative z-20">
                            <div className="flex-1 flex items-center px-4 bg-gray-50/50 rounded-xl border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
                                <Search className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Job title, keyword or company"
                                    className="w-full bg-transparent border-none py-3 px-3 text-text-primary focus:outline-none placeholder:text-gray-400"
                                />
                            </div>
                            <div className="flex-1 flex items-center px-4 bg-gray-50/50 rounded-xl border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="City, state, or zip code"
                                    className="w-full bg-transparent border-none py-3 px-3 text-text-primary focus:outline-none placeholder:text-gray-400"
                                />
                            </div>
                            <button className="bg-primary hover:bg-secondary text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 sm:w-auto w-full">
                                Search
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <span className="text-sm font-medium text-text-secondary">Popular Searches:</span>
                            {['Frontend Developer', 'UI/UX Designer', 'Data Scientist', 'Product Manager'].map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-text-secondary hover:text-primary hover:border-primary/30 transition-colors cursor-pointer cursor-hover">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex items-center gap-6">
                            <button className="px-8 py-3.5 bg-text-primary text-white font-semibold rounded-full hover:bg-gray-800 shadow-xl transition-all transform hover:-translate-y-1">
                                Explore Jobs
                            </button>
                            <button className="px-8 py-3.5 text-text-primary font-semibold rounded-full hover:bg-gray-100 transition-all">
                                Post a Job
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Image Placeholder */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/5 rounded-[3rem] transform rotate-3 scale-105 opacity-50"></div>
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="People working together"
                            className="relative rounded-[3rem] object-cover h-[600px] w-full shadow-2xl z-10"
                        />
                        {/* Floating Card */}
                        <div className="absolute bottom-10 -left-10 bg-white p-5 rounded-2xl shadow-2xl z-20 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary font-medium">Job Offer Received</p>
                                <p className="text-sm font-bold text-text-primary">Stripe - Senior Engineer</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;

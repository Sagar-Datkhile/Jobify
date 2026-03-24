import React from 'react';
import { Sparkles, FileText, Activity, Briefcase, BellRing, ShieldCheck } from 'lucide-react';

const features = [
    {
        name: 'Smart Job Search',
        description: 'AI-powered search engine that matches your skills and preferences with the perfect roles.',
        icon: <Sparkles className="h-6 w-6" />
    },
    {
        name: 'Resume Builder & Upload',
        description: 'Easily upload your existing resume or build a new one using our professional templates.',
        icon: <FileText className="h-6 w-6" />
    },
    {
        name: 'Application Tracking',
        description: 'Monitor the status of all your applications in real-time from a centralized dashboard.',
        icon: <Activity className="h-6 w-6" />
    },
    {
        name: 'Employer Dashboard',
        description: 'Powerful tools for companies to manage job postings, review applicants, and hire talent.',
        icon: <Briefcase className="h-6 w-6" />
    },
    {
        name: 'Real-time Notifications',
        description: 'Get instant alerts for new job matches, interview requests, and application updates.',
        icon: <BellRing className="h-6 w-6" />
    },
    {
        name: 'Secure Authentication',
        description: 'Enterprise-grade security ensuring your personal data and professional history are safe.',
        icon: <ShieldCheck className="h-6 w-6" />
    }
];

const Features = () => {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6">Powerful Platform Features</h2>
                    <p className="text-lg text-text-secondary">
                        Everything you need to accelerate your career or find the perfect candidate, all in one intuitive platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/20 soft-shadow transition-all duration-300 group hover:-translate-y-1">
                            <div className="w-14 h-14 bg-light-blue rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-3 leading-snug">{feature.name}</h3>
                            <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

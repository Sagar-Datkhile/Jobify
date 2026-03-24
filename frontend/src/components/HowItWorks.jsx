import React from 'react';
import { UserPlus, Search, Send, ArrowRight } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: 'Create Profile',
        description: 'Sign up and build your professional profile within minutes. Add your skills and experience.',
        icon: <UserPlus className="w-8 h-8" />,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        id: 2,
        title: 'Search Jobs',
        description: 'Find jobs using smart search and advanced filters. Get tailored recommendations.',
        icon: <Search className="w-8 h-8" />,
        color: 'bg-indigo-100 text-indigo-600'
    },
    {
        id: 3,
        title: 'Apply Easily',
        description: 'Submit job applications instantly with one click and track your application status.',
        icon: <Send className="w-8 h-8" />,
        color: 'bg-green-100 text-green-600'
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Process</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6 tracking-tight">How Jobify Works</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Your dream job is just three simple steps away. Follow our seamless process to accelerate your career.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Lines for Desktop */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-green-200 -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={step.id} className="relative group text-center">
                            <div className="flex justify-center mb-8 relative">
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${step.color} shadow-xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    {step.icon}
                                </div>
                                {/* Step Number Badge */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-text-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                                    {step.id}
                                </div>
                            </div>

                            <h4 className="text-2xl font-bold text-text-primary mb-3 leading-snug">{step.title}</h4>
                            <p className="text-text-secondary leading-relaxed">{step.description}</p>

                            {/* Arrow for mobile view */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center mt-8">
                                    <ArrowRight className="w-6 h-6 text-gray-300 transform rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

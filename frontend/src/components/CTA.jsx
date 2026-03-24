import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
            <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary relative overflow-hidden shadow-2xl shadow-primary/40">
                {/* Background Decorative patterns */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-secondary/80 blur-3xl rounded-full"></div>

                <div className="relative z-10 p-12 md:p-20 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-yellow-300" /> Let's get to work
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                        Ready to Start Your <br className="hidden md:block" />
                        <span className="text-yellow-300">Career Journey?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        Join thousands of professionals who have found their dream job using our platform. Create an account today and take the first step.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                            Get Started
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-white/30 font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                            Browse Jobs
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;

import React from 'react';

const companies = [
    { name: 'Google', color: 'text-blue-500' },
    { name: 'Microsoft', color: 'text-blue-600' },
    { name: 'Amazon', color: 'text-yellow-600' },
    { name: 'Meta', color: 'text-blue-700' },
    { name: 'Netflix', color: 'text-red-600' }
];

const Companies = () => {
    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-8">
                    Trusted by Leading Companies
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {companies.map((company) => (
                        <div key={company.name} className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                            {/* Fake Logo Representation */}
                            <span className={`text-2xl md:text-3xl font-extrabold tracking-tight ${company.color} opacity-80 hover:opacity-100 hover:scale-110 transition-transform duration-300`}>
                                {company.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;

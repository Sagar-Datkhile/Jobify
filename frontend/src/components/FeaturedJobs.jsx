import React from 'react';
import { MapPin, DollarSign, Clock, Bookmark } from 'lucide-react';

const jobs = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'Stripe',
        location: 'San Francisco, CA',
        salary: '$140k - $180k',
        type: 'Full-time',
        logo: 'S',
        bgColor: 'bg-purple-100 text-purple-600'
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Figma',
        location: 'Remote',
        salary: '$120k - $150k',
        type: 'Full-time',
        logo: 'F',
        bgColor: 'bg-pink-100 text-pink-600'
    },
    {
        id: 3,
        title: 'Backend Developer',
        company: 'Spotify',
        location: 'New York, NY',
        salary: '$130k - $160k',
        type: 'Contract',
        logo: 'SP',
        bgColor: 'bg-green-100 text-green-600'
    },
    {
        id: 4,
        title: 'Data Scientist',
        company: 'Airbnb',
        location: 'Seattle, WA',
        salary: '$150k - $190k',
        type: 'Part-time',
        logo: 'A',
        bgColor: 'bg-rose-100 text-rose-600'
    },
    {
        id: 5,
        title: 'DevOps Engineer',
        company: 'GitHub',
        location: 'Remote',
        salary: '$140k - $175k',
        type: 'Full-time',
        logo: 'G',
        bgColor: 'bg-gray-100 text-gray-800'
    },
    {
        id: 6,
        title: 'UX Researcher',
        company: 'Notion',
        location: 'Austin, TX',
        salary: '$110k - $140k',
        type: 'Full-time',
        logo: 'N',
        bgColor: 'bg-slate-100 text-slate-800'
    }
];

const FeaturedJobs = () => {
    return (
        <section className="py-24 bg-light-blue/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-text-primary mb-4">Featured Job Opportunities</h2>
                        <p className="text-text-secondary max-w-2xl text-lg">
                            Discover the best roles from top tech companies. New opportunities added daily.
                        </p>
                    </div>
                    <button className="text-primary font-semibold hover:text-secondary mt-4 md:mt-0 flex items-center gap-1 group">
                        View All Jobs
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-3xl p-6 border border-gray-100 soft-shadow card-hover relative group">
                            {/* Save Button */}
                            <button className="absolute top-6 right-6 text-gray-300 hover:text-primary transition-colors">
                                <Bookmark className="h-6 w-6" />
                            </button>

                            {/* Company Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold ${job.bgColor}`}>
                                    {job.logo}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-text-primary leading-tight">{job.title}</h3>
                                    <p className="text-sm font-medium text-text-secondary">{job.company}</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-3 py-1 bg-light-blue/50 text-text-primary text-xs font-semibold rounded-full flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {job.location}
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                    <DollarSign className="w-3 h-3" /> {job.salary}
                                </span>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {job.type}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                                <button className="flex-1 bg-primary text-white py-2.5 rounded-xl font-semibold hover:bg-secondary transition-colors text-sm">
                                    Apply Now
                                </button>
                                <button className="flex-1 bg-gray-50 text-text-primary py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors border border-gray-200 text-sm">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedJobs;

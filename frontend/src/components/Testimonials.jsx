import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        role: 'Product Designer at Spotify',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        review: 'Jobify completely transformed my job search. The UI is gorgeous, and the smart matching actually recommended the role I ended up accepting!',
        rating: 5
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Senior Developer at Stripe',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        review: "I've never experienced such a seamless application process. The application tracking feature kept me sane during my 3-month job hunt.",
        rating: 5
    },
    {
        id: 3,
        name: 'Emily Davis',
        role: 'Marketing Director',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        review: 'As an employer, finding quality talent is usually a headache. This platform makes sorting through candidates and scheduling interviews incredibly easy.',
        rating: 4
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">What Our Users Say</h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Don't just take our word for it. Read the success stories from professionals who found their next big opportunity through Jobify.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-3xl border border-gray-100 soft-shadow group hover:border-primary/20 transition-all duration-300">
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-text-primary text-lg mb-8 italic leading-relaxed">"{testimonial.review}"</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-text-primary text-sm">{testimonial.name}</h4>
                                    <p className="text-xs text-text-secondary font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

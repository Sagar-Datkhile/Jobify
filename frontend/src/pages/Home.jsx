import React from 'react';
import Hero from '../components/Hero';
import Companies from '../components/Companies';
import FeaturedJobs from '../components/FeaturedJobs';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const Home = () => {
    return (
        <div className="bg-background pt-16">
            <Hero />
            <Companies />
            <FeaturedJobs />
            <HowItWorks />
            <Features />
            <Testimonials />
            <CTA />
        </div>
    );
};

export default Home;

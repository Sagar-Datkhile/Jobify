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
            <div id="home" className="scroll-mt-24">
                <Hero />
            </div>
            <div id="companies" className="scroll-mt-24">
                <Companies />
            </div>
            <div id="jobs" className="scroll-mt-24">
                <FeaturedJobs />
            </div>
            <div id="about" className="scroll-mt-24">
                <HowItWorks />
            </div>
            <Features />
            <Testimonials />
            <div id="contact" className="scroll-mt-24">
                <CTA />
            </div>
        </div>
    );
};

export default Home;

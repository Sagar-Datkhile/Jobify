import React from 'react';
import { Briefcase, Twitter, Linkedin, Github, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <a href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="bg-primary p-2 rounded-lg group-hover:bg-secondary transition-colors">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Jobify</span>
                        </a>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Connecting talented professionals with world-class companies. Your next career move starts here.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 tracking-wide">Company</h4>
                        <ul className="space-y-4">
                            {['About', 'Careers', 'Blog', 'Press'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 tracking-wide">Resources</h4>
                        <ul className="space-y-4">
                            {['Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 tracking-wide">Contact</h4>
                        <ul className="space-y-4 font-medium text-sm text-gray-400">
                            <li className="flex flex-col">
                                <span className="text-gray-500 mb-1">Email</span>
                                <a href="mailto:hello@jobify.com" className="hover:text-white transition-colors">hello@jobify.com</a>
                            </li>
                            <li className="flex flex-col mt-4">
                                <span className="text-gray-500 mb-1">Phone</span>
                                <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
                            </li>
                            <li className="flex flex-col mt-4">
                                <span className="text-gray-500 mb-1">Address</span>
                                <span>123 Market St, Suite 100<br />San Francisco, CA 94105</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm font-medium">
                        © {new Date().getFullYear()} Jobify Inc. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by our team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

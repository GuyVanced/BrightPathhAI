import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">BrightPath</h3>
                        <p className="text-gray-400 text-sm">
                            Empowering learners with personalized learning paths and AI-driven guidance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/practice" className="text-gray-400 hover:text-white text-sm">
                                    Practice
                                </Link>
                            </li>
                            <li>
                                <Link to="/role-roadmaps" className="text-gray-400 hover:text-white text-sm">
                                    Role Roadmaps
                                </Link>
                            </li>
                            <li>
                                <Link to="/skill-roadmaps" className="text-gray-400 hover:text-white text-sm">
                                    Skill Roadmaps
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/blog" className="text-gray-400 hover:text-white text-sm">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/tutorials" className="text-gray-400 hover:text-white text-sm">
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/support" className="text-gray-400 hover:text-white text-sm">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-400 text-sm">
                                Email: support@brightpath.com
                            </li>
                            <li className="text-gray-400 text-sm">
                                Phone: +1 (555) 123-4567
                            </li>
                            <li className="text-gray-400 text-sm">
                                Address: 123 Tech Street
                                <br />
                                San Francisco, CA 94105
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm">
                            © 2024 BrightPath. All rights reserved.
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Current Roadmap</p>
                <p className="font-medium">Full Stack Development</p>
              </div>
              <div>
                <p className="text-gray-600">Completion</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">45% Complete</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <p className="text-sm">Completed React Basics module</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <p className="text-sm">Started Node.js Fundamentals</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full mr-2 text-sm">1</span>
                <span>Complete Express.js Tutorial</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full mr-2 text-sm">2</span>
                <span>Start Database Integration</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/practice" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">Practice Exercises</h3>
            <p className="text-sm text-gray-600">Test your knowledge</p>
          </Link>
          <Link to="/roadmaps" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">Browse Roadmaps</h3>
            <p className="text-sm text-gray-600">Explore learning paths</p>
          </Link>
          <Link to="/ai-assistant" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-sm text-gray-600">Get personalized help</p>
          </Link>
          <Link to="/settings" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold">Settings</h3>
            <p className="text-sm text-gray-600">Manage your account</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/App.css';

const RoleBasedRoadmaps = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/roles/');
                setRoles(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching roles:', error);
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <p>Loading roles...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Role-Based Learning Paths
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Choose your desired role and follow a curated learning path
                    </p>
                </div>

                <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                    {roles.map((role) => (
                        <div key={role.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-indigo-600">
                                        {role.category}
                                    </p>
                                    <div className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-900">
                                            {role.title}
                                        </p>
                                        <p className="mt-3 text-base text-gray-500">
                                            {role.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="sr-only">{role.difficulty}</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                Difficulty: {role.difficulty}
                                            </p>
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <span>{role.duration} months</span>
                                                <span aria-hidden="true">&middot;</span>
                                                <span>{role.modules} modules</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoleBasedRoadmaps;

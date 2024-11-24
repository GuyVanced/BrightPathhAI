import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/App.css';

const SkillsBasedRoadmaps = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [customRoadmap, setCustomRoadmap] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/skills/');
                setSkills(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching skills:', error);
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const handleSkillSelect = (skillId) => {
        if (selectedSkills.includes(skillId)) {
            setSelectedSkills(selectedSkills.filter(id => id !== skillId));
        } else {
            setSelectedSkills([...selectedSkills, skillId]);
        }
    };

    const generateRoadmap = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/generate-roadmap/', {
                skills: selectedSkills
            });
            setCustomRoadmap(response.data);
        } catch (error) {
            console.error('Error generating roadmap:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <p>Loading skills...</p>
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
                        Skills-Based Learning Paths
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Select the skills you want to learn and get a personalized roadmap
                    </p>
                </div>

                <div className="mt-12">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className={`relative rounded-lg border p-4 cursor-pointer ${
                                    selectedSkills.includes(skill.id)
                                        ? 'border-indigo-500 bg-indigo-50'
                                        : 'border-gray-300'
                                }`}
                                onClick={() => handleSkillSelect(skill.id)}
                            >
                                <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">{skill.description}</p>
                            </div>
                        ))}
                    </div>

                    {selectedSkills.length > 0 && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={generateRoadmap}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Generate Roadmap
                            </button>
                        </div>
                    )}

                    {customRoadmap && (
                        <div className="mt-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Custom Roadmap</h3>
                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                    {customRoadmap.steps.map((step, index) => (
                                        <li key={index}>
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-indigo-600 truncate">
                                                        Step {index + 1}
                                                    </p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {step.duration}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillsBasedRoadmaps;

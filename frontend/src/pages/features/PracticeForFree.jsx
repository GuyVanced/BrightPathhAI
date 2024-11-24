import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/App.css';

const PracticeForFree = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [userSolution, setUserSolution] = useState('');
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/exercises/');
                setExercises(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching exercises:', error);
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    const handleExerciseSelect = (exercise) => {
        setSelectedExercise(exercise);
        setUserSolution('');
        setFeedback(null);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/exercises/submit/', {
                exerciseId: selectedExercise.id,
                solution: userSolution
            });
            setFeedback(response.data);
        } catch (error) {
            console.error('Error submitting solution:', error);
            setFeedback({
                success: false,
                message: 'Error submitting solution. Please try again.'
            });
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
                                    <p>Loading exercises...</p>
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
                        Practice For Free
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Enhance your skills with our free practice exercises
                    </p>
                </div>

                <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                    {exercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            className={`flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer ${
                                selectedExercise?.id === exercise.id ? 'ring-2 ring-indigo-500' : ''
                            }`}
                            onClick={() => handleExerciseSelect(exercise)}
                        >
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-indigo-600">
                                        {exercise.category}
                                    </p>
                                    <div className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-900">
                                            {exercise.title}
                                        </p>
                                        <p className="mt-3 text-base text-gray-500">
                                            {exercise.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="sr-only">{exercise.difficulty}</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                Difficulty: {exercise.difficulty}
                                            </p>
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <span>{exercise.estimatedTime} minutes</span>
                                                <span aria-hidden="true">&middot;</span>
                                                <span>{exercise.points} points</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedExercise && (
                    <div className="mt-12 bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {selectedExercise.title}
                            </h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>{selectedExercise.description}</p>
                            </div>
                            <div className="mt-5">
                                <textarea
                                    rows="4"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Write your solution here..."
                                    value={userSolution}
                                    onChange={(e) => setUserSolution(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="mt-5">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Submit Solution
                                </button>
                            </div>
                            {feedback && (
                                <div className={`mt-4 p-4 rounded-md ${
                                    feedback.success ? 'bg-green-50' : 'bg-red-50'
                                }`}>
                                    <p className={`text-sm ${
                                        feedback.success ? 'text-green-700' : 'text-red-700'
                                    }`}>
                                        {feedback.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticeForFree;

import React, { useState } from 'react';
import { endpoints, createApiClient } from '../../config/api';
import '../../styles/App.css';

const BrightPathAI = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const apiClient = createApiClient();
            const result = await apiClient.post(endpoints.ai.chat, { query });
            setResponse(result.response);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Sorry, there was an error processing your request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">BrightPath AI Assistant</h1>
                    <p className="mt-2 text-lg text-gray-600">Your personal learning guide powered by AI</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="query" className="sr-only">Your question</label>
                            <textarea
                                id="query"
                                name="query"
                                rows="4"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Ask me anything about your learning journey..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading || !query.trim()}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    loading || !query.trim() 
                                    ? 'bg-indigo-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                }`}
                            >
                                {loading ? 'Processing...' : 'Ask AI'}
                            </button>
                        </div>
                    </form>

                    {response && (
                        <div className="mt-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-2">Response:</h2>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrightPathAI;

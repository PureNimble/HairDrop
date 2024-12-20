import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { apiClient } from '../api/apiService';

const SearchInput = ({ onResults, onSafeResults, onError, onSafeError }) => {
    const [query, setQuery] = useState('');
    const [allowInjection, setAllowInjection] = useState(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleToggleInjection = () => {
        setAllowInjection(!allowInjection);
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
        if (allowInjection) {
            try {
                const outputElement = document.getElementById('title');
                outputElement.innerHTML = query;
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const response = await apiClient.post('/search', query);
                if (onResults) onResults(response.data);
            } catch (err) {
                if (onError) {
                    const errorMessage = err.response?.data || err.message || 'An unknown error occurred';
                    onError(`Failed to fetch search results: ${errorMessage}`);
                }
            }
    
            try {
                const safeResponse = await apiClient.post('/searchSafe', query);
                if (onSafeResults) onSafeResults(safeResponse.data);
            } catch (err) {
                if (onSafeError) onSafeError('Failed to fetch search results. Please try again.');
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center relative">
            <span className="absolute left-3 text-gray-400">
                <CiSearch size={20} />
            </span>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder={allowInjection ? "Enter script to execute" : "Enter search query"}
                className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-transparent bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white focus:border-blue-400 transition-all duration-300"
            />
            <button
                onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Search
            </button>
            <button
                onClick={handleToggleInjection}
                className={`ml-2 h-10 px-4 text-sm ${allowInjection ? 'bg-red-500' : 'bg-gray-500'} text-white rounded-lg hover:${allowInjection ? 'bg-red-600' : 'bg-gray-600'} transition-all duration-300`}
            >
                {allowInjection ? 'Disable XSS' : 'Enable XSS'}
            </button>
        </div>
    );
};

export default SearchInput;

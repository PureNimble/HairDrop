import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { apiClient } from '../api/apiService';

const SearchInput = ({ onResults, onError }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!query.trim()) return;


        try {
            const response = await apiClient.post('/search', query);

            if (onResults) onResults(response.data);
        } catch (err) {
            console.error('Search failed:', err);
            if (onError) onError('Failed to fetch search results. Please try again.');
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
                placeholder="Search"
                className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-transparent bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white focus:border-blue-400 transition duration-300"
            />
            <button
                onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Search
            </button>
        </div>
    );
};

export default SearchInput;

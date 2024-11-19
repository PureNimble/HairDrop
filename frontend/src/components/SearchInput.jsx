import React from 'react';
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
    return (
        <div className="flex items-center relative">
            <span className="absolute left-3 text-gray-400">
                <CiSearch size={20} />
            </span>
            <input
                type="search"
                placeholder="Search"
                className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-transparent bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white focus:border-blue-400 transition duration-300"
            />
        </div>
    );
};

export default SearchInput;

import React, { useState } from 'react';
import { SearchInput, TableDB, LogoutButton } from '../components';

function Home() {
    const [searchResults, setSearchResults] = useState(null);
    const [safeSearchResults, setSafeSearchResults] = useState(null);
    const [error, setError] = useState(null);
    const [safeError, setSafeError] = useState(null);

    const handleResults = (results) => {
        setSearchResults(results);
        setError(null);
    };

    const handleSafeResults = (results) => {
        setSafeSearchResults(results);
        setSafeError(null);
    };

    return (
        <>
            <div className="flex justify-end p-4">
                <LogoutButton />
            </div>
            <section className="container mx-auto px-12 py-8">
                <div className="flex justify-center mt-16">
                    <div className="w-full max-w-4xl">
                        <SearchInput
                            onResults={handleResults}
                            onSafeResults={handleSafeResults}
                            onError={setError}
                            safeError={setSafeError}
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <div className="w-full mx-auto">
                        {(searchResults || error) && (
                            <>
                                <h1 className="text-2xl font-bold text-center text-red-700 mb-8">
                                    SQL Injected Table
                                </h1>
                                {error && (
                                    <p className="text-red-500 flex justify-center">{error}</p>
                                )}
                                {!error && searchResults && (
                                    <TableDB data={searchResults} />
                                )}
                            </>
                        )}

                        {(safeSearchResults || safeError) && (
                            <>
                                <h1 className="text-2xl font-bold text-center mt-8 mb-8 text-green-700">
                                    Safe Table
                                </h1>
                                {safeError && (
                                    <p className="text-red-500 flex justify-center">{safeError}</p>
                                )}
                                {!safeError &&
                                    (safeSearchResults.length > 0 ? (
                                        <TableDB data={safeSearchResults} />
                                    ) : (
                                        <p className="text-gray-500 text-center">
                                            No data available
                                        </p>
                                    ))}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

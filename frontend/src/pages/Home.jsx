import React, { useState } from 'react';
import { SearchInput, TableDB, LogoutButton } from '../components';

function Home() {
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <>
            <div className="flex justify-end p-4">
                <LogoutButton />
            </div>
            <section className="container mx-auto px-16 py-8">
                <div className="flex justify-center mt-16">
                    <div className="w-full max-w-4xl">
                        <SearchInput
                            onResults={setSearchResults}
                            onError={setError}
                            onLoading={setLoading}
                        />
                    </div>
                </div>
                <div className="mt-12">
                    <div className="w-full max-w-6xl mx-auto">
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        <TableDB data={searchResults} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

import React from 'react';
import { SearchInput, TableDB } from '../components';

function Home() {
    return (
        <>
            <section className="container mx-auto px-16 py-8">
                <div className="flex justify-center mt-16">
                    <div className="w-full max-w-4xl">
                        <SearchInput />
                    </div>
                </div>
                <div className="mt-16">
                    <div className="w-full max-w-6xl mx-auto">
                        <TableDB data={null} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

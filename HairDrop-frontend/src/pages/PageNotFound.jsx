import React from 'react';

function PageNotFound() {
    return (
        <div className="bg-background-light dark:bg-background-dark">
            <section>
                <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                    <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                        <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold text-text-light dark:text-text-dark md:text-3xl">Page not found</h1>
                        <p className="mt-4 text-text-light dark:text-text-dark">The page you are looking for doesn't exist. This site is currently under construction.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default PageNotFound;

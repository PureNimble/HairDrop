import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageNotFound, Login, Register, Home } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Home" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

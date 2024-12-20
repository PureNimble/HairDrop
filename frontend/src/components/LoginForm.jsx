import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(email, password);
            navigate('/home');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateAccountClick = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <form
            className="w-fit h-fit flex flex-col items-center justify-center gap-4 p-8 bg-white shadow-lg rounded-lg font-sans"
            onSubmit={handleSignIn}
        >
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-lg font-bold text-gray-900">Login to your Account</p>
                <span className="text-xs text-center max-w-[80%] leading-[1.1rem] text-gray-500">
                    Log in to continue where you left off and enjoy the full experience of our app.
                </span>
            </div>

            <div className="w-full flex flex-col gap-1 relative">
                <label className="text-xs font-semibold text-gray-500" htmlFor="email_field">Email</label>
                <input
                    placeholder="name@mail.com"
                    title="Input email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-md shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gray-800"
                    id="email_field"
                    required
                />
            </div>

            <div className="w-full flex flex-col gap-1 relative">
                <label className="text-xs font-semibold text-gray-500" htmlFor="password_field">Password</label>
                <input
                    placeholder="Password"
                    title="Input Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-md shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gray-800"
                    id="password_field"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-8 right-2 text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
                title="Sign In"
                type="submit"
                className="w-full h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                disabled={isLoading}
            >
                {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="w-full flex items-center justify-center gap-4 text-gray-500">
                <hr className="flex-1 border-gray-300" />
                <span>Or</span>
                <hr className="flex-1 border-gray-300" />
            </div>

            <button
                title="Create Account"
                type="button"
                onClick={handleCreateAccountClick}
                className="w-full h-10 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-all"
            >
                Create Account
            </button>

            <p className="text-xs text-gray-500 underline hover:text-black">Terms of use & Conditions</p>
        </form>
    );
}

export default LoginForm;

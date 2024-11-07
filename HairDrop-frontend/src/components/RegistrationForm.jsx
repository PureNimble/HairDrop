import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const navigate = useNavigate();

    const handleSignInClick = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <form className="w-[600px] h-auto flex flex-col items-center justify-center gap-4 p-8 bg-white shadow-lg rounded-lg font-sans">
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-lg font-bold text-gray-900">Create Your Account</p>
                <span className="text-xs text-center max-w-[80%] leading-[1.1rem] text-gray-500">
                    Create your account to unlock all our features and begin your journey today.
                </span>
            </div>

            <div className="w-full flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500" htmlFor="first_name_field">First Name</label>
                <input
                    placeholder="First Name"
                    title="Input First Name"
                    name="firstName"
                    type="text"
                    className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-md shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gray-800"
                    id="first_name_field"
                    required
                />
            </div>

            <div className="w-full flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500" htmlFor="last_name_field">Last Name</label>
                <input
                    placeholder="Last Name"
                    title="Input Last Name"
                    name="lastName"
                    type="text"
                    className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-md shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gray-800"
                    id="last_name_field"
                    required
                />
            </div>

            <div className="w-full flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500" htmlFor="email_field">Email</label>
                <input
                    placeholder="name@mail.com"
                    title="Input Email"
                    name="email"
                    type="email"
                    className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-md shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gray-800"
                    id="email_field"
                    required
                />
            </div>

            <div className="w-full flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500" htmlFor="password_field">Password</label>
                <input
                    placeholder="Password"
                    title="Input Password"
                    name="password"
                    type="password"
                    className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-md shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gray-800"
                    id="password_field"
                    required
                />
            </div>

            <div className="w-full flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500" htmlFor="confirm_password_field">Confirm Password</label>
                <input
                    placeholder="Confirm Password"
                    title="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-md shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gray-800"
                    id="confirm_password_field"
                    required
                />
            </div>

            <button
                title="Register"
                type="submit"
                className="w-full h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
                Register
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
                By clicking Register, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>. Learn how we collect, use, and share your data in our <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> and how we use cookies and similar technologies in our <a href="#" className="text-blue-500 hover:underline">Cookie Policy</a>.
            </p>

            <p className="text-xs text-gray-500 mt-4 text-center">Already have an account? <button onClick={handleSignInClick} className="text-blue-500 hover:underline">Sign in</button></p>
        </form>
    );
}

export default RegistrationForm;

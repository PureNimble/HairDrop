import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/apiService';

function RegistrationForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const { first_name, last_name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await apiClient.post('/register', {
                email,
                first_name,
                last_name,
                password,
            });

            console.log('Registration successful:', response.data);
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Failed to register. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInClick = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-[600px] h-auto flex flex-col items-center justify-center gap-4 p-8 bg-white shadow-lg rounded-lg font-sans"
        >
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
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
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
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
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
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.password}
                    onChange={handleInputChange}
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
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type="password"
                    className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-md shadow-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-gray-800"
                    id="confirm_password_field"
                    required
                />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
                title="Register"
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
                {isLoading ? 'Registering...' : 'Register'}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
                By clicking Register, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>. Learn how we collect, use, and share your data in our <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> and how we use cookies and similar technologies in our <a href="#" className="text-blue-500 hover:underline">Cookie Policy</a>.
            </p>

            <p className="text-xs text-gray-500 mt-4 text-center">Already have an account? <button onClick={handleSignInClick} className="text-blue-500 hover:underline">Sign in</button></p>
        </form>
    );
}

export default RegistrationForm;

import {Link} from "react-router-dom";
import { baseUrl } from "../../services/Settings";
import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from "../../services/TokenService";

const SignIn = ({ handleLogin }) => {
    const [formData, setFormData] = useState({ 
        grant_type: '',
        username: 'kahe.mehrdad@gmail.com',
        password: '1234@qwerty',
        scope: '',
        client_id: '',
        client_secret: '', 
    });

    function sendRequest(){
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        const formDataEncoded = new URLSearchParams(formData).toString();
        axios.post(baseUrl + "/auth/token", formDataEncoded, { headers })
        .then((response) => {
          // Handle the response here
          console.log('Response:', response.data);
          setToken(response.data);
          handleLogin();
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error:', error);
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendRequest();
    };

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign In</h5>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input 
                    type="email" 
                    name="username" 
                    id="username" 
                    value={formData.username} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="name@company.com" 
                    required/>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange} 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required/>
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input 
                            id="remember" 
                            type="checkbox" 
                            value="" 
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                </div>
            </form>
        </div>
    );
  };
  
  export default SignIn;
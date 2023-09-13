"use client";

import React, { useState } from 'react';
import axios from 'axios';

export default function CreateQuizComponent() {

  const apiUrl = 'http://34.88.249.185:6996/auth/token';
  const [formData, setFormData] = useState({ 
    grant_type: '',
    username: '',
    password: '',
    scope: '',
    client_id: '',
    client_secret: '', 
  });

  const requestData = {
    grant_type: '',
    username: 'kahe.mehrdad@gmail.com',
    password: '1234@qwerty',
    scope: '',
    client_id: '',
    client_secret: '',
  };

  function sendRequest(){
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const formDataEncoded = new URLSearchParams(formData).toString();
    axios.post(apiUrl, formDataEncoded, { headers })
    .then((response) => {
      // Handle the response here
      console.log('Response:', response.data);
    })
    .catch((error) => {
      // Handle errors here
      console.error('Error:', error);
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                Email
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              type="text"
              id="username"
              name="username" 
              value={formData.username} 
              onChange={handleChange}
              placeholder=""/>
            </div>
            <div className="w-full md:w-2/2 px-3">
              <label 
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange} 
              placeholder=""/>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md">
              Login
            </button>
          </div>
        </form>
    </div>  
  )
}

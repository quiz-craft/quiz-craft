"use client";

import React, { useState } from 'react';
import { FormEvent } from 'react'

export default function CreateQuizComponent() {
  const [formData, setFormData] = useState({
    topic: 'History of WWII',
    numQuestions: 10,
    numChoices: 4,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data sent successfully!');
        setFormData({
          topic: '',
          numQuestions: 10,
          numChoices: 4
        });
      } else {
        console.error('Error sending data to the server.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
              <h3>Please Choose</h3>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="topic">
                Topic
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              type="text"
              id="topic"
              name="topic" 
              value={formData.numQuestions} 
              onChange={handleChange}
              placeholder=".Net Core 7.0"/>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label 
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Number of questions
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number" 
              id="numQuestions"
              name="numQuestions"
              value={formData.numQuestions}
              onChange={handleChange} 
              placeholder="10"/>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label 
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Number of Choices
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              type="number" 
              id="numChoices" 
              value={formData.numChoices}
              onChange={handleChange} 
              placeholder="4"/>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
    </div>  
  )
}

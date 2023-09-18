import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';

const CreateQuiz = () =>{
    const [formData, setFormData] = useState({ 
        topic: '',
        questionCount: '',
        answerCount: '',
        difficulty: '',
    });

    const sendRequest = () =>{
        // Send via http
    }

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/quiz/take`; 
      navigate(path);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendRequest();
        routeChange();
    };

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-3" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create Quiz</h5>
                <div>
                    <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic</label>
                    <input 
                    type="text" 
                    name="topic" 
                    id="topic" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="Difference between react and angular" 
                    required/>
                </div>
                <div>
                    <label htmlFor="questionCount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input 
                    type="number" 
                    name="questionCount" 
                    id="questionCount" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="10" 
                    required/>
                </div>
                <div>
                    <label htmlFor="asnwerCount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input 
                    type="number" 
                    name="asnwerCount" 
                    id="asnwerCount" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="10" 
                    required/>
                </div>
                <div>
                    <label for="difficulty" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
                    <select id="difficulty" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="easy" selected>Easy</option>
                        <option value="moderate">Moderate</option>
                        <option value="hard">Hard</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Quiz</button>
            </form>
        </div>
    )
}

export default CreateQuiz;
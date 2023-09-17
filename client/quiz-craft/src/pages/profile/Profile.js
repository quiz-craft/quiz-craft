import React, { useState, useEffect } from 'react';
import { getUser, setUser } from '../../services/http/HttpService';
import { isAuthenticated } from '../../services/AuthStoreService';
import { setToken } from "../../services/AuthStoreService";

const Profile = () => {
    const [formData, setFormData] = useState({ 
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        emailConfirmedAt: '', 
    });

    const setProfile = (data) => {
        console.log(data);
        // TODO: add json deserializer to convert snake case to camel case
        setFormData({
            firstName: data.first_name,
            lastName: data.last_name,
            userName: data.username,
            email: data.email,
            emailConfirmedAt: '',
        })
    }

    useEffect(() => {
        if (isAuthenticated) {
          getUser().then(({data}) => {
            console.log(data)
            setProfile(data);
          }).catch(error => {
            console.error(error);
          })
       }
      }, [isAuthenticated]);

    const sendRequest = () => {
        if(isAuthenticated){
            console.log("here");
            setUser({first_name: formData.firstName, last_name: formData.lastName }).then(({data}) =>{
                console.log(data);
            }).catch(error => {
                console.error(error);
            })
        }
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
        <div className="w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit}>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                        <input 
                        type="text" 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="John" 
                        required/>
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName} 
                        onChange={handleChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Doe" 
                        required/>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    disabled 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="john.doe@company.com" 
                    required/>
                </div> 
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
                </div> 
                <div class="mb-6">
                    <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" id="confirm_password" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required/>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default Profile;
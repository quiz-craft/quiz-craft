import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

import TextInput from '../../components/forms/TextInput';

const SignUp = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up</h5>
            <TextInput
                label="Your email"
                name="email"
                type="email"
                register={register("email", { 
                    required: "Required",
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Please enter a valid email address."
                    }
                })}
                errors={errors}
                placeholder="name@company.com"
            />
            <TextInput
                label="Your username"
                name="username"
                type="text"
                register={register("username", { 
                    required: "Required",
                    maxLength: {
                        value: 20,
                        message: "Username cannot contain more than 20 characters"
                    }
                })}
                errors={errors}
                placeholder="john.doe"
            />
            <TextInput
                label="Your password"
                name="password"
                type="password"
                register={register("password", { 
                    required: "Required"
                })}
                errors={errors}
                placeholder="••••••••"
            />
            <TextInput
                label="Repeat Password"
                name="confirmedPassword"
                type="password"
                register={register("confirmedPassword", { 
                    required: "Required",
                    validate: (val) => {
                        if (watch('password') !== val) {
                          return "Your passwords does no match";
                        }
                    }
                })}
                errors={errors}
                placeholder="••••••••"
            />
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already registered? <Link to="/signin" className="text-blue-700 hover:underline dark:text-blue-500">Go to login</Link>
            </div>
      </form>
    </div>
    );
  };
  
  export default SignUp;
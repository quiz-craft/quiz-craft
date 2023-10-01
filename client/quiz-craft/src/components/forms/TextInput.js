import React from 'react';
import { ErrorMessage } from "@hookform/error-message"

function TextInput({ label, name, type, register, errors, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        {...register}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder={placeholder}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="mt-2 text-sm text-red-600 dark:text-red-500">{message}</p>}
      />
      {/* TODO: Handle multiple errors */}
      {/* <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{type}{message}</p>
          ))
        }
      /> */}
    </div>
  );
}

export default TextInput;
"use client";

import {Toaster} from 'react-hot-toast';
 
export default function ToasterComponent() {
  return (
    <div>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
      />
    </div>
  )
}
"use client";

import ToasterComponent from '@/app/components/ToasterComponent';
import toast, {Toaster} from 'react-hot-toast';
 
export default function Page() {
  const notify = () => {
    console.log('Here is your toast.');
    toast('Here is your toast.');
  }
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={notify}>Make me a toast</button>
      <ToasterComponent/>
    </div>
  )
}
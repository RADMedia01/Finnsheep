"use client"

import Image from 'next/image';
import { useState } from 'react';
import { ImCamera } from "react-icons/im";

const ProfilePicInput = ({prev}) => {
  const [avatar, setAvatar] = useState('');

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    else {
      // Set avatar to empty string when no file is selected
      setAvatar('');
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="relative ">
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleInputChange}
          className="sr-only"
          id="avatar-input"
        />
        <label htmlFor="avatar-input" className="cursor-pointer absolute bottom-0 right-0 p-2 border-l-2 border-t-2 border-white bg-white rounded-tl-xl">
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-whit">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
</svg>

        </span>
        </label>

       
        {/* <label htmlFor="avatar-input" className="cursor-pointer"> */}
          {avatar ? (
            <Image
              src={avatar}
              alt="Avatar"
              width={200}
              height={200}
              className="w-44 aspect-square md:w-40 outline outline-2 outline-indigo-500 outline-offset-4 md:h-40 rounded-xl object-cover"
            />
          ) : prev ? 
          (
            <Image
              src={prev}
              alt="Avatar"
              width={200}
              height={200}
              className="w-44 aspect-square md:w-40 outline outline-2 outline-indigo-500 outline-offset-4 md:h-40 rounded-xl object-cover"
            />
          )
          : (
            <div className="w-44 aspect-square md:w-40 md:h-40 flex flex-col rounded-xl outline outline-2 outline-indigo-500 outline-offset-4 text-center  bg-gray-400 hover:bg-gray-500  items-center justify-center ">
             <ImCamera className="text-xl text-white"/>
              <span className="text-xs mt-1 text-white">Upload Photo</span>
            </div>
          )}
        {/* </label> */}
      </div>
    </div>
  );
};

export default ProfilePicInput;

"use client"

import Image from 'next/image';
import { useState } from 'react';
import { ImCamera } from "react-icons/im";


const ThumbnailUpload = ({prev}) => {

    const [thumbnail, setThumbnail] = useState('');

    const handleInputChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnail(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Set thumbnail to empty string when no file is selected
        setThumbnail('');
      }
    };

  return (
    <>
    <div className="flex items-center w-full h-full justify-center space-x-4">
      <div className="relative w-full h-full">
        <input
          type="file"
          name="thumbnailImg"
          accept="image/*"
          onChange={handleInputChange}
          className="sr-only"
          id="thumbnail-input"
        />
        <label htmlFor="thumbnail-input" className="cursor-pointer w-full h-full flex justify-center">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="Thumbnail"
              width="300"
              height="300"
              className=" xl:w-2/6 lg:w-2/6 aspect-[5/3] outline outline- inner-shadow outline-indigo-50 outline-offset-4  rounded-2xl object-cover"
            />
          ) : prev ? (
            <Image
              src={prev}
              alt="Thumbnail"
              width="300"
              height="300"
              className="  xl:w-2/6 lg:w-2/6 aspect-[5/3] outline outline-2 outline-indigo-500 outline-offset-4  rounded-2xl object-cover"
            />
          ) : (
            <Image
            src= "/Frame.svg" 
            alt='Thumbnail'
            width="300"
            height="300"
            className="w-2/6 inner-shadow rounded-[16px] aspect-[5/3] object-cover"
          />
          )}
        </label>
      </div>
    </div>


  
    </>
  )
}

export default ThumbnailUpload
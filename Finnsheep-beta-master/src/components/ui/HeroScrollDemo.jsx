"use client";
import React, { useRef, useEffect, useState } from "react";

// import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import { ContainerScroll } from "./scroll-animation";

export function HeroScrollDemo() {

  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);


  console.log("Mobile is " + isMobile)
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
          
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <div
          class="border border-indigo-600 p-1 w-60 mx-auto rounded-full flex items-center justify-between mb-4"
        >
          <span class="font-inter text-xs font-medium text-gray-900 ml-3"
            >Find qualified tutors near you.</span>
          <a
            href="javascript:;"
            class="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                stroke="white"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
        <h1
          class="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]"
        >
          {/* Control your Finances with our */}
          Empower your Learning with our  
          <span class="text-indigo-600"> Smart Tutor Platform </span>
        </h1>
        <p
          class="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9"
        >
          Invest intelligently and discover a better way to find best teachers from anywhere easily.
        </p>
        <a
          href="javascript:;"
          class="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bg-indigo-600 shadow-xs hover:bg-indigo-700 transition-all duration-500"
        >
          Explore Now
          <svg
            class="ml-2"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
       
      </div>
          </>
        }
      >
        <Image
          src={isMobile === false ? "https://cdn.dribbble.com/userupload/3061096/file/original-f575ec7acfadcd57c83569edd6d65fdf.png?resize=2048x1536&vertical=center" : "https://static.collectui.com/shots/3831888/wizard-large" }
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-center lg:object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

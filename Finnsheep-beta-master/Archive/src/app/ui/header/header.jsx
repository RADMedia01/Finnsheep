"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import ActiveLink from '../activeLink/activeLink';
import { FaBasketShopping, FaUser } from "react-icons/fa6";
import CartSheet from '../cart/cartSheet';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/lib/store/hooks';

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession()



  const [count, setCount] = useState(0);
  const items = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    // Ensure client-side data is used
    setCount(items.length);
  }, [items]);

  return (
    // <div className="h-screen bg-gray-50">
    <header className=" z-50  bg-white w-full   sticky top-0">
      {/* <div className="bg-gradient-to-tr from-blue-700 to-violet-600 h-8 flex items-center justify-center text-white">
        isad
      </div> */}
      <div className="md:relative z-50 border-b ">
        <div className=" py-2 md:px-12 lg:containe lg:mx-auto lg:px-12 lg:py-4">
          <div className="flex items-center md:justify-between ">
            <div className="relative z-20 ml-4 md:ml-0">
              <Link href="/" >
                <Image width="100" height="100" src="finnsheep-logo_optimzed.svg" alt="logo-finnsheep" className="h-10 md:h-11 w-auto md:w-fit" />

              </Link>
            </div>

            <div className="flex items-center justify-end border-r lg:border-r-0 order-first  lg:order-2">
              <input type="checkbox" name="hamburger" id="hamburger" className="peer" hidden />
              <label htmlFor="hamburger" className="peer-checked:hamburger block relative z-20 p-6  cursor-pointer lg:hidden">
                <div aria-hidden="true" className="m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
                <div aria-hidden="true" className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
              </label>

              <div className="peer-checked:translate-x-0 fixed inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] bg-white border-r shadow-xl transition duration-300 lg:border-r-0 lg:w-auto lg:static lg:shadow-none lg:translate-x-0">
                <div className="flex flex-col h-full justify-between lg:items-center lg:flex-row text-lg md:text-base font-medium">
                  <ul className="px-6 pt-32 text-gray-700 space-y-8 md:px-12 lg:space-y-0 lg:flex lg:space-x-12 lg:pt-0">
                    <li className='relative'>
                      <Link href="/" data-toggle="offcanvas" className={pathname === "/" ? "text-indig-500 " : ""}>
                        <label className={`relative cursor-pointer  ${pathname === "/" ? "text-blue-700 font-semibol " : "text-cyan-800 hover:text-blue-700 transition duration-500 ease-in-out"}`}>Home</label>
                        <span className={`${pathname === "/" ? "absolute right-0 top-0 h-full w-0.5 bg-blue-700" : ""}md:hidden`} />
                      </Link>
                    </li>
                    <li className='relative'>
                      <ActiveLink href="/shop" data-toggle="offcanvas" className={pathname === "/shop" ? "text-blue-700" : ""}>
                        <span className="relative group-hover:text-blue-700">Shop</span>
                        <span className={`${pathname === "/shop" ? "absolute right-0 top-0 h-full w-0.5 bg-blue-700" : ""}md:hidden`} />
                      </ActiveLink>
                    </li>
                    <li className='relative'>
                      <ActiveLink href="/about-us" data-toggle="offcanvas" className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-cyan-100 before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100">
                        <span className="relative group-hover:text-blue-700">About us</span>
                        <span className={`${pathname === "/about-us" ? "absolute right-0 top-0 h-full w-0.5 bg-blue-700" : ""} md:hidden`} />
                      </ActiveLink>
                    </li>
                    <li className='relative'>
                      <ActiveLink href="/contact" data-toggle="offcanvas" className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-cyan-100 before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100">
                        <span className="relative group-hover:text-cyan-800">Contact</span>
                        <span className={`${pathname === "/contact" ? "absolute right-0 top-0 h-full w-0.5 bg-blue-700" : ""} md:hidden`} />
                      </ActiveLink>
                    </li>
                    <li className='relative'>
                      <ActiveLink href="" data-toggle="offcanvas" className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-cyan-100 before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100">
                        <span className="relative group-hover:text-cyan-800">Blogs</span>
                        <span className={`${pathname === "/blogs" ? "absolute right-0 top-0 h-full w-0.5 bg-blue-700" : ""}md:hidden`} />
                      </ActiveLink>
                    </li>
                    <li className='relative'>
                      <ActiveLink href="" data-toggle="offcanvas" className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:origin-right before:scale-x-0 before:bg-cyan-100 before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100">
                        <span className="relative group-hover:text-cyan-800">Gallery</span>
                        <span className={`${pathname === "/gallery" ? "absolute right-0 top-0 h-full w-0.5 bg-blue-700" : ""} md:hidden`} />
                      </ActiveLink>
                    </li>
                  </ul>


                </div>
                <div className="w-ful">

                  {session?.user ?
                    <Link href={"/dashboard"}
                      className="border border-blue-700  p-2 mx-5 w-[calc(100%-2.5rem)] rounded-full flex items-center justify-between  md:hidden absolute bottom-12"
                    >
                      <span className="font-inter text-base font-medium text-gray-900 ml-3"
                      >Dashboard</span>
                      <span
                        className="w-10 h-10 rounded-full flex justify-center items-center bg-blue-700"
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
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link> :
                    <Link href={"/auth/login"}
                      className="border border-blue-700  p-2 mx-5 w-[calc(100%-2.5rem)] rounded-full flex items-center justify-between  md:hidden absolute bottom-12"
                    >
                      <span className="font-inter text-base font-medium text-gray-900 ml-3"
                      >Login</span>
                      <span
                        className="w-10 h-10 rounded-full flex justify-center items-center bg-blue-700"
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
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  }
                </div>
              </div>
            </div>

            <div className="  px-6 md:px-0  lg:border-t-0 lg:border-l lg:py-0 lg:pr-0 lg:pl-6 border-black flex items-center justify-end gap-6 absolute md:static right-0 order-3">
              <Link href="/cart" className='relative'>
                <FaBasketShopping className='size-6 text-gray-600 hover:text-blue-700  cursor-pointer' />
                <label className="absolute -top-3 -right-3 bg-blue-700 text-white  h-5 w-5 rounded-full flex items-center justify-center text-xs">
                  {count}
                </label>
              </Link>
              {/* <Link href="#" data-toggle="offcanvas" className="block px-6 py-1.5 rounded-full bg-gradient-to-tr from-blue-700 to-teal-600 text-center text-white">
                        Login
                      </Link> */}


              {session?.user ?

                <Link href={"/dashboard"}
                  className="border border-blue-100 hover:border-gray-700 text-blue-700 hover:text-gray-600 p-2 w- mx-auto rounded-full group items-center justify-between hidden md:flex"
                ><FaUser className='size-5' />

                </Link>
                :
                <Link href={"/auth/login"}
                  className="border border-blue-700 hover:bg-blue-700 p-1 w-28 mx-auto rounded-full group items-center justify-between hidden md:flex"
                >
                  <span className="font-inter text-sm font-medium text-gray-900 group-hover:text-white ml-3"
                  >Login</span>
                  <span
                    className="w-8 h-8 rounded-full flex justify-center items-center bg-blue-700 group-hover:bg-white "
                  >
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className='stroke-white group-hover:stroke-blue-700 '
                    >
                      <path
                        d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>


              }


            </div>
          </div>
        </div>
      </div>
    </header>
    // </div>
  )
}

export default Header
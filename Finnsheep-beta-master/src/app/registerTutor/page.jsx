import React from 'react'
import RegisterTutorForm from '../ui/registerTutorForm/registerTutorForm'
import Image from 'next/image'
import { Urbanist, Manrope } from 'next/font/google'
import Instructions from '../ui/registerTutorForm/instructions'

const urbanist = Urbanist({
  weight: ['400','500','600','700','800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const manrope = Manrope({
  weight: ['400','500','600','700','800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})


const RegisterTutor = () => {
  return (
    <>
      {/* <div className="h-[100px] w-full bg-red-400">gest</div> */}
    <div className="grid md:grid-cols-4 gap-6 p-4 md:p-10 items-start justify-center w-full h-full min-h-screen md:bg-gradient-to-l bg-gradient-to-b from-lime-400 via-violet-20 to-white bg-blur-sm" style={{
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,1) 11%, rgba(124,124,124,0) 100%), url('/Thumbnail.png')",
        // background: "rgb(255,255,255)",
        // background: "linear-gradient(90deg, rgba(255,255,255,1) 11%, rgba(124,124,124,0) 100%)",
        // background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
      }}>
      
      <div className="col-span-full lg:col-span-1 h-full">
         <div className="flex items-center  lg:mt-20 jusftify-">
        <Image width={300} height={300} alt='logo' src={"/logo2.svg"} className="h-16 w-auto"/>
        <Image width={300} height={300} alt='logo' src={"/logo3.svg"} className="h-8 ml-4 w-auto"/> 
           </div>
         <div className={`mt-10 text-3xl font-semibold ${urbanist.className}`}>
          Register Tutor
          <p className={`text-sm font-normal mt-4 mr-10 ${manrope.className}`}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum animi ab odio nam adipisci? Nostrum ratione vero eos ea eveniet.</p>
         
        </div>
        <div className="xl:flex lg:grid flex gap-2 mt-10 text-sm">
        <div className="w-fit pr-3 p-1 flex gap-1 border-gray-900 border rounded-full items-center bg-white/70 bg-blur-sm whitespace-nowrap"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
</svg>
Need Help?</div>
<Instructions/></div>

      </div>
      <div className="col-span-full lg:col-span-3  mt-10 lg:mt-0">
      <RegisterTutorForm/></div>
    </div>
    </>
  )
}

export default RegisterTutor
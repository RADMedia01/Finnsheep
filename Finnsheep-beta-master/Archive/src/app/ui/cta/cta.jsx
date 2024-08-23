"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Urbanist, Manrope } from 'next/font/google'
import { sendEnquiry } from "@/app/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { getCurrentTime } from "@/app/lib/utils";
import { useState } from 'react';
import Spinner from "../dashboard/spinner/spinner"
import { useFormStatus } from 'react-dom';
import Image from "next/image"

const manrope = Manrope({
  weight: ['300','400','500','600','700','800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const urbanist = Urbanist({
  weight: ['300','400','500','600','700','800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})


const Cta = () => {
  const items = [
    {
      id: "online-tutor",
      label: "Online Tutor",
    },
    {
      id: "private-tutor",
      label: "Private Tutor",
    },
    {
      id: "coaching-institute",
      label: "Coaching Institute",
    },
    
  ]

  const { toast } = useToast()
  const [contactNo, setContactNo] = useState("");
  const [name, setName] = useState("");
  const [tutorType, setTutorType] = useState("");



  return (
    <div>

<div className="w-full  flex justify-center mx-auto px- lg:py-12 md:px-8 mt-12 lg:bg-[url('/Thumbnail.png')]  bg-center bg-cover">
            <div className="grid grid-cols-12 max-w-7x lg:w-5/6 rounded-none md:rounded-2xl lg:rounded-l-2xl  bg-gray-950 overflow-hidden ">
                <div
                    className="col-span-12 w-full md:col-span-7 py-12 px-6 md:px-11  order-2 flex flex-col justify-between max-lg:max-w-l max-lg:mx-auto">
                    <h2 className= {` font-bold text-3xl sm:text-4xl leading-10 text-white `}>Get the List of Top <span className="text-indigo-500">Tutors</span>
                        </h2>
                        <p className={` ${manrope.className} font-normal tracking-wide leading-normal text-gray-300 mb-10 mt-3`} >We&apos;ll send you contact details in seconds for free?</p>

                        <div className="text-white">
                            <form action={async (formData) => {
        //client-side validation or some other things
        const result = await sendEnquiry(formData);
        if(result?.err) {
            //show error
              toast({
                variant: "destructive",
                title: <div className="flex gap-2 items-center"><IoWarningOutline className="text-2xl"/> { result.err} </div>,
                description: " Uh oh! Something went wrong.",
              })
        } else if (result.success) {
            toast({
                variant: "success2",
            title: <div className="flex gap-2 items-center"><IoIosCheckmarkCircleOutline className="text-2xl"/>{result.success}</div>,
          description: getCurrentTime(),
              });
            //   redirect("/dashboard/users");
        }
    }}>
                               <RadioGroup defaultValue="Private Tutor" name="tutorType" className="text-white flex flex-row lg:flex-row justify-between"  onValueChange={(e) => setTutorType(e)}>
                            {items.map((item) => (
                              
  <div className="flex  items-center space-x-2 mb-6 cursor-pointer" key={item.id}>
    <RadioGroupItem value={item.label} id={item.id} className="text-white border-white"></RadioGroupItem>
    <Label htmlFor={item.id}  className={`leading-normal w-min md:w-fit cursor-pointer ${manrope.className}`}>{item.label}</Label>
  </div>

))}
</RadioGroup>

<div className="grid relative items-center gap-2 mb-4">
           
          <div className="grid relative items-center gap-2">
            <Input name="name" type="text" className={ `col-span-3 text-sm bg-gray-800 placeholder:text-gray-400 text-white border-gray-600 h-12 pl-10 ${manrope.className}`} placeholder="Name" value={name}  onChange={(e) => {
                      const value = e.target.value = e.target.value
                        .replace(/[^a-zA-Z0-9\s]/g, "")
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                        setName(value);
                    }}/>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 absolute inset-x-0 left-2  p-1 text-white">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg>

</div>
</div>

<div className="grid relative items-center gap-2 mb-4">
           
          <div className="grid relative items-center gap-2">
            <Input name="contactNo" type="tel"  className={ `col-span-3 text-sm bg-gray-800 placeholder:text-gray-400 text-white border-gray-600 h-12 pl-10 ${manrope.className}`} placeholder="Mobile No."  value={contactNo} onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                            setContactNo(value);
                        }}/>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 absolute inset-x-0 left-2  p-1 text-white">
  <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
  <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
</svg>


</div>
</div>
                                
{/* <button type="submit" className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className={`inline-flex h-full w-full gap-1 cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl  ${manrope.className}`}>
          Send Enquiry
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
  <path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
</svg>

        </span>
      </button> */}

      <SendButton name={name} contactNo={contactNo} tutorType={tutorType}/>
                            </form>
                        </div>
                   
                   
                </div>
                <div className="col-span-12 md:col-span-5 md:max-w-md max-lg:mx-auto ">
                    <Image width={1000} height={1000} src="/graduation.jpg" alt="Warehouse image" className="w-full h-full  object-cover  lg:rounded-r-2x"/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Cta




function SendButton({ name, contactNo, tutorType }) {
  const { pending } = useFormStatus();

  return (
    // <Button
    //   type="submit"
    //   className="font-normal min-w-32"
    //   disabled={!name || !password || !username || pending}
    // >
    //   {pending ? <Spinner /> : "Create"}
    // </Button>

      
      <button type="submit" className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full" disabled={!name || !contactNo || !tutorType || pending}>
<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
<span className={`inline-flex h-full w-full gap-1 cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl  ${manrope.className}`}>
  {/* Send Enquiry */}
  {pending ? <Spinner /> : <>Send Enquiry
  
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
<path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
<path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
</svg>


</>
}
</span>
</button>
  );
}
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { forgetPassword } from "@/app/lib/accountRecovery"
import { useToast } from "@/components/ui/use-toast"
import { getCurrentTime } from '@/app/lib/utils';
import Spinner from "../dashboard/spinner/spinner"
import { useFormStatus } from 'react-dom';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { useState, useEffect } from "react"
import { Urbanist, Manrope } from 'next/font/google'


const manrope = Manrope({
  weight: ['400','500','600','700','800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})



const ForgetPasswordForm = () => {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false); // State to track whether email has been sent


  const handleSubmit = async () => {
    const result = await forgetPassword({ email});
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
        setEmailSent(true); 
        // redirect("/dashboard/users");
  }
  };

  return (
        
        //  <div className="grid w-1/2 max-w-sm items-center gap-1.5">
      
<div className="max-  py-4">

            <form action={handleSubmit} className="space-y-4 ">
            <div className="grid relative items-center gap-2">
            <Input type="email" name="email" placeholder="Email"  className={ `col-span-3 text-sm h-12 bg-white px-10 ${manrope.className}`} onChange={(e) => setEmail(e.target.value)}/>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 absolute inset-x-0 left-2  p-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
</svg>

</div>
      
      <SendButton email={email} onSubmit={handleSubmit}/>
      {emailSent && <div className="text-center text-sm text-green-500">Email successfully sent!</div>} {/* Display message when email is sent */}
      </form>
     </div>
    //  </div>
  )
}

export default ForgetPasswordForm


function SendButton({email, onSubmit}) {
  const { pending } = useFormStatus()
  const [disabled, setDisabled] = useState(false); // State to track button disabled state
  const [countdown, setCountdown] = useState(0); // State to track countdown timer
  const [clicked, setClicked] = useState(false);
  const [buttonText, setButtonText] = useState('Send Reset Link');

  useEffect(() => {
    let timer;
    if (!pending && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      setDisabled(false); // Enable the button after the countdown ends
    }
    if (clicked && countdown === 0) {
      setButtonText('Resend');
      setClicked(false); // Reset clicked state
    }
    return () => clearTimeout(timer);
  }, [countdown,clicked, pending]);

  const handleClick = async () => {
    setDisabled(true); // Disable the button on click
    setCountdown(30); // Start the countdown
    // await onSubmit(); // Perform form submission action here
    await onSubmit(); // Trigger form submission
  };

  return (
     <Button
     type="submit"
    className="w-full"
     disabled={ pending || !email || disabled}
     onClick={() => {
      handleClick();
      setClicked(true); // Set clicked state when the button is clicked
    }}
   >
       {pending ? (
  <Spinner/>
) : !pending && countdown > 0 ? (
  <span>Resend in {countdown} seconds</span>
) : (
  buttonText
)}
   </Button>
  )
}
"use client"
import { authenticate } from "@/app/lib/actions"
import { getCurrentTime } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react"
import { useFormState } from "react-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link"
import { Urbanist, Manrope } from 'next/font/google'
import { useFormStatus } from "react-dom";
import Spinner from "../dashboard/spinner/spinner"


import { getProviders, signIn } from 'next-auth/react';



const manrope = Manrope({
  weight: ['400','500','600','700','800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})



const LoginForm = () => {
  const { toast } = useToast();
  // const [err, setErr] = useState();
  const [state, formAction] = useFormState(authenticate, undefined);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
 setLoading(true); // Set loading to true when form is submitted

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    setLoading(false); // Set loading to false after sign-in attempt  

    if (result.error) {
      console.error('Sign-in error:', result.error);
      const errorMessage = result.error === 'CredentialsSignin' ? 'Invalid username or password' : result.error;
      setError(errorMessage); // Set error message
      // toast({
      //   title: 'Sign-in error',
      //   description: result.error,
      //   variant: 'destructive',
      //   icon: <IoWarningOutline className="text-xl" />,
      // });
    } else {
      console.log('Sign-in successful:', result);
     
      router.push('/dashboard');
      toast({
        title: 'Sign-in successful',
        description: 'Welcome back!',
        variant: 'default',
        icon: <IoIosCheckmarkCircleOutline className="text-xl" />,
      });
    }
  };
  return (
    <div>
         <form onSubmit={handleSubmit} className=" space-y-6 ">
          <div className="grid relative items-center gap-2">
            {/* <Label htmlFor="username" className={`text-left text-base leading-6 ${manrope.className}`}>
              Username
            </Label> */}
          <div className="grid relative items-center gap-2">
            <Input name="username" type="text" className={ `col-span-3 text-sm bg-white h-12 pl-10 ${manrope.className}`} placeholder="Username" onChange={(e) => { setUsername(e.target.value)}}/>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 absolute inset-x-0 left-2  p-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
</div>


          </div>
          <div className="grid relative items-center gap-2">
            {/* <Label htmlFor="password" className={`text-left text-base leading-6 ${manrope.className}`}>
              Password
            </Label> */}
            <div className="grid relative items-center  col-span-3">
            <Input name="password"  type={showPassword ? "text" : "password"} className={ `col-span-3 text-sm h-12 bg-white px-10 ${manrope.className}`} placeholder="Password" onChange={(e) => { setPassword(e.target.value)}}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 absolute inset-x-0 left-2  p-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
            <button
                    className="absolute inset-y-0 right-2 p-1 focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleShowPassword();
                    }}
                    type="button"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-500 text-base" />
                    ) : (
                      <AiOutlineEye className="text-gray-500 text-base" />
                    )}
                  </button>
                 

          </div>

          <div className="h-4 col-span-3 text-center text-sm text-red-500">
          {/* {state && state} */}
          {error && <p>{error}</p>} {/* Display error message */}
          </div>
          </div>
          <div className="">
            {/* <Button type="submit" className={`w-full text-base ${manrope.className}`}>Sign In</Button> */}
            <SendButton username={username} password={password} loading={loading}/>
          </div>
          <div className="flex flex-row justify-end mb-8"><Link className={`font-medium text-sm  leading-6 text-gray-800 hover:text-blue-700 pl-1 ${manrope.className}`} href="/auth/account-recovery">Forgot password?</Link></div>
          </form>
    </div>
  )
}

export default LoginForm



function SendButton({ username, password, loading }) {
  const { pending } = useFormStatus();

  return (
    // <Button
    //   type="submit"
    //   className="font-normal min-w-32"
    //   disabled={!name || !password || !username || pending}
    // >
    //   {pending ? <Spinner /> : "Create"}
    // </Button>

    <Button type="submit" className={`w-full text-base ${manrope.className} bg-gray-700`}>
      {/* Sign In */}
      {loading ? <Spinner /> : "Sign In"}
      </Button>
  
  );
}
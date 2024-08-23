import ForgetPasswordForm from '@/app/ui/forgetPasswordForm/forgetPasswordForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { MdArrowBack } from "react-icons/md";
import { Urbanist, Manrope } from 'next/font/google'
import Image from "next/image"





const manrope = Manrope({
  weight: ['400','500','600','700','800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const urbanist = ({
  weight: ['400','500','600','700','800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})


const ForgetPassword = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 h-screen bg-cover bg-center p-4 md:p-20 " style={{backgroundImage: "url('/Thumbnail.png')"}}>
      <div className=" col-span-2  items-center ml-20 hidden xl:grid">
      <div className=" flex gap-4 items-center  bg-gray-800/20 border-gray-800 backdrop-blur-sm w-fit rounded-xl">
            <Image width={300} height={300} alt="FinnSheep Logo" src="/finnsheep_white-Logo.svg" className="h-24 w-fit   p-6 "></Image>
            {/* <Image width={300} height={300} src="/logo4.svg" className="h-8 w-fit"></Image> */}
          </div>
          <p className="absolute bottom-10 text-white"> Powered by RAD Media. Copyright © 2024 </p>
      </div>


      <div className="relative flex min-h-full flex-col bg-white md:rounded-2xl justify-center px-6 py-12 lg:px-8 shadow">
         
          {/* <div className="lg:py-4  sm:mx-auto sm:w-full sm:max-w-sm"> */}
               {/* <Card className=" w-full">
                  <CardHeader> */}
 <div className="flex xl:hidden gap- items-center justify-cente ">
       <Image width={300} height={300} alt="FinnSheep Logo" src="/finnsheep-logo_optimzed.svg" className="h-12 w-auto "></Image>
        {/* <Image width={300} height={300} src="/logo3.svg" className="h-8 w-auto"></Image> */}
      </div>
                    <h1 className={`sm:mx-auto sm:w-full sm:max-w-sm mt-10 mb-2 text- text-2xl font-medium leading-9 tracking-tight text-gray-900  ${manrope.className}`}>Forgot your password?</h1>
                    <p className={` mb-2 text- font-  tracking-tigh text-gray-500  ${manrope.className}`}>Enter your email below to receive a password reset link.</p>
                  {/* </CardHeader> */}
                  {/* <CardContent> */}
                    {/* <p>Card Content</p> */}
                        <ForgetPasswordForm/>
                  {/* </CardContent> */}
                  {/* <CardFooter> */}
                  <Link href="/login" className="flex gap-2 items-center mt-4">
                    <span><MdArrowBack/></span>
                    <p>Back to login</p>          
                    </Link>
                  {/* </CardFooter>
                </Card> */}
          {/* </div> */}
        </div>
        </div>

  )
}

export default ForgetPassword
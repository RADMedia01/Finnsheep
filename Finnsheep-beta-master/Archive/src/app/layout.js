import { Inter } from "next/font/google";
import "./ui/globals.css";
import { Toaster } from "@/components/ui/toaster"
import Header from "./ui/header/header";
import Footer from "./ui/footer/footer";
import Layout from "./ui/layout/layout";
// import { Instructions } from "@/app/ui/registerTutorForm/instructions"
// import Instructions from './ui/registerTutorForm/instructions';
import Head from 'next/head';
import SessionWrapper from "@/components/SessionWrapper";

import RazorpayButton from "@/components/razorpay/razorpay";
import { Button } from "react-day-picker";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinnSheep",
  description: "FinnSheep",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
       <link rel="icon" href="/favicon.ico" sizes="any" />
       {/* <script src="https://checkout.razorpay.com/v1/checkout.js">
       </script> */}
      </head>
      
      <body className={inter.classNam}>
      
      <Layout>
      {/* <SessionWrapper> */}
      <RazorpayButton>
        
        </RazorpayButton>
        {children}
      {/* </SessionWrapper> */}
        </Layout>
      {/* <script src="/menu.js" /> */}
      <Toaster />
        </body>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </html>
    
  );
}

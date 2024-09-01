"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CartProducts from '../ui/cart/cartProducts'
import CartCount from '../ui/cart/cartCount'
import { useAppSelector } from '@/lib/store/hooks'
import Link from 'next/link'
import OrderSummary from '../ui/cart/orderSummary'

const CartPage = () => {
    const [products, setProducts] = useState();
    const cartItems = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        // Ensure client-side data is used
        setProducts(cartItems);
      }, [cartItems]);
      useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          console.log('Razorpay script loaded successfully.');
        };
        script.onerror = () => {
          console.error('Failed to load Razorpay script.');
        };
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
      const handlePayment = async () => {
        try {
          // Fetch order details from your server
        //   const response = await fetch('/api/create-order', { method: 'POST' });
        //   const data = await response.json();
            
            debugger
            const options = {
              key: 'rzp_test_UGSYTrORpbHQTS', // Enter the Key ID generated from the Dashboard
              amount: 10000, // Amount is in currency subunits
              currency: 'INR',
              name: 'Your Business Name',
              description: 'Test Transaction',
              image: 'https://example.com/your_logo',
              order_id: 'order_OrENmORSOYZqxT', // Pass the `id` obtained from the server
              callback_url: '/api/payment-callback', // Your server-side callback URL
              prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '+919830822490',
              },
              notes: {
                address: 'Razorpay Corporate Office',
              },
              theme: {
                color: '#3399cc',
              },
              handler: function (response) {
                debugger
                // Handle successful payment here
                console.log('Payment ID:', response.razorpay_payment_id);
                console.log('Order ID:', response.razorpay_order_id);
                console.log('Signature:', response.razorpay_signature);
    
                // Optionally send payment details to your server for verification
              },
              modal: {
                ondismiss: function () {
                  console.log('Payment modal closed');
                  debugger
                },
              },
            };
    
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        
        } catch (error) {
            debugger
          console.error('Error handling payment:', error);
        }
      };


  return (
    <div className='containe'>
     <button onClick={handlePayment}>Pay with Razorpay</button>

     {products && products.length > 0 ? 
<div
        className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 ">
        <div className="w-full max-w-8xl px-4 md:px-5 lg-6 mx-auto relative z-10">
            <div className="grid grid-cols-12 xl:flex lg:mx-8  h-screen">
                <div
                    className="col-span-12 xl:col-span-8 lg:pr-8 pt-4 pb-4 md:py-14 w-full max-xl:max-w-3xl max-xl:mx-auto">
                    <div className="flex items-center justify-between pb-4 md:pb-8 border-b border-gray-300">
                        <h2 className="font-manrope font-medium text-2xl md:text-3xl leading-10 text-black">My Cart</h2>
                        <CartCount/>
                    </div>
                    <div className="grid grid-cols-4 mt-8 max-md:hidden pb-6 border-b border-gray-200 ">
                        <div className="col-span-3 md:col-span-3">
                            <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                        </div>
                        <div className="col-span-1 md:col-span-1 flex gap-6 justify-between">
                           
                                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                       
                                {/* <div className="col-span-1">
                                    <p className="font-normal text-lg leading-8 text-gray-400 text-center"></p>
                                </div> */}
                              
                              <div className="col-span-1">
                                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                </div>
                         
                        </div>
                    </div>
              <CartProducts/>

               
                   


                 
                </div>
                <OrderSummary/>
                
            </div>
        </div>
    </div>  
:
    <div className="w-full flex flex-col gap-4 justify-center items-center p-16 md:p-20">
          <Image src="/cart_empty.svg" width={500} height={500} alt="Cart is empty" className="h-52 md:h-60" />
          <h3 className="capitalize text-3xl text-gray-700 font-semibold text-center">Your Cart is empty!</h3>
          <p className="capitalize text-lg text-gray-700 font-normal text-center">When you add products, they'll appear here.</p>
          <Link href="/shop" className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-full">Go Shop</Link>
        </div>
      }
 



                                            
                                            
    </div>
  )
}

export default CartPage
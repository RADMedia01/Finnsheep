import { useAppSelector } from '@/lib/store/hooks';
import { useSelector } from 'react-redux';
import React, { useMemo, useEffect, useState } from 'react';

const OrderSummary = () => {

    
    const cartItems = useAppSelector((state) => state.cart.items);
    // const cartItems = useSelector((state) => state.cart.items);
    // State to handle client-side calculations
    const [clientState, setClientState] = useState({
        itemCount: 0,
        subtotal: 0,
        deliveryCharges: 0,
        total: 0,
    });

    useEffect(() => {
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const subtotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        const deliveryCharges = subtotal > 150 ? 0 : 8;
        const total = subtotal + deliveryCharges;

        setClientState({ itemCount, subtotal, deliveryCharges, total });
    }, [cartItems]);

    const { itemCount, subtotal, deliveryCharges, total } = clientState;

  return (
    <div className="col-span-12 xl:col-span-4 bg-gradient-to-tr from-blue-50 to-blue-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:px-8 py-14 sticky top-0">
    <h2 className="font-manrope font-medium text-3xl leading-10 text-black pb-8 border-b border-gray-300">
        Order Summary
    </h2>
    <div className="mt-8">
        <div className="flex items-center justify-between pb-6">
            <p className="font-normal text-lg leading-8 text-black">{itemCount} Items</p>
            <p className="font-medium text-lg leading-8 text-black">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between pb-6">
            <p className="font-normal text-lg leading-8 text-black">Delivery Charges</p>
            <p className={`font-medium text-lg leading-8 ${deliveryCharges === 0 ? 'text-green-600' : 'text-black'}`}>
                {deliveryCharges > 0 ? `$${deliveryCharges.toFixed(2)}` : <><span className="line-through text-black">$8.00</span> FREE</>}
            </p>
        </div>
        <form>
            <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Promo Code</label>
            <div className="flex pb-4 w-full">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400"
                        placeholder="xxxx xxxx xxxx"
                    />
                    <button
                        id="dropdown-button"
                        className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent absolute right-0 top-0 pl-2"
                        type="button"
                    >
                        <svg className="ml-2 my-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                                stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex items-center border-b border-gray-200">
                <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                    Apply
                </button>
            </div>
            <div className="flex items-center justify-between py-8">
                <p className="font-medium text-xl leading-8 text-black">Total</p>
                <p className="font-semibold text-xl leading-8 text-blue-600">${total.toFixed(2)}</p>
            </div>
            <button className="w-full text-center bg-blue-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-blue-700">
                Checkout
            </button>
        </form>
    </div>
</div>
  )
}

export default OrderSummary
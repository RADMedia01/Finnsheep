"use client"
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { remove, updateQuantity } from '@/lib/store/features/cart/cartSlice';
import { CiCircleRemove } from "react-icons/ci";

const CartProducts = () => {
  const [products, setProducts] = useState([]);
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    // Update products state on the client
    setProducts(cartItems);
  }, [cartItems]);

  return (
    <div className="">
      {products.map((product) => (
        <CartProduct product={product} />
      ))}
    </div>
  )
}

export default CartProducts

const CartProduct = ({ product }) => {

  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ productId: product._id, quantity: newQuantity })); // Correct structure
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ productId: product._id, quantity: newQuantity })); // Correct structure
  };

  const handleRemoveFromCart = (product) => {
    dispatch(remove(product));
  };

  return (
    <div
      className="flex flex-row items-center gap-4 md:gap-5 py-6 border-b border-gray-200 group min-[500px]:flex-row"
      key={product._id}
    >
      <div className="w-fit md:max-w-[126px] flex items-center">
        <Image
          width={600}
          height={600}
          src={product.category.picture || "/Frame.svg"}
          alt={product.name}
          className="mx-auto rounded-xl aspect-square h-auto w-40 object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-6">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-1 md:gap-3 max-[500px]:items-start">
            <div className="flex items-center justify-between w-full">
              <h6 className="font-medium text-lg leading-7 text-black md:text-lg">
                {product.name}
              </h6>
              <Button
                className="border border-red-400 hover:border-red-500 rounded-full bg-transparent hover:bg-red-50 text-red-400 hover:text-red-500 flex gap-1 h-min w-fit py-1 px-1 pr-2 text-xs md:hidden"
                onClick={() => handleRemoveFromCart(product)}
              >
                <CiCircleRemove className="size-5 " />
                Remove
              </Button>
            </div>
            <div className="flex items-center justify-between w-full">
              <h6 className="font-normal text-base leading-7 text-gray-500">
                {product.weight} lb
              </h6>
              <Button
                className="border border-red-400 hover:border-red-500 rounded-full bg-transparent hover:bg-red-50 text-red-400 hover:text-red-500  gap-1 h-min w-fit py-1 px-1 pr-2 text-xs hidden md:flex"
                onClick={() => handleRemoveFromCart(product)}
              >
                <CiCircleRemove className="size-5 stroke-1" />
                Remove
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <h6 className="font-bold text-lg leading-7 text-gray-600 transition-all duration-300 md:group-hover:text-green-600 hidden md:block">
                ${product.price}
              </h6>
            </div>
          </div>
        </div>
        <div className=" md:col-span-2 flex items-center justify-between w-full gap-6">
          <div className="flex items-center justify-end w-full max-[500px]:justify-end h-full order-last md:order-none max-md:mt-">
            <div className="flex items-center justify-end w-full h-full">
              <button
                className="group rounded-l-full px-2 md:px-3 py-[6px] md:py-[15px] border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus:outline-gray-300"
                onClick={handleDecrement}
              >
                <svg
                  className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.5 11H5.5"
                    stroke-opacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                className="border-y border-gray-200 text-gray-900 font-semibold text-base md:text-lg w-full max-w-[73px] min-w-[60px] text-center bg-transparent py-[5px] md:py-[12px]"
              >
                {quantity}
              </div>
              <button
                className="group rounded-r-full px-2 md:px-3 py-[6px] md:py-[15px] border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus:outline-gray-300"
                onClick={handleIncrement}
              >
                <svg
                  className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke-opacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end h-full max-[500px]:justify-end  md:min-w-ful max-md:mt-">
            <p className="font-bold text-lg leading-8 text-gray-600 transition-all duration-300 group-hover:text-green-600">
              ${product.price * quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
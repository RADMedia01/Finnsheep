"use client"

import { Button } from "@/components/ui/button";
import { add } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

const Quantity = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  //   const [isLiked, setIsLiked] = useState(false);


  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };



  const dispatch = useAppDispatch()

  const handlehandleAddToCart = (product) => {
    console.log('Adding to cart', product)
    dispatch(add({ ...product, quantity }))
  }

  return (
    <>
      <div className="flex justify-between items-center border border-gray-400 rounded-lg w-24 px-1 py-0.5 h-7 mt-6">
        <button className="cursor-pointer text-gray-800" onClick={handleDecrement}>
          <HiOutlineMinus />
        </button>
        <div className="text-base w-full flex justify-center mx-1 border-l border-r border-gray-400 font-medium">
          {quantity}
        </div>
        <button className="cursor-pointer text-gray-800" onClick={handleIncrement}>
          <HiOutlinePlus />
        </button>
      </div>

      <Button className="border border-blue-900 rounded-xl bg-transparent hover:bg-blue-800 hover:text-white text-blue-900 text-base w-full mt-10" onClick={() => handlehandleAddToCart(product, quantity)}>
        Add to cart
      </Button>
    </>
  )
}

export default Quantity
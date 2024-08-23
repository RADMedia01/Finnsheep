"use client"
import { loadStateFromLocalStorage } from '@/app/lib/storageUtils';
import { useAppSelector } from '@/lib/store/hooks';
import React, { useEffect, useState } from 'react'

const CartCount = () => {
  const [count, setCount] = useState(0);
    const products = useAppSelector((state) => state.cart.items);

    useEffect(() => {
      // Ensure client-side data is used
      setCount(products.length);
    }, [products]);
 
  return (
    <h2 className="font-manrope font-medium text-xl leading-8 text-gray-600">{count} Items</h2>
  )
}

export default CartCount
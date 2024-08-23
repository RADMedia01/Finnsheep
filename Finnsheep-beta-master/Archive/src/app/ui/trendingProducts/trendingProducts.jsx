"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { MdOutlineArrowForwardIos,MdOutlineArrowBackIosNew } from "react-icons/md";
import { HiOutlinePlus,HiOutlineMinus } from "react-icons/hi";
import { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import SwiperCore, { Navigation } from 'swiper/core';
// SwiperCore.use([Navigation]);
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from 'swiper/modules';
import { ProductCard } from "../allProducts/allProducts";
import Link from "next/link";
import Spinner from "../dashboard/spinner/spinner";


const TrendingProducts = () => {

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch products from API based on filters
      const res = await fetch(`/api/products?q=${query}&page=${page}&category=${category}`);
      const data = await res.json();
      setProducts(data.products);
      setCount(data.count);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query, page, category]);

  console.log(products)
    
  return (
    <>
    {!loading ?
    <div className="">
    <div className="flex justify-between bg-blue-100 px-4 md:px-8 py-3 md:py-3 rounded-xl mb-10">
        <div className=" text-lg md:text-xl flex gap-4 items-center">
          <Image src={"/meat.svg"} width={300} height={300} className="h-10 w-fit"/>

        Trending Products
        </div>
        <div className="flex gap-2">
            <button className="button-prev" id="slider-button-left" data-carousel-prev>
            <MdOutlineArrowBackIosNew className="size-5 text-black"/>
            </button>
            <button className="button-next" id="slider-button-right">
            <MdOutlineArrowForwardIos className="size-5" data-carousel-next/>
            </button>
        </div>
    </div>


      
    <Swiper modules={[Navigation,Autoplay]} 
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
      navigation={{
        nextEl: '.button-next',
        prevEl: '.button-prev',
      }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
                // centeredSlides: false,
              },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 40,
              },
                1700: {
                  slidesPerView: 5,
                  spaceBetween: 40,
              },
            }}
        >
            {products.map((product) => (
                <SwiperSlide key={product._id}>
                    <ProductCard product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
        <div className=" w-full flex justify-center">
        <Link href="/shop" className="bg-gray-800 text-white rounded-xl px-6 py-2 mx-auto text-sm mt-8">
            View All Products
        </Link>
        </div>
    </div> 
  :
<div className="flex justify-center"><Spinner/></div>}
</>
  )
}

export default TrendingProducts
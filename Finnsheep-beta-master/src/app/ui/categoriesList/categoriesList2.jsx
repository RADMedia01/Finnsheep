"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductCard } from '../allProducts/allProducts'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import SwiperCore, { Navigation } from 'swiper/core';
// SwiperCore.use([Navigation]);
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from 'swiper/modules';

const CategoriesList2 = () => {
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


    const items = [
        {
          image: '/wool.png',
          title: 'Wool1'
        },
        {
          image: '/Thumbnail.png',
          title: 'Another'
        },
        {
            image: '/wool.png',
            title: 'Wool'
          },
          {
            image: '/Thumbnail.png',
            title: 'Another'
          },
          {
            image: '/wool.png',
            title: 'Wool'
          },
          {
            image: '/Thumbnail.png',
            title: 'Another'
          },
          {
            image: '/Thumbnail.png',
            title: 'Another'
          },
          {
              image: '/wool.png',
              title: 'Wool'
            },
            {
              image: '/Thumbnail.png',
              title: 'Another'
            },
            {
              image: '/wool.png',
              title: 'Wool'
            },
            {
              image: '/Thumbnail.png',
              title: 'Another'
            },
            {
              image: '/Thumbnail.png',
              title: 'Another'
            },
            {
                image: '/wool.png',
                title: 'Wool'
              },
              {
                image: '/Thumbnail.png',
                title: 'Another'
              },
              {
                image: '/wool.png',
                title: 'Wool'
              },
              {
                image: '/Thumbnail.png',
                title: 'Another'
              },
        // Add more items as needed
      ];

      // const plugin = React.useRef(
      //   Autoplay({ delay: 2000, stopOnInteraction: true })
      // )

  return (
   

<Swiper className="mySwiper"  modules={[Navigation,Autoplay]} 
      slidesPerView={2}
      spaceBetween={28}
      centeredSlides={false}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      }}>
{/* {products.map((product, index) => (
   <SwiperSlide key={index} virtualIndex={index} >
     <ProductCard product={product}/>
      </SwiperSlide>
    ))} */}


</Swiper>
  )
}

export default CategoriesList2
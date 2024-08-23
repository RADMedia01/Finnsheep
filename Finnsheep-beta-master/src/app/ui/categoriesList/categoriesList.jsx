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
import Autoplay from "embla-carousel-autoplay"

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

    // const items = [
    //     {
    //       image: '/wool1.jpg',
    //       title: 'Wool'
    //     },
    //     {
    //       image: '/meat.jpg',
    //       title: 'Lamb'
    //     },
    //     {
    //         image: '/fleece.jpg',
    //         title: 'Fleece'
    //       },
    //       {
    //         image: 'https://images.pexels.com/photos/2070676/pexels-photo-2070676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //         title: 'Yarn'
    //       },
    //       {
    //         image: 'https://img.freepik.com/free-photo/delicious-honey-dark-surface_1150-42249.jpg?t=st=1722769736~exp=1722773336~hmac=259a08cc2e0012e042d8d0a06ec1de0a506d27c27c4c7dd50e444ce1d527689f&w=1800',
    //         title: 'Honey'
    //       },
    //       {
    //         image: '/socks.jpg',
    //         title: 'Socks'
    //       },
          
    //       {
    //         image: 'https://img.freepik.com/free-photo/flat-lay-chocolate-assortment-arrangement_23-2148549913.jpg?t=st=1722770926~exp=1722774526~hmac=25432c8a652d1ff19b9c2dcd2201ce1545d8f7926875e618a982121234605584&w=740',
    //         title: 'Chocolate'
    //       },
          
    //     // Add more items as needed
    //   ];

      // const plugin = React.useRef(
      //   Autoplay({ delay: 2000, stopOnInteraction: true })
      // )

  return (
    // <div className='bg-gradient-to-b from-transparent to-blue-100 p-5 pb-2 w-fit  rounded-3xl text-center shado'>
    //     <Image width={150} height={150} src={"/wool.png"} className='rounded-full h-24 w-24 aspect-square'/>
    //     <p className='mt-2'>Wool</p>
    // </div>
    // <div className="flex flex-wrap justify-cente gap-7">
    <Carousel
      opts={{
        align: "start",
        loop:false
      }}
      canScrollNext={true}
      // plugins={[plugin.current]}
      // plugins={
      //   Autoplay({
      //     delay: 2000,
      //   })
      // }
      className="w-full max-w-ful flex gap-7"
    >
      <CarouselContent className=" flex gap-4 md:gap-8 ">
    {categories.map((category, index) => (
      <div key={index} className="bg-gradient-to-b from-transparent to-blue-100 p-5 pb-3 min-w-28 md:min-w-40 rounded-3xl text-center shadow">
        <Image
          width={150}
          height={150}
          src={category.thumbnail || "Frame.svg"}
          className="rounded-full h-fit w-20 md:w-28 aspect-square mx-auto object-cover object-center"
          alt={category.name}
        />
        <p className="mt-2 ">{category.name}</p>
      </div>
    ))}
    {/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
    </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
//   </div>
  )
}

export default CategoriesList
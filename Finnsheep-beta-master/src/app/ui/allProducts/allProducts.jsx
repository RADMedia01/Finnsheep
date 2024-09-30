"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import PaginationComponent from '../dashboard/pagination/pagination';
import { IoIosSearch } from "react-icons/io";
import { State } from 'country-state-city'; // Import State from country-state-city

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import Link from 'next/link';


import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"


import { SliderTrack, SliderFilledTrack, SliderThumb, SliderLabel } from '@/components/ui/slider';
import { Slider } from "@/components/ui/slider"
import Loading from '@/app/shop/loading';
import { Card, CardTitle } from '@/components/ui/card';
import { IoFilterSharp, IoHeartSharp } from 'react-icons/io5';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MdFilterList, MdScale } from 'react-icons/md';
import { useAppDispatch } from '@/lib/store/hooks';
import { add } from '@/lib/store/features/cart/cartSlice';
import axiosInstance from '@/utils/axiosInstance';

// Helper function to get the state name
const getStateName = (countryCode, stateCode) => {
  const state = State.getStateByCodeAndCountry(stateCode, countryCode);
  return state ? state.name : stateCode;
};

const AllProducts = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [state, setState] = useState('');
  const [states, setStates] = useState([]);

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [loading, setLoading] = useState(true);
  const countryCode = 'IN';

  const [layout, setLayout] = useState(true);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  console.log("category is" + category)
  useEffect(() => {
    // Fetch states of India only
    const indiaStates = State.getStatesOfCountry('IN');
    setStates(indiaStates);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch products from API based on filters
      const response = await axiosInstance.get(`/api/product?page=${page}&search=${query}&category=${category}`);
      console.log(response.data);
      setProducts(response.data.data);
      setCount(response.data.totalCount);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query, page, category,]);

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

  const handleproductTypeChange = (category) => {
    setCategory(category);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.query.value);
  };

  const handleRadioChange = (value) => {
    setCategory(value);
  };
  // const categories = [
  //   {
  //     name:"All",
  //     value:""
  //   },
  //   {
  //     name:"Lamb",
  //     value:"Lamb"
  //   },
  //   {
  //     name:"Yarn",
  //     value:"Yarn"
  //   },
  //   {
  //     name:"Fleece",
  //     value:"Fleece"
  //   },
  //   {
  //     name:"Wool",
  //     value:"Wool"
  //   },
  //   {
  //     name:"Honey",
  //     value:"Honey"
  //   },
  //   {
  //     name:"Socks",
  //     value:"Honey"
  //   },{
  //     name:"Chocolate",
  //     value:"Honey"
  //   },
  //   ];

  return (
    <div className="flex-row lg:flex xl:h-[80vh]  justify-center containe px-0">
      {/* ----- Sidebar Start ----- */}
      <div className=":w-1/3 lg:w-1/6 xl:h-full p-4  bg-blue-50  lg:border border-blue-300 lg:rounded-2xl  lg:m-4 lg:mr-0 xl:mr-4 mr-0 hidde lg:block  md:sticky top-4 shadow-sm shadow-gray-300 lg:shadow-none flex justify-between gap-4 ">
        <form onSubmit={handleSearch} className="lg:mt-4 mb-1 lg:mb-6 w-full">
          <div className="relative w-full ">
            <Button type="submit" variant="ghost" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoIosSearch className="text-lg" />
            </Button>
            <Input
              id="search"
              name="query"
              className="block w-full pl-10 py-2 pr-3 h-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              placeholder="Search..."
            />
          </div>
          <Button type="submit" className="mt-2 w-full bg-gray-600 hidden lg:block py-0 h-8">Search</Button>
        </form>
        <div className=" lg:hidden">
          <Popover>
            <PopoverTrigger className=' flex items-center  p-2 border rounded-lg shadow bg-white'><MdFilterList className='size-6' />
            </PopoverTrigger>
            <PopoverContent className="w-80 p-8">
              <h2 className="text-xl font-medium mb-4  ">Filter by category</h2>
              <RadioGroup value={category} onValueChange={handleRadioChange} className="">
                <div className="grid grid-cols- gap-4 items-start">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value=""
                      id="category-all"
                    />
                    <Label htmlFor="category-all" className="text-sm font-medium">
                      All
                    </Label>
                  </div>
                  {categories.map((cat, index) => (
                    <div className="flex items-center space-x-2 " key={index}>
                      <RadioGroupItem value={cat._id.toString()} id={`category-${index}`} />
                      <Label htmlFor={`category-${index}`} className="text-sm font-normal cursor-pointer">{cat.name}</Label>
                    </div>))}
                </div>
              </RadioGroup>
            </PopoverContent>
          </Popover>
        </div>
        {/* <h2 className="text-xl font-bold mb-4  hidden lg:block">Filter by State</h2> */}
        <h2 className="text-xl font-medium mb-4 mt-6 hidden lg:block">Filter by category</h2>
        {/* <div className="grid grid-cols-2  gap-2 ">
          <Button onClick={() => handleproductTypeChange('')} className={` ${category === '' ? "bg-gradient-to-tr from-indigo-600 to-violet-600" : "bg-slate-700"} text-xs font-normal`}>All</Button>
          <Button onClick={() => handleproductTypeChange('Meat')} className={` ${category === 'Meat' ? "bg-gradient-to-tr from-indigo-600 to-violet-600" : "bg-slate-700"} text-xs font-normal`}>Meat</Button>
          <Button onClick={() => handleproductTypeChange('Private product')} className={` ${category === 'Private product' ? "bg-gradient-to-tr from-indigo-600 to-violet-600" : "bg-slate-700"} text-xs font-normal`}>Private product</Button>
          <Button onClick={() => handleproductTypeChange('Coaching Institute')} className={` ${category === 'Coaching Institute' ? "bg-gradient-to-tr from-indigo-600 to-violet-600" : "bg-slate-700"} text-xs font-normal`}>Coaching Institute</Button>
        </div> */}
        <RadioGroup value={category} onValueChange={handleRadioChange} className="hidden lg:block">
          <div className="grid grid-cols- gap-2 h-80 custom-scrollbar overflow-y-auto items-start">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value=""
                id="category-all"
              />
              <Label htmlFor="category-all" className="text-sm font-medium">
                All
              </Label>
            </div>
            {categories.map((cat, index) => (
              <div className="flex items-center space-x-2 " key={index}>
                <RadioGroupItem value={cat._id.toString()} id={`category-${index}`} />
                <Label htmlFor={`category-${index}`} className="text-sm font-normal cursor-pointer">{cat.name}</Label>
              </div>))}
          </div>
        </RadioGroup>
        <div className=" items-center mt-6 w-full justify-between hidden lg:flex">
          Layout
          {layout === false ?
            <Button className="p-2 " variant="outline" type="button" onClick={() => { setLayout(!layout) }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-600 size-6 " viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>
            </Button> :
            <Button className="p-2 " variant="outline" type="button" onClick={() => { setLayout(!layout) }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-600 size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 11V5H5V11H19ZM19 13H5V19H19V13ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z"></path></svg>
            </Button>
          }
        </div>
      </div>
      {/* ----- Sidebar End ----- */}
      <div className="w-full min-h-scree h-full lg:h-[80vh] xl:w-4/5 p-4 xl:pt-0 xl:mt-4  flex flex-col lg:overflow-x-auto ">
        {products.length >= 0 ?
          <div className="">
            {layout === true ?
              <div >
                {loading ? <Loading /> :
                  <div className="grid   h- md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 overflow-y-auto ">
                    {products.map((product) => (
                      // <Link href={`/products/${product._id}`} >
                      <ProductCard product={product} key={product.id} />
                      // </Link>
                    ))}</div>
                }
                {layout === false && products && products.length > 0 ? (<div className="mt-4 ">
                  <PaginationComponent count={count} perPage={8} />
                </div>) : (<div></div>)
                }

              </div>
              :
              <div className="">
                {loading ? <Loading /> :

                  <div className="grid   h-full gap-4 overflow-scrol ">

                    {products.map((product) => (
                      // <Link href={`/products/${product._id}`} >
                      <HorizontalProductCard product={product} key={product.id} />
                      // </Link>
                    ))}
                  </div>}
                {layout === false && products && products.length > 0 ? (<div className="mt-4 ">
                  <PaginationComponent count={count} perPage={8} />
                </div>) : (<div></div>)
                }

              </div>}
          </div>
          :
          <div className="mx-2 py-20 w-full h-full content-center grid justify-items-center">
            <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                <g fillRule="nonzero" stroke="#d9d9d9">
                  <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                  <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path>
                </g>
              </g>
            </svg>
            <div className="text-sm text-[#00000040] ">No Data Found</div>
          </div>
        }
        {layout === true && products && products.length > 0 ? (<div className="mt-4 ">
          <PaginationComponent count={count} perPage={8} />
        </div>) : (<div></div>)}
      </div>
    </div>
  );
};

export default AllProducts;

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const toggleLike = () => {
    setIsLiked(prevState => !prevState);
  };

  const dispatch = useAppDispatch()

  const handlehandleAddToCart = (product) => {
    console.log('Adding to cart', product)
    dispatch(add({ ...product, quantity }))
  }

  return (
    <Link key={product._id} className='' href={`/shop/${product._id}`}>
      <Card
        className=" overflow-hidden h-fit p-2 rounded-[24px] transition duration-300 ease-in-out hover:scale-[102%] bg-gradient-to-b from-transparent to-blue-100 cursor-pointer"
      >
        {/* <div key={product._id} className="bg-gradient-to-tr from-indigo-100 to-violet-100 p-4 flex gap-2 items-center relative"> */}
        {/* <span className={`w-fit text-nowrap shadow-sm shadow-gray-300 font-normal absolute text-xs px-4 py-1 rounded-bl-xl right-0 top-0 ${product.productType === "Private product"
                    ? "bg-lime-200 hover:border-lime-300 hover:bg-lime-300 text-gray-900"
                    : product.productType === "Online product"
                      ? "bg-emerald-200 hover:border-emerald-300 hover:bg-emerald-300 text-gray-900"
                      : product.productType === "Coaching Institute"
                        ? "bg-amber-200 hover:border-amber-300 hover:bg-amber-300 text-gray-900"
                        : ""
                  }`}> {product.productType}</span> */}
        <div className="relative">
          <Image
            src={product.category.picture ? product.category.picture : "/Frame.svg"}
            width="300"
            height="300"
            alt={product.name}
            className="w-full h-52 inner-shadow rounded-[16px] aspect-[5/3] object-cover"
          />
          <button
            className="bg-white rounded-full p-2 absolute top-4 right-4"
            onClick={toggleLike}
          >
            <IoHeartSharp className={`size-5 ${isLiked ? 'text-rose-500' : 'text-gray-300'}`} />
          </button>
        </div>
        <div className="pt-4 pb-2 px-2 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4">
            <CardTitle className="leading-snug font-medium line-clamp-1 text-lg select-none text-gray-700">
              {product.name}
            </CardTitle>
            <span className='flex items-center gap-2 text-nowrap text-gray-600'>
              <MdScale className='size-5' />
              {product.weight} lb
            </span>
          </div>
          <div className="flex justify-between items-center gap-1.5">
            {/* <Badge
          className={`w-fit text-nowrap shadow-sm shadow-gray-200  font-normal ${
            products.category === "Wool"
              ? "bg-lime-200 hover:border-lime-300 hover:bg-lime-300 text-gray-900 "
              : products.category === "Website Development"
              ? "bg-emerald-200 hover:border-emerald-300 hover:bg-emerald-300 text-gray-900 "
              : products.category === "SEO"
              ? "bg-amber-200 hover:border-amber-300 hover:bg-amber-300 text-gray-900 "
              : products.category === "Social Media"
              ? "bg-cyan-200 hover:border-cyan-300 hover:bg-cyan-300 text-gray-900 "
              : products.category === "Graphics Design"
              ? "bg-fuchsia-200 hover:border-fuchsia-300 hover:bg-fuchsia-300 text-gray-900 "
              : ""
          }`}
        >
          {products.category}
        </Badge> */}
            <h3 className=" text-xl font-medium">${product.price}</h3>
            <div className="flex justify-between items-center border border-gray-400 rounded-lg w-24 px-1 py-0.5 h-7">
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
          </div>
          <div className=" flex items-center gap-6">
            <Button className="border border-blue-900 rounded-xl bg-transparent hover:bg-blue-800 hover:text-white text-blue-900 text-base w-full" onClick={() => handlehandleAddToCart(product, quantity)} >
              Add to cart
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}




export const HorizontalProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };
  return (
    <Card
      className=" overflow-hidden h-fit p-2 rounded-[24px] transition duration-300 ease-in-out hover:scale-[102%] bg-gradient-to-b from-transparent to-blue-100 flex"
      key={product._id}
    >
      {/* <div key={product._id} className="bg-gradient-to-tr from-indigo-100 to-violet-100 p-4 flex gap-2 items-center relative"> */}
      {/* <span className={`w-fit text-nowrap shadow-sm shadow-gray-300 font-normal absolute text-xs px-4 py-1 rounded-bl-xl right-0 top-0 ${product.productType === "Private product"
                    ? "bg-lime-200 hover:border-lime-300 hover:bg-lime-300 text-gray-900"
                    : product.productType === "Online product"
                      ? "bg-emerald-200 hover:border-emerald-300 hover:bg-emerald-300 text-gray-900"
                      : product.productType === "Coaching Institute"
                        ? "bg-amber-200 hover:border-amber-300 hover:bg-amber-300 text-gray-900"
                        : ""
                  }`}> {product.productType}</span> */}
      <div className="relative">
        <Image
          src={product.thumbnail ? product.thumbnail : "/Frame.svg"}
          width="300"
          height="300"
          alt='Product Image'
          className="w-full h-52 inner-shadow rounded-[16px] aspect-[5/3] object-cover"
        />
        <button className=" bg-white rounded-full p-2 absolute top-4 right-4"><IoHeartSharp className="size-5 text-rose-500" /></button>
      </div>
      {/* <Image
                  src={product.img || "/noavatar.svg"}
                  alt=""
                  width={200}
                  height={200}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="object-cover border aspect-w-1 aspect-h-1 hidde lg:block rounded-ful"
                /> */}
      <div className="pt-4 pb-2 px-2 md:px-6 flex flex-col justify-between gap-2 w-full">
        <div className="">
          <div className="flex justify-between items-center gap-4">
            <CardTitle className="leading-snug font-medium line-clamp-1 text-lg select-none text-gray-700">
              {product.name}
            </CardTitle>
            <h3 className=" text-xl font-medium">${product.price}</h3>
          </div>
          <div className="mt-2">
            <p className='text-gray-700 text-sm'>
              {product.description}
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex justify-between items-center gap-1.5 mb-4">
            {/* <Badge
          className={`w-fit text-nowrap shadow-sm shadow-gray-200  font-normal ${
            products.category === "Wool"
              ? "bg-lime-200 hover:border-lime-300 hover:bg-lime-300 text-gray-900 "
              : products.category === "Website Development"
              ? "bg-emerald-200 hover:border-emerald-300 hover:bg-emerald-300 text-gray-900 "
              : products.category === "SEO"
              ? "bg-amber-200 hover:border-amber-300 hover:bg-amber-300 text-gray-900 "
              : products.category === "Social Media"
              ? "bg-cyan-200 hover:border-cyan-300 hover:bg-cyan-300 text-gray-900 "
              : products.category === "Graphics Design"
              ? "bg-fuchsia-200 hover:border-fuchsia-300 hover:bg-fuchsia-300 text-gray-900 "
              : ""
          }`}
        >
          {products.category}
        </Badge> */}
            <span className='flex items-center gap-2 text-nowrap text-gray-600'>
              <MdScale className='size-5' />
              1 lb
            </span>
            <div className="flex justify-between items-center border border-gray-400 rounded-lg w-24 px-1 py-0.5 h-7">
              <button className="cursor-pointer text-gray-800" onClick={handleDecrement}>
                <HiOutlineMinus />
              </button>
              <div className="text-base w-full flex justify-center mx-1 border-l border-r border-gray-400">
                {quantity}
              </div>
              <button className="cursor-pointer text-gray-800" onClick={handleIncrement}>
                <HiOutlinePlus />
              </button>
            </div>
          </div>
          <Button className="border border-blue-900 w-full rounded-xl bg-transparent hover:bg-blue-800 hover:text-white text-blue-900 text-base"  >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  )
}

import React from 'react'
import { Suspense } from "react";
import Loading from './loading';
import Search from '../ui/dashboard/search/search';
import Header from '../ui/header/header';
import Footer from '../ui/footer/footer';
import AllProducts from '../ui/allProducts/allProducts';

const Products = ({searchParams}) => {
  return (
    <div className="">
       <div className="sticky top-0 z-50 bg-white shadow-sm">
            {/* <Header  /> */}
           </div>
       <div className="stick lg:static top-0 lg:h-[90vh]">
         <Suspense fallback={<Loading/>}>
              <AllProducts searchParams={searchParams} />
            </Suspense>
           </div>
           {/* <Footer /> */}
    </div>
  )
}

export default Products
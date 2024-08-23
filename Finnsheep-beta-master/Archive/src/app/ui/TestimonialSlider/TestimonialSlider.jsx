"use client"

// import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import SwiperCore, { Navigation } from 'swiper/core';
// SwiperCore.use([Navigation]);
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from 'swiper/modules';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Jane D.',
    role: 'Meat Connoisseur',
    avatar: 'https://pagedone.io/asset/uploads/1696229969.png',
    feedback: "I've been buying from this farm for over a year now, and the quality of their produce is unmatched! Fresh, organic, and delivered right to my door.",
  },
  {
    name: 'Tom W.',
    role: 'Home Chef',
    avatar: 'https://pagedone.io/asset/uploads/1696229994.png',
    feedback: "The meat selection is fantastic, and you can really taste the difference. Highly recommend their service to anyone looking for top-notch farm products.",
  },
  {
    name: 'Sophia K.',
    role: 'Bulk Order Customer',
    avatar: 'https://pagedone.io/asset/uploads/1696229969.png',
    feedback: "I love how easy it is to order online and have everything I need for the week delivered. The meats are always so fresh and delicious.",
  },
  {
    name: 'James L.',
    role: 'Local Farmer Partner',
    avatar: 'https://pagedone.io/asset/uploads/1696229994.png',
    feedback: 'Customer service is excellent. They promptly answered all my queries and ensured my order was delivered on time. Great experience overall!',
  },
  // Add more testimonials as needed
];

const TestimonialSlider = () => {
    // useEffect(() => {
    //     const swiper = new Swiper('.mySwiper', {
    //       slidesPerView: 2,
    //       spaceBetween: 28,
    //       centeredSlides: false,
    //       loop: true,
    //       pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true,
    //       },
    //       navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //       },
    //       breakpoints: {
    //         0: {
    //           slidesPerView: 1,
    //           spaceBetween: 20,
    //           centeredSlides: false,
    //         },
    //         768: {
    //           slidesPerView: 2,
    //           spaceBetween: 28,
    //           centeredSlides: false,
    //         },
    //         1024: {
    //           slidesPerView: 2,
    //           spaceBetween: 32,
    //         },
    //       },
    //     });
    //   }, []);
    
  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">
          <div className="w-full lg:w-2/5">
            <span className="text-sm text-gray-500 font-medium mb-4 block">Testimonial</span>
            <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-8">
              23k+ Customers gave their <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-600">Feedback</span>
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-10">
              <button id="slider-button-left" className="swiper-button-prev group flex justify-center items-center border border-solid border-blue-600 min-w-12 min-h-12 w-12 h-12  transition-all duration-500 rounded-lg hover:bg-blue-600" data-carousel-prev>
                <svg className="h-6 w-6 text-blue-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button id="slider-button-right" className="swiper-button-next group flex justify-center items-center border border-solid border-blue-600 min-w-12 min-h-12 w-12 h-12 transition-all duration-500 rounded-lg hover:bg-blue-600" data-carousel-next>
                <svg className="h-6 w-6 text-blue-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-3/5">
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
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} virtualIndex={index} className="group bg-white border border-solid border-gray-300 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-6 transition-all duration-500 hover:border-blue-600">
                  <div className="flex items-center gap-5 mb-5 sm:mb-9">
                    <Image width={1500} height={1500} src={testimonial.avatar} alt="avatar" className='h-14 w-14'/>
                    <div className="grid gap-1">
                      <h5 className="text-gray-900 font-medium transition-all duration-500">{testimonial.name}</h5>
                      <span className="text-sm leading-6 text-gray-500">{testimonial.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-5 sm:mb-9 gap-2 text-amber-500 transition-all duration-500">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg key={starIndex} className="w-5 h-5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" fill="currentColor"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 leading-6 transition-all duration-500 min-h-24 group-hover:text-gray-800">{testimonial.feedback}</p>
                </SwiperSlide>
              ))}
               
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;

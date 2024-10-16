"use client"
import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ImagesComponent = ({ otherImages }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(otherImages)

  const [images, setImages] = useState([]);

  // otherImages value might be undefined at first and then it will be updated

  useEffect(() => {
    if (otherImages) {
      console.log("Updating images", otherImages);
      setImages(otherImages);
      console.log("Images updated", images);
    }
  }, [otherImages]);


  return (
    <div className=''>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper h-80 mb-4"
      >
        {
          Array(images).map(
            (item, index) => (
              <SwiperSlide key={index}>
                <img src={item?.image} alt={`Nature ${index}`} />
              </SwiperSlide>
            )
          )
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper "
      >
        {
          Array(images).map(
            (item, index) => (
              <SwiperSlide key={index}>
                <img src={item?.image} alt={`Nature ${index}`} />
              </SwiperSlide>
            )
          )
        }
      </Swiper>
    </div>
  );
};


export default ImagesComponent
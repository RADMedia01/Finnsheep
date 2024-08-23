'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCoverflow } from 'swiper/modules';
import { Button } from './button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSession } from 'next-auth/react';
import GradualSpacing from '../magicui/gradual-spacing';



import { useInView } from "react-intersection-observer";
import WordPullUp from '../magicui/word-pull-up';
import { useEffect, useState } from 'react';


import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const SliderCarousel = () => {
  const { data: session } = useSession();

  const [replay, setReplay] = useState(true);
  // Placeholder text data, as if from API
  const placeholderText = [
    { type: "heading1", text: "Framer Motion" },
    {
      type: "heading2",
      text: "Animating responsive text!"
    }
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025
      }
    }
  };


const textStyles = {
  heading1: "text-6xl font-bold leading-tight mb-5",
  heading2: "text-4xl font-normal leading-tight opacity-75",
};  

  // Quick and dirt for the example
  const handleReplay = () => {
    setReplay(!replay);
    setTimeout(() => {
      setReplay(true);
    }, 600);
  };

  

  const slides = [
    {
      image: '/hero1.jpg',
      title: <div><h2 className='text-yellow-500'>Experience the Happiness of</h2> Healthy Sheep in Our Care!</div>,
    //   title:  <GradualSpacing
    //   className="font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-7xl md:leading-[5rem]"
    //   text="Gradual Spacing"
    // />,
      // title: 'Joyful and Thriving',
      subTitle: 'Joyful and Thriving',
      description: 'A Heritage Breed Known for Their Sociable Nature and Easy-to-Handle Temperament!',
      buttonText: 'Shop softest yarn',
      buttonLink: '#',
      effect: ' ',  // Assign specific effect to each slide
    },
    {
      image: 'https://images.pexels.com/photos/710263/pexels-photo-710263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title:  "Slide 2 Title",
      subTitle: 'Sub Title 2',
      description: 'This is the second slide.',
      buttonText: 'Visit Farm',
      buttonLink: '#',
      effect: 'cube',  // Different effect
    },
    {
      image: 'https://images.pexels.com/photos/688618/pexels-photo-688618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Slide 3 Title',
      subTitle: 'Sub Title 3',
      description: 'This is the third slide.',
      buttonText: 'Learn More',
      buttonLink: '#',
      effect: 'flip',  // Another different effect
    },
  ];



  return (
    <div className="relative w-full h-[34rem] md:h-[34rem]">
      <Swiper

        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCoverflow]}
        navigation={{
          nextEl: '.forward',
          prevEl: '.back',
        }}
        effect="fade"
        className="mySwiper h-full"
      >
         {slides.map((slide, index) => {
          const { ref, inView } = useInView({
            triggerOnce: false,  // Ensure it triggers each time
            threshold: 0.5,
          });

          useEffect(() => {
            if (inView) {
              // Reset the replay state to trigger animation
              setReplay(false);
              setTimeout(() => {
                setReplay(true);
              }, 10); // A very short delay to ensure re-render
            }
          }, [inView]);

          return (
            <SwiperSlide key={index} className='h-full swiper-slide' data-swiper-effect={slide.effect}>
              <div
                className="w-full h-full relative bg-cover bg-center flex items-center px-8 md:px-20 object-ight"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
            
                <div className="text-left text-white w-3/4 md:w-2/3 z-10">
                  <h6 className="mb-4 text-white font-medium text-sm md:text-xl">{slide.subTitle}</h6>
                  <h2 className="text-2xl md:text-6xl font-semibold mb-4 leading-tight">{slide.title}</h2>
                  {/* <div ref={ref}>
                    {inView && (
                      <WordPullUp
                        className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
                        words={slide.title}  // Ensure this is a string
                      />
                    )}
                  </div>
                  <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={container}
                    className="max-w-screen-lg p-10 mx-auto"
                  >
                    {placeholderText.map((item, index) => (
                      <AnimatedText {...item} key={index} />
                    ))}
                    <button
                      className="bg-transparent border-none text-gray-500 uppercase font-semibold flex justify-center items-center mx-auto"
                      onClick={() => console.log('Replay clicked')}
                    >
                      Replay <span className="ml-1">⟲</span>
                    </button>
                  </motion.div> */}
                  <h6 className="mb-4 text-white text-sm md:text-base hidden md:block">{slide.description}</h6>
                  <Button
                    href={slide.buttonLink}
                    variant="outline"
                    className="px-6 py-2 border-none text-gray-800 uppercase font-medium hover:bg-blue-700 hover:text-white hover:border-none text-xs md:text-sm rounded-xl"
                  >
                    {slide.buttonText}
                  </Button>
                </div>
                    {/* <!-- Background Overlay --> */}
  <div class="absolute inset-0 bg-black bg-opacity-10"></div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button className="back text-gray-400 hover:text-gray-200 backdrop-blur-sm p-2 hover:bg-white/10 rounded-full absolute top-1/2 left-6 z-10 hidden md:block">
        <IoIosArrowBack className='size-5' />
      </button>
      <button className="forward text-gray-400 hover:text-gray-200 backdrop-blur-sm p-2 hover:bg-white/10 rounded-full absolute top-1/2 right-6 z-10 hidden md:block">
        <IoIosArrowForward className='size-5' />
      </button>
    </div>
  );
};

export default SliderCarousel;


























// "use client"

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // import './styles.css';

// // import required modules
// import { Pagination,Navigation,Autoplay, EffectFade } from 'swiper/modules';
// import { Button } from './button';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import { useSession } from 'next-auth/react';
// import GradualSpacing from '../magicui/gradual-spacing';


// const SliderCarousel = () => {

//   const { data: session } = useSession()
//   console.log("Session is " + session)

//     const slides = [
//         {
//           image: '/hero1.jpg',
//           title: <div><h2 className='text-yellow-500'>Experience the Happiness of</h2> Healthy Sheep in Our Care!</div>,
//           // title: 'Experience the Happiness of Healthy Sheep in Our Care!',
//           subTitle: 'Joyful and Thriving',
//           description: 'A Heritage Breed Known for Their Sociable Nature and Easy-to-Handle Temperament!',
//           buttonText: 'Shop softest yarn',
//           buttonLink: '#'
//         },
//         {
//           image: 'https://images.pexels.com/photos/710263/pexels-photo-710263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//           title: 'Slide 2 Title',
//           subTitle: 'Sub Title 2',
//           description: 'This is the second slide.',
//           buttonText: 'Visit Farm',
//           buttonLink: '#'
//         },
//         {
//           image: 'https://images.pexels.com/photos/688618/pexels-photo-688618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//           title: 'Slide 2 Title',
//           subTitle: 'Sub Title 2',
//           description: 'This is the second slide.',
//           buttonText: 'Learn More',
//           buttonLink: '#'
//         },
       
//         // Add more slides as needed
//       ];
    
//       return (
//         <div className="relative w-full h-[22rem] md:h-[34rem]">
//           <Swiper
//           slidesPerView={1}
//             spaceBetween={0}
//             centeredSlides={true}
//             autoplay={{
//               delay: 5000,
//               disableOnInteraction: false,
//             }}
//             loop={true}
//             pagination={{ clickable: true }}
//             // pagination={true}
//             // navigation={false}
//             className="mySwiper h-full"
//             modules={[Pagination,Navigation,Autoplay, EffectFade]}
//             navigation={{
//               nextEl: '.forward',
//               prevEl: '.back',
//             }}
//           >
//             {slides.map((slide, index) => (
//               <SwiperSlide key={index} className='h-full' >
//                 <div
//                   className="w-full h-full bg-cover bg-center flex items-center px-8 md:px-20"
//                   style={{ backgroundImage: `url(${slide.image})` }}
//                 >
//                   <div className="text-left text-white w-3/4 md:w-2/3">
//                   <h6 className="mb-4 text-white font-medium text-sm md:text-xl">{slide.subTitle}</h6>
//                     {/* Log or inspect slide.title */}
//           {console.log("this is slide text", slide.title)}
//                   {/* <GradualSpacing
//       className="font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-6xl md:leading-[5rem]"
//       text={slide.title}
//     /> */}
//                     <h2 className="text-2xl md:text-6xl font-semibold mb-4 leading-tight">{slide.title}</h2>
//                     <h6 className="mb-4 text-white text-sm md:text-base hidden md:block">{slide.description}</h6>
//                     <Button
//                       href={slide.buttonLink}
//                       variant="outline"
//                       className="px-6 py-2 border-none text-gray-800 uppercase font-medium hover:bg-blue-700 hover:text-white hover:border-none text-xs md:text-sm rounded-xl"
//                     >
//                       {slide.buttonText}
//                     </Button>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <button className="back text-gray-400 hover:text-gray-200 backdrop-blur-sm p-2  hover:bg-white/10 rounded-full absolute top-1/2 left-6 z-10 hidden md:block">
//           <IoIosArrowBack className='size-5'/>
//           </button>
//           <button className="forward text-gray-400 hover:text-gray-200 backdrop-blur-sm p-2  hover:bg-white/10 rounded-full absolute top-1/2 right-6 z-10 hidden md:block">
//           <IoIosArrowForward className='size-5'/>
//           </button>
//         </div>
//       );
//     };

    
// export default SliderCarousel;

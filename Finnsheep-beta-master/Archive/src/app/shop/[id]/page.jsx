
import { fetchProduct, fetchTutor } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Badge } from '@/components/ui/badge';


// const TutorDetailPage = async({ params }) => {
//     const { id } = params;
//     const tutor = await fetchTutor(id);
//   return (
//     <div>
//         {/* {tutor.name} */}
//         <section className="relative lg:pt-36 pt-16 pb-24">
//         <Image width={200} height={200} src="/thumbnail.png" alt="cover-image" className="w-full absolute object-cover top-0 left-0 z-0 h-40 lg:h-60"/>
//         <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
//             <div className="flex items-center justify-center relative z-10 mb-2.5">
//                 <Image src={tutor.img || "/noavatar.svg"} alt="user-avatar-image" width={200} height={200} className="border-4 border-solid border-white rounded-full aspect-square object-cover"/>
//             </div>
//             <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
                
//                 {/* <div
//                                 className="rounded-xl p-4 bg-indigo-50  font-medium text-lg text-indigo-600">{tutor.yearsOfExperience}+
//                                 <p className="text-base font-normal text-gray-600">Years Experiences</p>
//                                 </div> */}

//                               <p className="uppercase flex gap-2">{tutor.boards.map((board,i) => (
//                                 <button
//                                 className="py-2 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-sm leading-7 shadow-sm shadow-transparent uppercase transition-all duration-500 hover:bg-indigo-100" key={i}>{board}</button>
//                                ))}</p>
                               
//                 <div className="flex items-center gap-4">
//                     <button
//                         className="rounded-full border border-solid border-gray-300 bg-gray-50 py-3 px-4 text-sm font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-50 hover:bg-gray-100 hover:border-gray-300">{tutor.tutorType}</button>
//                    <Link href={`tel:${tutor.contactNo}`}
//                         className="rounded-full border border-solid border-indigo-600 bg-indigo-600 py-3 px-4 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-indigo-700 hover:border-indigo-700">Call Now</Link>
//                 </div>
//             </div>
//             <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3 capitalize">{tutor.name}</h3>
//             <p className="font-normal text-base leading-7 text-gray-500 text-center mb-4 capitalize">{tutor.qualification.map(q => q).join(", ")}</p>

//             <div className="flex flex-wrap items-center justify-center gap-4 space-x-8 mb-8 leading-3">
//               <span className="flex gap-1 items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
// </svg>
// {tutor.city}, {tutor.state}
//               </span>

//               <span className="flex gap-1 items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
// </svg>
// Joined {tutor.createdAt
//                   ? 
//                     format(new Date(tutor.createdAt), 'MMMM yyyy')
//                   : "N/A"}
//               </span>


//               <span className="flex gap-1 items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
// </svg>
// {tutor.yearsOfExperience}+ Years Experiences
//               </span>
//             </div>


//             <div className="flex items-center justify-center gap-5">
//                 <a href="javascript:;"
//                     className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <g clip-path="url(#clip0_1115_412)">
//                             <path className="fill-blue-400 transition-all duration-500 group-hover:fill-white"
//                                 d="M20 10.2391C20 9.56523 19.9333 8.86958 19.8222 8.21741H10.2V12.0652H15.7111C15.4889 13.3044 14.7556 14.3913 13.6667 15.087L16.9556 17.587C18.8889 15.8261 20 13.2609 20 10.2391Z"
//                                 fill="" />
//                             <path className="fill-green-400 transition-all duration-500 group-hover:fill-white"
//                                 d="M10.2 19.9783C12.9556 19.9783 15.2667 19.087 16.9556 17.5652L13.6667 15.087C12.7556 15.6957 11.5778 16.0435 10.2 16.0435C7.53337 16.0435 5.28893 14.2826 4.46671 11.9348L1.08893 14.4783C2.82226 17.8479 6.33337 19.9783 10.2 19.9783Z"
//                                 fill="#34A353" />
//                             <path className="fill-yellow-400 transition-all duration-500 group-hover:fill-white"
//                                 d="M4.46673 11.913C4.0445 10.6739 4.0445 9.32608 4.46673 8.08695L1.08895 5.52173C-0.355496 8.34782 -0.355496 11.6739 1.08895 14.4783L4.46673 11.913Z"
//                                 fill="#F6B704" />
//                             <path className="fill-red-400 transition-all duration-500 group-hover:fill-white"
//                                 d="M10.2 3.97827C11.6445 3.95653 13.0667 4.5 14.1112 5.47827L17.0223 2.6087C15.1778 0.913046 12.7334 2.58834e-06 10.2 0.0217417C6.33337 0.0217417 2.82226 2.15218 1.08893 5.52174L4.46671 8.08696C5.28893 5.7174 7.53337 3.97827 10.2 3.97827Z"
//                                 fill="#E54335" />
//                         </g>
//                         <defs>
//                             <clipPath id="clip0_1115_412">
//                                 <rect width="20" height="20" fill="white" />
//                             </clipPath>
//                         </defs>
//                     </svg>
//                 </a>
//                 <a href="javascript:;"
//                     className="p-3 rounded-full border border-solid border-gray-300 bg-gray-50 group transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <g clip-path="url(#clip0_1115_52)">
//                             <path className="fill-indigo-600 transition-all duration-500 group-hover:fill-white"
//                                 d="M10.0001 20C15.523 20 20.0001 15.5228 20.0001 10C20.0001 4.47715 15.523 0 10.0001 0C4.47727 0 0.00012207 4.47715 0.00012207 10C0.00012207 15.5228 4.47727 20 10.0001 20Z"
//                                 fill="" />
//                             <path className="fill-white transition-all duration-500 group-hover:fill-indigo-700"
//                                 d="M13.2516 3.06946H11.0364C9.72179 3.06946 8.25958 3.62236 8.25958 5.52793C8.266 6.1919 8.25958 6.82779 8.25958 7.54345H6.73877V9.96352H8.30665V16.9305H11.1877V9.91754H13.0893L13.2613 7.53666H11.1381C11.1381 7.53666 11.1428 6.47754 11.1381 6.16997C11.1381 5.41693 11.9216 5.46005 11.9688 5.46005C12.3416 5.46005 13.0666 5.46114 13.2527 5.46005V3.06946H13.2516V3.06946Z"
//                                 fill="" />
//                         </g>
//                         <defs>
//                             <clipPath id="clip0_1115_52">
//                                 <rect width="20" height="20" fill="white" />
//                             </clipPath>
//                         </defs>
//                     </svg>
//                 </a>
//                 <a href="javascript:;"
//                     className="p-3 rounded-full border border-solid border-gray-300 bg-gray-50 group transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
//                     <svg className="stroke-red-600 transition-all duration-500 group-hover:stroke-white" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                             d="M14.1667 5.83333V5.875M9.16673 17.5H10.8334C13.9761 17.5 15.5474 17.5 16.5237 16.5237C17.5001 15.5474 17.5001 13.976 17.5001 10.8333V9.16667C17.5001 6.02397 17.5001 4.45262 16.5237 3.47631C15.5474 2.5 13.9761 2.5 10.8334 2.5H9.16673C6.02403 2.5 4.45268 2.5 3.47637 3.47631C2.50006 4.45262 2.50006 6.02397 2.50006 9.16667V10.8333C2.50006 13.976 2.50006 15.5474 3.47637 16.5237C4.45268 17.5 6.02403 17.5 9.16673 17.5ZM13.3334 10C13.3334 11.8409 11.841 13.3333 10.0001 13.3333C8.15911 13.3333 6.66673 11.8409 6.66673 10C6.66673 8.15905 8.15911 6.66667 10.0001 6.66667C11.841 6.66667 13.3334 8.15905 13.3334 10Z"
//                             stroke="" stroke-width="1.6" stroke-linecap="round" />
//                     </svg>
//                 </a>
//                 <a href="javascript:;"
//                     className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path className="fill-red-600 transition-all duration-500 group-hover:fill-white"
//                             d="M1.40288 6.21319C1.48321 4.97646 2.47753 4.00723 3.71535 3.9459C5.5078 3.8571 8.06973 3.75 10.0001 3.75C11.9304 3.75 14.4923 3.8571 16.2848 3.9459C17.5226 4.00723 18.5169 4.97646 18.5972 6.21319C18.6742 7.39808 18.7501 8.85604 18.7501 10C18.7501 11.144 18.6742 12.6019 18.5972 13.7868C18.5169 15.0235 17.5226 15.9928 16.2848 16.0541C14.4923 16.1429 11.9304 16.25 10.0001 16.25C8.06973 16.25 5.5078 16.1429 3.71535 16.0541C2.47753 15.9928 1.48321 15.0235 1.40288 13.7868C1.32591 12.6019 1.25006 11.144 1.25006 10C1.25006 8.85604 1.32591 7.39808 1.40288 6.21319Z"
//                             fill="#FC0D1B" />
//                         <path className="fill-white transition-all duration-500 group-hover:fill-indigo-700" d="M8.12506 7.5V12.5L13.1251 10L8.12506 7.5Z" fill="white" />
//                     </svg>
//                 </a>
//                 <a href="javascript:;"
//                     className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <circle className="transition-all duration-500 group-hover:fill-white" cx="10.0001" cy="10" r="8.75" fill="url(#paint0_linear_1115_481)" />
//                         <path className="transition-all duration-500 group-hover:fill-indigo-700"
//                             d="M14.3667 6.38049C14.4446 5.87707 13.9659 5.47972 13.5183 5.67625L4.60307 9.59053C4.28208 9.73146 4.30556 10.2177 4.63848 10.3237L6.47703 10.9092C6.82792 11.0209 7.20789 10.9631 7.5143 10.7514L11.6594 7.88767C11.7844 7.80131 11.9207 7.97904 11.8139 8.08914L8.83013 11.1654C8.54069 11.4638 8.59814 11.9695 8.94629 12.1878L12.2869 14.2827C12.6616 14.5176 13.1436 14.2816 13.2137 13.8288L14.3667 6.38049Z"
//                             fill="white" />
//                         <defs>
//                             <linearGradient id="paint0_linear_1115_481" x1="10.0001" y1="1.25" x2="10.0001" y2="18.75"
//                                 gradientUnits="userSpaceOnUse">
//                                 <stop stop-color="#37BBFE" />
//                                 <stop offset="1" stop-color="#007DBB" />
//                             </linearGradient>
//                         </defs>
//                     </svg>
//                 </a>

// <div>
//             </div>
//         </div>
  

// <Table className="mt-8">
//       {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
//       <TableHeader className="bg-gradient-to-tr from-indigo-100 to-violet-100">
//         <TableRow>
//           <TableHead className="w-[100px]">Subject</TableHead>
//           <TableHead className="text-right">Class</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {tutor.subjects.map((subject) => (
//           <TableRow key={subject.subject}>
//             <TableCell className="font-medium capitalize">{subject.subject}</TableCell>
//             <TableCell className="text-right">{subject.fromClass} - {subject.toClass}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
    
//     </Table>

//   </div>
//     </section>
                                            
//     </div>
//   )
// }

// export default TutorDetailPage


import React from 'react'
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import Quantity from './quantity';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ImagesComponent from './image';

const ProductPage = async({params}) => {
    const { id } = params;
    const product = await fetchProduct(id);

    // const dispatch = useAppDispatch()

 const handlehandleAddToCart = (product) => {
   console.log('Adding to cart', product)
//    dispatch(add({ ...product, quantity }))
 }
  

  
  return (
    <div>
        <div className="md:grid grid-cols-2 min-h-80 container gap-8">
            <div className="bg-indigo-5 py-10 md:py-20">
                <ImagesComponent/>


            </div>

            
            <div className="bg-red-5 md:p-10 md:py-20">

                <h2 className='capitalize text-4xl'>{product.name}</h2>
                <p className='mt-4 text-gray-700'>{product.description}</p>
                <div className="flex gap-6">
                <p className='mt-4 text-gray-700 text-lg font-semibold'>${product.price}</p>

                {product.stock >= 0 ?
                <Badge className='mt-4 text-gray-700 bg-green-200 border border-green-500'>In Stock</Badge>
            :
            <Badge className='mt-4 text-gray-700 bg-red-200 border border-red-500'>Out of Stock</Badge>}
                </div>
               <Quantity product={product}/>
            
            </div>
        </div>
        <div className="bg-green-5 h-80 md:p-20 container my-10">Related Products</div>
        <div className="bg-violet-5 h-80 md:p-20 container">Review</div>
    </div>
  )
}

export default ProductPage
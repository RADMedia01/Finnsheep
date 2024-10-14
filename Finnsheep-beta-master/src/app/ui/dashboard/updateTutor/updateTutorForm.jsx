"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTutor } from "@/app/lib/actions";

import { useToast } from "@/components/ui/use-toast"
import { redirect } from "next/navigation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { getCurrentTime } from '@/app/lib/utils';
import ProfilePicInput from "../profilePicUpload/profilePicUpload";
import { formatDistance } from 'date-fns';
import Spinner from "../spinner/spinner";
import { useFormStatus } from 'react-dom'
// import { State } from 'country-state-city';
import Image from 'next/image';
import Link from 'next/link';
// import { format } from 'date-fns';
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parse, isValid } from "date-fns";
import { State, City } from 'country-state-city';

import { Checkbox } from "@/components/ui/checkbox"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UpdateUserForm = ({ tutor }) => {

  const [step, setStep] = useState(1);

  const [profilePic, setProfilePic] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [state, setState] = useState(tutor.state);
  const [city, setCity] = useState(tutor.city);
  const [tutorType, setTutorType] = useState("");
  // Subjects
  const [subjects, setSubjects] = useState([
    { subject: "", fromClass: "", toClass: "" } // Initial subject object
  ]);


  const [selectedDate, setSelectedDate] = useState(tutor.dob);
  const [inputDate, setInputDate] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // if (e.target.value) {
    //   setPasswordMatch(false);
    // } else {
    //   setPasswordMatch(true);
    // }
  };


  const { toast } = useToast()
  console.log(tutor)
  // console.log(State.getStatesOfCountry('IN'))



  const [data, setData] = useState({
    // Define form fields for each step
    name: tutor.name,
    username: tutor.username,
    email: tutor.email,
    contactNo: tutor.contactNo,
    dob: selectedDate,
    password: "",
    address: tutor.address,
    state: state,
    city: city,
    pincode: tutor.pincode,
    tutorType: tutor.tutorType,
    fromClass: tutor.fromClass,
    toClass: tutor.toClass,
    yearsOfExperience: tutor.yearsOfExperience,
    boards: [],
    qualification: [],
    subjects: [],
    termsAndConditions: false,
  });

  // Board
  const [board, setBoard] = useState([""]);
  const handleAddBoard = () => {
    const boardInput = [...board, []]
    setBoard(boardInput)
  }


  const handleBoardChange = (onChangeValue, i) => {
    const inputdata = [...board]
    inputdata[i] = onChangeValue.target.value.toUpperCase();
    setBoard(inputdata)
    setData((prevData) => ({
      ...prevData,
      boards: inputdata, // Update with the new board array
    }));
  }


  const handleBoardDelete = (i) => {
    const deletVal = [...board]
    deletVal.splice(i, 1)
    setBoard(deletVal)
    setData((prevData) => ({
      ...prevData,
      boards: deletVal, // Update with the new board array
    }));
  }

  // Qualification
  const [qualification, setQualification] = useState([""]);
  const handleAddQualification = () => {
    const experiance = [...qualification, []]
    setQualification(experiance)
  }
  const handleQualificationChange = (onChangeValue, i) => {
    const inputdata = [...qualification]
    inputdata[i] = onChangeValue.target.value.charAt(0).toUpperCase() + onChangeValue.target.value.slice(1);
    setQualification(inputdata)
    setData((prevData) => ({
      ...prevData,
      qualification: inputdata, // Update with the new board array
    }));
  }
  const handleQualificationDelete = (i) => {
    const deletVal = [...qualification]
    deletVal.splice(i, 1)
    setQualification(deletVal)
    setData((prevData) => ({
      ...prevData,
      qualification: deletVal, // Update with the new board array
    }));
  }



  const handleAddSubject = () => {
    const updatedSubjects = [...subjects, { subject: "", fromClass: "", toClass: "" }];
    setSubjects(updatedSubjects);
  };

  const handleSubjectChange = (value, index, field) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value.replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\b\w/g, (c) => c.toUpperCase());;
    setSubjects(updatedSubjects);

    setData((prevData) => ({
      ...prevData,
      subjects: updatedSubjects, // Update with the new board array
    }));
  };

  const handleDeleteSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
    setData((prevData) => ({
      ...prevData,
      subjects: updatedSubjects, // Update with the new board array
    }));
  };


  const handleTermsAndConditionsChange = () => {
    setTermsAndConditions(!termsAndConditions);
    setData((prevData) => ({
      ...prevData,
      termsAndConditions: termsAndConditions,
    }));
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Set thumbnail to empty string when no file is selected
      setThumbnail("");
    }
  };
  console.log(data);


  const handleDateChange = (e) => {
    const inputValue = e.target.value;

    // Remove any character that is not a number or hyphen
    const sanitizedValue = inputValue.replace(/[^0-9-]/g, '');

    setInputDate(e.target.value);
    const date = parse(e.target.value, 'dd-MM-y', new Date());
    if (isValid(date)) {
      setSelectedDate(date);
      handleChange(e);
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleDaySelect = (date) => {
    // const date = parse(e.target.value, 'dd-MM-y', new Date());
    setSelectedDate(date);
    if (isValid(date)) {
      setInputDate(format(date, 'dd-MM-y'));
      // handleChange(format(date, 'dd-MM-y'));
      setData((prevData) => ({
        ...prevData,
        dob: format(date, 'dd-MM-y'),
      }));
    } else {
      setInputDate('');
    }
  };




  return (
    // <div className="lg:h-screen flex items-center">


    //     <form className="w-full pt-4 py-20" action={async (formData) => {

    //     const result = await updateTutor(formData);
    //     if(result?.err) {
    //           toast({
    //             variant: "destructive",
    //             title: <div className="flex gap-2 items-center"><IoWarningOutline className="text-2xl"/> { result.err} </div>,
    //             description: " Uh oh! Something went wrong.",
    //           })
    //     } else if (result.success) {
    //         toast({
    //             variant: "success2",
    //         title: <div className="flex gap-2 items-center"><IoIosCheckmarkCircleOutline className="text-2xl"/>{result.success}</div>,
    //       description: getCurrentTime(),
    //           });
    //           redirect("/dashboard/tutors");
    //     }
    // }}>

    //   <div className="lg:pt-[86px lg:h-full  p-3 px-4 lg:px-8 flex justify-center items-center flex-col ">

    //     <div className="grid grid-cols- md:grid-cols-4 gap-6 w-full px-4 py-6 sm:p-12 bg-slate-100 rounded-3xl ">


    //       <ProfilePicInput prev={tutor.img} className="h-36 w-36"/>

    //       <div className=" col-span-1 md:col-span-3 grid sm:grid-cols-2 gap-6">
    //       <input type="hidden" name="id" value={tutor._id}/>
    //         <div className="grid col-span-1  items-center gap-2">
    //           <Label htmlFor="username" className="text-left">
    //             Username:
    //           </Label>
    //           <Input name="username" className="bg-white" placeholder={tutor.username} onChange={(e) => {
    //                 e.target.value = e.target.value
    //                   .toLowerCase()
    //                   .replace(/\s/g, "");
    //               }}/>
    //         </div>
    //         <div className="grid col-span-1  items-center gap-2">
    //           <Label htmlFor="name" className="text-left">
    //             Full Name:
    //           </Label>
    //           <Input name="name" className="bg-white" placeholder={tutor.name} onChange={(e) => {
    //                 e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\b\w/g, c => c.toUpperCase());
    //               }}/>
    //         </div>
    //         <div className="grid col-span-1 items-center gap-2">
    //           <Label htmlFor="username" className="text-left">
    //             Email:
    //           </Label>
    //           <Input
    //             name="email"
    //             type="email"
    //             className="bg-white"
    //             placeholder={tutor.email}
    //             onChange={(e) => {
    //               e.target.value = e.target.value
    //                 .toLowerCase()
    //                 .replace(/\s/g, "");
    //             }}
    //           />
    //         </div>
    //         <div className="grid items-center gap-2">
    //           <Label htmlFor="phone" className="text-left">
    //             Phone No.:
    //           </Label>
    //           <Input
    //             name="phone"
    //             type="tel"
    //             className="bg-white"
    //             placeholder={tutor.contactNo}
    //             onChange={(e) => {
    //               e.target.value = e.target.value.replace(/\D/g, "");
    //             }}
    //           />
    //         </div>
    //         <div className="grid items-center col-span-full gap-2">
    //           <Label htmlFor="address" className="text-left">
    //             Address:
    //           </Label>
    //           <Textarea
    //             name="address"
    //             className="bg-white"
    //             placeholder={tutor.address}
    //             rows="5"
    //             type="textarea"
    //             onChange={(e) => {
    //               e.target.value = e.target.value.replace(/\b\w/g, (c) =>
    //                 c.toUpperCase()
    //               );
    //             }}
    //           />
    //         </div>
    //       </div>
    //         <div className=" col-span-1 md:col-span-1 grid  gap-2">
    //         <Label htmlFor="city" className="text-left">
    //             City:
    //           </Label>
    //           <Input
    //             name="city"
    //             type="text"
    //             className="bg-white"
    //             placeholder={tutor.city}
    //             onChange={(e) => {
    //               e.target.value = e.target.value.replace(/\D/g, "");
    //             }}
    //           />
    //         </div>

    //         <div className=" col-span-1 md:col-span-1 grid  gap-2">
    //         <Label htmlFor="state" className="text-left">
    //             State:
    //           </Label>
    //           <Input
    //             name="state"
    //             type="text"
    //             className="bg-white"
    //             placeholder={State.getStateByCode(tutor.state)?.name}
    //             onChange={(e) => {
    //               e.target.value = e.target.value.replace(/\D/g, "");
    //             }}
    //           />
    //         </div>

    //         <div className=" col-span-1 md:col-span-1 grid  gap-2">
    //         <Label htmlFor="pincode" className="text-left">
    //         Pincode:
    //           </Label>
    //           <Input
    //             name="pincode"
    //             type="number"
    //             className="bg-white"
    //             placeholder={tutor.pincode}
    //             onChange={(e) => {
    //               e.target.value = e.target.value.replace(/\D/g, "");
    //             }}
    //           />
    //         </div>
    //         <div className="flex items-center col-span-full justify-between w-full gap-4 text-sm py-2  ">
    //     <span className=""> Last updated: {tutor.updatedAt ? formatDistance(new Date(tutor.updatedAt), new Date(), { addSuffix: true, roundingMethod: 'floor' }) : "N/A"}</span>
    //     <UpdateButton/>
    //     </div>

    //     </div>
    //   </div>
    //   </form>
    // </div>

    <section className="relative pt-36 pb-24">
      <Image width={200} height={200} src="/thumbnail.png" alt="cover-image" className="w-full absolute object-cover top-0 left-0 z-0 h-60" />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center relative z-10 mb-2.5">
          <Image src={tutor.img || "/noavatar.svg"} alt="user-avatar-image" width={200} height={200} className="border-4 border-solid border-white rounded-full aspect-square object-cover" />
        </div>
        <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">



          <p className="uppercase flex gap-2">{tutor.boards.map((board, i) => (
            <button
              className="py-2 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-sm leading-7 shadow-sm shadow-transparent uppercase transition-all duration-500 hover:bg-indigo-100" key={i}>{board}</button>
          ))}</p>

          <div className="flex items-center gap-4">
            <button
              className="rounded-full border border-solid border-gray-300 bg-gray-50 py-3 px-4 text-sm font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-50 hover:bg-gray-100 hover:border-gray-300">{tutor.tutorType}</button>
            <Link href={`tel:${tutor.contactNo}`}
              className="rounded-full border border-solid border-indigo-600 bg-indigo-600 py-3 px-4 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-indigo-700 hover:border-indigo-700">Call Now</Link>



            <Link href={`/dashboard/tutors/${tutor._id}/edit-profile`}
              className="rounded-full border border-solid border-slate-600 bg-slate-600 py-3 px-4 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-slate-700 hover:border-slate-700">Edit Profile</Link>


          </div>
        </div>
        <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3 capitalize">{tutor.name}</h3>
        <p className="font-normal text-base leading-7 text-gray-500 text-center mb-4 capitalize">{tutor.qualification.map(q => q).join(", ")}</p>

        <div className="flex flex-wrap items-center justify-center gap-4 space-x-8 mb-8 leading-3">
          <span className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {tutor.city}, {tutor.state}
          </span>

          <span className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            Joined {tutor.createdAt
              ?
              format(new Date(tutor.createdAt), 'MMMM yyyy')
              : "N/A"}
          </span>


          <span className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            {tutor.yearsOfExperience}+ Years Experiences
          </span>
        </div>


        <div className="flex items-center justify-center gap-5">
          <a href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1115_412)">
                <path className="fill-blue-400 transition-all duration-500 group-hover:fill-white"
                  d="M20 10.2391C20 9.56523 19.9333 8.86958 19.8222 8.21741H10.2V12.0652H15.7111C15.4889 13.3044 14.7556 14.3913 13.6667 15.087L16.9556 17.587C18.8889 15.8261 20 13.2609 20 10.2391Z"
                  fill="" />
                <path className="fill-green-400 transition-all duration-500 group-hover:fill-white"
                  d="M10.2 19.9783C12.9556 19.9783 15.2667 19.087 16.9556 17.5652L13.6667 15.087C12.7556 15.6957 11.5778 16.0435 10.2 16.0435C7.53337 16.0435 5.28893 14.2826 4.46671 11.9348L1.08893 14.4783C2.82226 17.8479 6.33337 19.9783 10.2 19.9783Z"
                  fill="#34A353" />
                <path className="fill-yellow-400 transition-all duration-500 group-hover:fill-white"
                  d="M4.46673 11.913C4.0445 10.6739 4.0445 9.32608 4.46673 8.08695L1.08895 5.52173C-0.355496 8.34782 -0.355496 11.6739 1.08895 14.4783L4.46673 11.913Z"
                  fill="#F6B704" />
                <path className="fill-red-400 transition-all duration-500 group-hover:fill-white"
                  d="M10.2 3.97827C11.6445 3.95653 13.0667 4.5 14.1112 5.47827L17.0223 2.6087C15.1778 0.913046 12.7334 2.58834e-06 10.2 0.0217417C6.33337 0.0217417 2.82226 2.15218 1.08893 5.52174L4.46671 8.08696C5.28893 5.7174 7.53337 3.97827 10.2 3.97827Z"
                  fill="#E54335" />
              </g>
              <defs>
                <clipPath id="clip0_1115_412">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 bg-gray-50 group transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1115_52)">
                <path className="fill-indigo-600 transition-all duration-500 group-hover:fill-white"
                  d="M10.0001 20C15.523 20 20.0001 15.5228 20.0001 10C20.0001 4.47715 15.523 0 10.0001 0C4.47727 0 0.00012207 4.47715 0.00012207 10C0.00012207 15.5228 4.47727 20 10.0001 20Z"
                  fill="" />
                <path className="fill-white transition-all duration-500 group-hover:fill-indigo-700"
                  d="M13.2516 3.06946H11.0364C9.72179 3.06946 8.25958 3.62236 8.25958 5.52793C8.266 6.1919 8.25958 6.82779 8.25958 7.54345H6.73877V9.96352H8.30665V16.9305H11.1877V9.91754H13.0893L13.2613 7.53666H11.1381C11.1381 7.53666 11.1428 6.47754 11.1381 6.16997C11.1381 5.41693 11.9216 5.46005 11.9688 5.46005C12.3416 5.46005 13.0666 5.46114 13.2527 5.46005V3.06946H13.2516V3.06946Z"
                  fill="" />
              </g>
              <defs>
                <clipPath id="clip0_1115_52">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 bg-gray-50 group transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
            <svg className="stroke-red-600 transition-all duration-500 group-hover:stroke-white" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.1667 5.83333V5.875M9.16673 17.5H10.8334C13.9761 17.5 15.5474 17.5 16.5237 16.5237C17.5001 15.5474 17.5001 13.976 17.5001 10.8333V9.16667C17.5001 6.02397 17.5001 4.45262 16.5237 3.47631C15.5474 2.5 13.9761 2.5 10.8334 2.5H9.16673C6.02403 2.5 4.45268 2.5 3.47637 3.47631C2.50006 4.45262 2.50006 6.02397 2.50006 9.16667V10.8333C2.50006 13.976 2.50006 15.5474 3.47637 16.5237C4.45268 17.5 6.02403 17.5 9.16673 17.5ZM13.3334 10C13.3334 11.8409 11.841 13.3333 10.0001 13.3333C8.15911 13.3333 6.66673 11.8409 6.66673 10C6.66673 8.15905 8.15911 6.66667 10.0001 6.66667C11.841 6.66667 13.3334 8.15905 13.3334 10Z"
                stroke="" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="fill-red-600 transition-all duration-500 group-hover:fill-white"
                d="M1.40288 6.21319C1.48321 4.97646 2.47753 4.00723 3.71535 3.9459C5.5078 3.8571 8.06973 3.75 10.0001 3.75C11.9304 3.75 14.4923 3.8571 16.2848 3.9459C17.5226 4.00723 18.5169 4.97646 18.5972 6.21319C18.6742 7.39808 18.7501 8.85604 18.7501 10C18.7501 11.144 18.6742 12.6019 18.5972 13.7868C18.5169 15.0235 17.5226 15.9928 16.2848 16.0541C14.4923 16.1429 11.9304 16.25 10.0001 16.25C8.06973 16.25 5.5078 16.1429 3.71535 16.0541C2.47753 15.9928 1.48321 15.0235 1.40288 13.7868C1.32591 12.6019 1.25006 11.144 1.25006 10C1.25006 8.85604 1.32591 7.39808 1.40288 6.21319Z"
                fill="#FC0D1B" />
              <path className="fill-white transition-all duration-500 group-hover:fill-indigo-700" d="M8.12506 7.5V12.5L13.1251 10L8.12506 7.5Z" fill="white" />
            </svg>
          </a>
          <a href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="transition-all duration-500 group-hover:fill-white" cx="10.0001" cy="10" r="8.75" fill="url(#paint0_linear_1115_481)" />
              <path className="transition-all duration-500 group-hover:fill-indigo-700"
                d="M14.3667 6.38049C14.4446 5.87707 13.9659 5.47972 13.5183 5.67625L4.60307 9.59053C4.28208 9.73146 4.30556 10.2177 4.63848 10.3237L6.47703 10.9092C6.82792 11.0209 7.20789 10.9631 7.5143 10.7514L11.6594 7.88767C11.7844 7.80131 11.9207 7.97904 11.8139 8.08914L8.83013 11.1654C8.54069 11.4638 8.59814 11.9695 8.94629 12.1878L12.2869 14.2827C12.6616 14.5176 13.1436 14.2816 13.2137 13.8288L14.3667 6.38049Z"
                fill="white" />
              <defs>
                <linearGradient id="paint0_linear_1115_481" x1="10.0001" y1="1.25" x2="10.0001" y2="18.75"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#37BBFE" />
                  <stop offset="1" stopColor="#007DBB" />
                </linearGradient>
              </defs>
            </svg>
          </a>

          <div>
          </div>
        </div>


        <Table className="mt-8">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className="bg-gradient-to-tr from-indigo-100 to-violet-100">
            <TableRow>
              <TableHead className="w-[100px]">Subject</TableHead>
              <TableHead className="text-right">Class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutor.subjects.map((subject) => (
              <TableRow key={subject.subject}>
                <TableCell className="font-medium capitalize">{subject.subject}</TableCell>
                <TableCell className="text-right">{subject.fromClass} - {subject.toClass}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>

      </div>
    </section>
  )
}

export default UpdateUserForm


function UpdateButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="bg-[#523EF3] text-nowrap text-xs w-28 px-3 py-2  text-white h-[38px] hover:bg-[#4633DE] flex items-center "
      disabled={pending}
    >
      {pending ? <Spinner /> : 'Save Changes'}
    </Button>
  )
}


function SubmitButton({ name, password, username }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="font-normal min-w-32"
      disabled={!name || !password || !username || pending}
    >
      {pending ? <Spinner /> : "Create"}
    </Button>
  );
}

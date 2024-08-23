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
// import ProfilePicInput from "../profilePicUpload/profilePicUpload";
import { formatDistance } from 'date-fns';

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Spinner from "../dashboard/spinner/spinner";
import ProfilePicInput from "../dashboard/profilePicUpload/profilePicUpload";

const EditTutorProfile = ({tutor}) => {
    const [step, setStep] = useState(1);

  const [profilePic, setProfilePic] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [state, setState] = useState(tutor.state);
  const [city, setCity] = useState(tutor.city);
  const [tutorType, setTutorType] = useState("");
    // Subjects
    const [subjects, setSubjects] = useState(tutor.subjects);


  const [selectedDate, setSelectedDate] = useState(tutor.dob);
  const [inputDate, setInputDate] = useState(tutor.dob);
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
    // console.log(tutor)
    // console.log(State.getStatesOfCountry('IN'))



  const [data, setData] = useState({
    // Define form fields for each step
    name: tutor.name || "",
    username: tutor.username || '',
    email: tutor.email || '',
    contactNo: tutor.contactNo || '',
    dob: selectedDate ,
    password: "",
    address: tutor.address || '',
    state: state,
    city: city,
    pincode: tutor.pincode || '',
    tutorType: tutor.tutorType || '',
    fromClass: tutor.fromClass || '',
    toClass: tutor.toClass || '',
    yearsOfExperience: tutor.yearsOfExperience || '',
    boards: tutor.boards || [],
    qualification: tutor.qualification || [],
    subjects: tutor.subjects || [],
    termsAndConditions: tutor.termsAndConditions,
  });

  console.log(data.name)

  // Board
  const [board, setBoard] = useState(tutor.boards);
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
  const [qualification, setQualification] = useState(tutor.qualification);
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
    console.log(date)
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
    <div className="  w-full px-4 xl:px-12">
    <form
            className=""
            action={async (formData) => {
              //client-side validation or some other things
    
              const result = await updateTutor(formData, data);
              if (result?.err) {
                //show error
                toast({
                  variant: "destructive",
                  title: (
                    <div className="flex gap-2 items-center">
                      <IoWarningOutline className="text-2xl" />
                      {result.err}
                    </div>
                  ),
                  description: " Uh oh! Something went wrong.",
                });
              } else if (result.success) {
                toast({
                  variant: "success2",
                  title: (
                    <div className="flex gap-2 items-center">
                      <IoIosCheckmarkCircleOutline className="text-2xl" />
                      {result.success}
                    </div>
                  ),
                  description: getCurrentTime(),
                });
                // redirect("/dashboard/portfolio");
              }
            }}
          >
          <input type="hidden" name="id" value={tutor._id}/>

            <Tabs defaultValue={step} value={step} className="lg:w-2/33   mx-auto">
              <TabsList className="grid w-full grid-cols-3 h-fit rounded-full gap-2">
                <TabsTrigger
                  value={1}
                  className={cn(
                    "data-[state=active]:bg-gradient-to-r to-blue-300 from-purple-300 bg-green-300 rounded-full"
                  )}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full border  ${step === 1
                        ? "bg-slate-600 border-slate-500 border-2 text-white"
                        : step <= 3
                          ? "bg-green-600 border-green-500 border-2 text-white"
                          : ""
                      }`}
                  >
                    {step >= 2 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      1
                    )}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value={2}
                  className={cn(
                    `data-[state=active]:bg-gradient-to-r to-blue-300 from-purple-300 ${step <= 2
                      ? "bg-slate-200"
                      : step <= 3 ? "bg-green-300" : ""
                    } rounded-full`
                  )}
                >
    
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full border  ${step <= 2
                        ? "bg-slate-600 border-slate-500 border-2 text-white"
                        : step >= 3
                          ? "bg-green-600 border-green-500 border-2 text-white"
                          : ""
                      }`}
                  >
                    {step >= 3 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      2
                    )}
                  </span>
    
                </TabsTrigger>
                <TabsTrigger value={3} className={cn(
                    `data-[state=active]:bg-gradient-to-r to-blue-300 from-purple-300 ${step <= 2
                      ? "bg-slate-200"
                      : step <= 3 ? "bg-green-300" : ""
                    } rounded-full`
                  )}>
                  <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full border  ${step <= 3
                        ? "bg-slate-600 border-slate-500 border-2 text-white"
                        : step >= 3
                          ? "bg-green-600 border-green-500 border-2 text-white"
                          : ""
                      }`}
                  >
                    3
                  </span>
                </TabsTrigger>
              </TabsList>
    
              {/* <--- STEP 1 CONTENT START ---> */}
              <TabsContent value={1}>
                <Card className="h-ful ">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 px-4 md:px-12 mx-auto col-span-2 py-12 items-start gap-8 t-12">
                    <div className="grid items-center  gap-2">
                      <Label
                        htmlFor="name"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Full Name{" "}
                        {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                      </Label>
                      <Input
                        name="name"
                        className=" h-10 md:h-9 "
                        placeholder="John Doe"
                        required
                        value={data.name}
                        onChange={(e) => {
                          e.target.value = e.target.value
                            .replace(/[^a-zA-Z0-9\s]/g, "")
                            .replace(/\b\w/g, (c) => c.toUpperCase());
                          handleChange(e);
                        }}
                      />
                    </div>
    
                    <div className="grid items-center col-span-  gap-2">
                      <Label htmlFor="username" className="text-left font-normal">
                        Username 
                        {/* <span className="text-red-500">*</span> */}
                      </Label>
                      <Input
                        name="username"
                        type="text"
                        className="col-span-3 "
                        placeholder="Johndoe"
                        required
                        value={data.username}
                        onChange={(e) => {
                          e.target.value = e.target.value
                            .toLowerCase()
                            .replace(/\s/g, "");
                            handleChange(e);
                        }}
                      />
                    </div>
    
                    <div className="grid items-center col-span-  gap-2">
                      <Label
                        htmlFor="email"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Email{" "}
                        <span className="text-gray-500 font-normal text-xs">
                          {/* (If any) */}
                        </span>
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        className="h-10 md:h-9"
                        placeholder="email@mail.com"
                        required
                        value={data.email}
                        onChange={(e) => {
                          e.target.value = e.target.value
                            .toLowerCase()
                            .replace(/\s/g, "");
                          handleChange(e);
                        }}
                      />
                    </div>
    
                    <div className="grid items-center  gap-2">
                      <Label
                        htmlFor="contactNo"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Contact No.{" "}
                        {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                      </Label>
                      <Input
                        name="contactNo"
                        className=" h-10 md:h-9 "
                        type="tel"
                        placeholder="01234 56789"
                        required
                        value={data.contactNo}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, "");
                          handleChange(e);
                        }}
                      />
                    </div>
    
                    <div className="grid items-center gap-2">
                      <Label
                        htmlFor="dob"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Date Of Birth
                        {/* <span className="text-gray-500 font-normal text-xs">
                          (Optional)
                        </span> */}
                      </Label>
                      <Popover >
                        <div className="flex border border-input rounded-md shadow-sm relative items-center">
                       
                          <Input
                            name="dob"
                            type="text"
                            // placeholder={selectedDate ? (
                            //   format(selectedDate, "dd-MM-y")
                            // ) : (format(new Date(), 'dd-MM-y'))}
                            value={inputDate
                            }
    
                            onChange={handleDateChange}
                            className={cn(
                              " pl-3 text-left font-normal border-none  shadow-none",
                              !selectedDate && "text-muted-foreground"
                            )}
                          />
                          {/* )} */}
                          <PopoverTrigger asChild className="absolute right-0">
    
                            <Button
                              variant={"none"}
                              className="h-auto w-auto "
                            >
    
                              <CalendarIcon className="ml-auto p-0 h-4 w-4 opacity-50 hover:opacity-70" />
                            </Button>
                          </PopoverTrigger>
                        </div>
    
                        <PopoverContent className="lg:w-auto w-full p-0" align="end">
                          <Calendar
                            mode="single"
                            // selected={selectedDate}
                            // defaultMonth={selectedDate}
                            name="dob"
                            onSelect={handleDaySelect}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          // initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
    
                    <div className=" grid items-center gap-2">
                      <Label htmlFor="password" className="text-left font-normal">
                        Password
                         {/* <span className="text-red-500">*</span> */}
                      </Label>
                      <div className="relative col-span-3">
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="col-span-3 pr-10"
                          placeholder="********"
                          value={data.password}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            const sanitizedValue = value.replace(/\s/g, ''); // Remove spaces
                            setData(prevData => ({
                              ...prevData,
                              [name]: sanitizedValue
                            }));
                          }}
                        />
                        <button
                          className="absolute inset-y-0 right-2 p-1 focus:outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleShowPassword();
                          }}
                        >
                          {showPassword ? (
                            <AiOutlineEyeInvisible className="text-gray-500 text-base" />
                          ) : (
                            <AiOutlineEye className="text-gray-500 text-base" />
                          )}
                        </button>
                      </div>
                    </div>
    
                    <div className="grid col-span-full items-center gap-2">
                      <Label
                        htmlFor="address"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Address
                        {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                      </Label>
                      <Textarea
                        name="address"
                        className=""
                        placeholder="Street, locality, landmark..."
                        type="textarea"
                        rows="4"
                        value={data.address}
                        onChange={(e) => {
                          e.target.value =
                            e.target.value
                              .charAt(0) // Get the first character
                              .toUpperCase() + // Capitalize the first character
                            e.target.value.slice(1); // Append the rest of the string
                          handleChange(e);
                        }}
                      />
                    </div>
    
                    <div className="grid items-center gap-2">
                      <Label
                        htmlFor="state"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        State
                        {/* <span className="text-gray-500 font-normal text-xs">
                          (Optional)
                        </span> */}
                      </Label>
                      <Select
                        name="state"
                        onValueChange={(value) => {
                          setState(value); // Update category state with the new value
                          const e = { target: { name: "state", value: value } }; // Create a synthetic event object
                          handleChange(e); // Call handleChange function with the synthetic event object
                        }}
                        value={data.state}
                      >
                        <SelectTrigger className="w-[180px h-10 md:h-9">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          {State.getStatesOfCountry('IN').map((state, index) => (
                            <SelectItem key={state.name} value={state.isoCode} >
                              {state.name}
                            </SelectItem>
                          ))}
    
                        </SelectContent>
                      </Select>
                    </div>
    
                    <div className="grid items-center gap-2">
                      <Label
                        htmlFor="city"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        City{" "}
                        {/* <span className="text-gray-500 font-normal text-xs">
                          (Optional)
                        </span> */}
                      </Label>
                      <Select
                        name="city"
                        onValueChange={(value) => {
                          setCity(value); // Update category state with the new value
                          const e = { target: { name: "city", value: value } }; // Create a synthetic event object
                          handleChange(e); // Call handleChange function with the synthetic event object
                        }}
                        value={data.city}
                      >
                        <SelectTrigger className="w-[180px h-10 md:h-9">
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                          {City.getCitiesOfState('IN', state).map((city, index) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
    
                        </SelectContent>
                      </Select>
                    </div>
    
                    <div className="grid items-center gap-2">
                      <Label
                        htmlFor="pincode"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Pincode{" "}
                        {/* <span className="text-gray-500 font-normal text-xs">
                          (Optional)
                        </span> */}
                      </Label>
                      <Input
                        name="pincode"
                        type="text"
                        className="h-10 md:h-9"
                        placeholder="012345"
                        required
                        value={data.pincode}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                          handleChange(e);
                        }}
                      />
                    </div>
    
                    {/* Previous and Next buttons */}
                    <div className="flex col-span-full justify-center gap-4">
                      {step !== 1 && (
                        <Button
                          className=" bg-slate-500 hover:bg-slate-600 px-4"
                          type="button"
                          onClick={prevStep}
                        >
                          Previous
                        </Button>
                      )}
                      {step !== 3 ? (
                        <Button
                          className=" bg-slate-700 w-fit hover:bg-slate-600 px-6 flex items-center gap-2 font-normal"
                          type="button"
                          onClick={nextStep}
                        disabled={
                          !data.name || !data.username || !data.email || !data.contactNo || !data.dob || !data.address || !data.state || !data.city || !data.pincode
                        }
                        >
                          Next
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </Button>
                      ) : (
                        <div className="col-span-full">
                          <SubmitButton />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
              {/* <--- STEP 1 CONTENT END ---> */}
    
    
              {/* <--- STEP 2 CONTENT START ---> */}
              <TabsContent value={2}>
                <Card className="h-ful">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 px-4 md:px-12 mx-auto col-span-2 py-12 items-start gap-8 t-12">
                    <div className="grid items-center gap-2">
                      <Label
                        htmlFor="tutorType"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Tutoring Type
                        {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                      </Label>
                      <Select
                        name="tutorType"
                        onValueChange={(value) => {
                          setTutorType(value); // Update tutorType state with the new value
                          const e = { target: { name: "tutorType", value: value } }; // Create a synthetic event object
                          handleChange(e); // Call handleChange function with the synthetic event object
                        }}
                        value={data.tutorType}
                      >
                        <SelectTrigger className="w-[180px h-10 md:h-9">
                          <SelectValue placeholder="Tutoring Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Private Tutor">
                            Private Tutor
                          </SelectItem>
                          <SelectItem value="Coaching Institute">
                            Coaching Institute
                          </SelectItem>
                          <SelectItem value="Online Tutor">Online Tutor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center  gap-2">
                      <div className="grid items-center  gap-2">
                        <Label
                          htmlFor="fromClass"
                          className="text-left font-normal flex items-center justify-between"
                        >
                          From Class
                          {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                        </Label>
                        <Input
                          name="fromClass"
                          className=" h-10 md:h-9 "
                          placeholder="KG"
                          required
                          value={data.fromClass}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/[^a-zA-Z0-9\s]/g, "")
                              .replace(/\b\w/g, (c) => c.toUpperCase());
                            handleChange(e);
                          }}
                        />
                      </div>
    
                      <div className="grid items-center  gap-2">
                        <Label
                          htmlFor="toClass"
                          className="text-left font-normal flex items-center justify-between"
                        >
                          To Class
                          {/* <span className="text-rose-400 font-normal text-xs">
                            *Required
                          </span> */}
                        </Label>
                        <Input
                          name="toClass"
                          className=" h-10 md:h-9 "
                          placeholder="12"
                          required
                          value={data.toClass}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/[^a-zA-Z0-9\s]/g, "")
                              .replace(/\b\w/g, (c) => c.toUpperCase());
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>
    
    
                    <div className="grid items-center  gap-2">
                      <Label
                        htmlFor="yearsOfExperience"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Years Of Experience
                        {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                      </Label>
                      <Input
                        name="yearsOfExperience"
                        className=" h-10 md:h-9 "
                        placeholder="12"
                        required
                        value={data.yearsOfExperience}
                        onChange={(e) => {
                          e.target.value = e.target.value
                          .replace(/[^\d]/g, '');
                          handleChange(e);
                        }}
                      />
                    </div>
    
                    <div className="grid items-center  gap-2">
                      <Label
                        htmlFor="board"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Boards
                        {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                      </Label>
                      {board.map((val, i) => {
                        return (
                          <div className="flex gap-1 items-center relative" key={i}>
                            <Input
                              name="board"
                              className=" h-10 md:h-9 uppercase"
                              placeholder="CBSE"
                              required
                              value={val}
                              onChange={e => handleBoardChange(e, i)}
                            />
                            {i !== 0 && (
                              <button type="button" className="p-1 hover:bg-red-200 rounded-full h-fit transition duration-150 ease-in-out absolute lg:-right-7 right-1" onClick={() => handleBoardDelete(i)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500 hover:text-red-800 transition duration-150 ease-in-out">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                              </button>
                            )}
                          </div>
                        )
                      })}
                      <div className="flex justify-center">
                        <button type="button" className="p-2 bg-gray-100 transition duration-150 ease-in-out text-gray-500 hover:bg-blue-200 hover:text-gray-900 rounded-full" onClick={handleAddBoard}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        </button>
                      </div>
                    </div>
    
                    <div className="grid col-span-full md:col-span-2 items-center  gap-2">
                      <Label
                        htmlFor="name"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Qualification
                        {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                      </Label>
                      {qualification.map((val, i) => {
                        return (
                          <div className="flex gap-1 items-center relative" key={i}>
                            <Input
                              name="qualification"
                              className=" h-10 md:h-9 capitalize"
                              placeholder="B.Ed"
                              required
                              value={val}
                      onChange={e => handleQualificationChange(e, i)}
                            />
                            {i !== 0 && (
                              <button type="button" className="p-1 hover:bg-red-200 rounded-full h-fit transition duration-150 ease-in-out absolute lg:-right-7 right-1" onClick={() => handleQualificationDelete(i)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500 hover:text-red-800 transition duration-150 ease-in-out">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                              </button>
                            )}
                          </div>
                        )
                      })}
                      <div className="flex justify-center">
                        <button type="button" className="p-2 bg-gray-100 transition duration-150 ease-in-out text-gray-500 hover:bg-blue-200 hover:text-gray-900 rounded-full" onClick={handleAddQualification}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        </button>
                      </div>
                    </div>
    
                    <div className="grid items-center col-span-full gap-2 relative">
                      <Label
                        htmlFor="name"
                        className="text-left font-normal flex items-center justify-between"
                      >
                        Subjects
                        {/* <span className="text-rose-400 font-normal text-xs">
                          *Required
                        </span> */}
                      </Label>
                 
                      {subjects.map((subject, index) => {
                        return (
                        <div className="grid grid-cols-4 md:flex items-center gap-2 bg-gray-100 md:bg-white " key={index}>
                          <Input
                            type="text"
                            placeholder="Subject"
                            className=" col-span-full bg-white capitalize"
                            value={subject.subject}
                            onChange={(e) => handleSubjectChange(e.target.value, index, "subject")}
                          />
                          <Input
                            type="text"
                            placeholder="From Class"
                            className="md:max-w-32 col-span-2 bg-white"
                            value={subject.fromClass}
                            onChange={(e) => handleSubjectChange(e.target.value, index, "fromClass")}
                          />
                          <Input
                            type="text"
                            placeholder="To Class"
                            className="md:max-w-32 col-span-2 bg-white"
                            value={subject.toClass}
                            onChange={(e) => handleSubjectChange(e.target.value, index, "toClass")}
                          />
                          {index !== 0 && (
                            // <button type="button" className="p-1 hover:bg-red-200 transition duration-150 ease-in-out rounded-full h-fit  absolute lg:-right-7 right-3 top-9" onClick={() => handleDeleteSubject(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500 hover:text-red-800 transition duration-150 ease-in-out">
                            //   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            // </svg>
                            // </button>

<button type="button" className="p-1 hover:bg-red-200 rounded-full h-fit transition duration-150 ease-in-out absolute lg:-right-7 right-1" onClick={() => handleDeleteSubject(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500 hover:text-red-800 transition duration-150 ease-in-out">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</button>
                          )}
                        </div>
                      )}
                      )}
                      <div className="flex justify-center">
                        <button type="button" className="p-2 bg-gray-100 transition duration-150 ease-in-out text-gray-500 hover:bg-blue-200 hover:text-gray-900 rounded-full" onClick={handleAddSubject}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        </button>
                      </div>
                    </div>
    
                    {/* Previous and Next buttons */}
                    <div className="flex col-span-full justify-center gap-4">
                      {step !== 1 && (
                        <Button
                          className=" bg-slate-500 hover:bg-slate-600 px-4"
                          type="button"
                          onClick={prevStep}
                        >
                          Previous
                        </Button>
                      )}
                      {step !== 3 ? (
                        <Button
                          className=" bg-slate-700 w-fit hover:bg-slate-600 px-6 flex items-center gap-2 font-normal"
                          type="button"
                          onClick={nextStep}
                          disabled={
                            !data.tutorType || !data.fromClass || !data.toClass || !data.yearsOfExperience 
                          }
                        >
                          Next
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </Button>
                      ) : (
                        <div className="col-span-full">
                          <SubmitButton />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
              {/* <--- STEP 2 CONTENT END ---> */}
    
    
              {/* <--- STEP 3 CONTENT START ---> */}
              <TabsContent value={3}>
                <Card>
                  <div className="grid py-12  items-start gap-8">
                    <div className="grid items-center gap-2">
                      <div className="flex items-center w-full h-full justify-center  space-x-">
                        <div className="relative w-2/5 gap-6 grid h-full">
                          <Label
                            htmlFor="profilePic"
                            className="text-left  flex items-center justify-between  font-normal"
                          >
                            Profile Pic
                            <span className="text-gray-500 font-light">
                              {" "}
                              (Optional)
                            </span>
                          </Label>
    
                          <ProfilePicInput prev={tutor.img}/>
                        </div>
                      </div>
                    </div>
    
                    {/* <div className="w-full flex flex-col items-center justify-center gap-2 ">
                      <div className="items-top flex space-x-2">
                        <Checkbox id="terms1" name="termsAndConditions" checked={data.termsAndConditions} onCheckedChange={handleTermsAndConditionsChange}
    />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Accept terms and conditions
                          </label>
                          <p className="text-sm text-muted-foreground">
                            You agree to our Terms of Service and Privacy Policy.
                          </p>
                        </div>
                      </div>
                    </div> */}
    
                    {/* Previous and Next buttons */}
                    <div className="flex col-span-full items-center w-full px-4 md:px-0 md:w-2/5 mx-auto justify-between gap-4">
                      {step !== 1 && (
                        <Button
                          className=" bg-slate-500 min-w-32 hover:bg-slate-600 px-4 font-normal"
                          type="button"
                          onClick={prevStep}
                        >
                          Previous
                        </Button>
                      )}
                      {step !== 3 ? (
                        <Button
                          className=" bg-slate-700 min-w-32 hover:bg-slate-600 px-4 flex items-center gap-2 font-normal"
                          type="button"
                          onClick={nextStep}
                        >
                          Next
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </Button>
                      ) : (
                        <div className="col-span-full">
                
    <SubmitButton
                            name={data.name}
                            username={data.username}
                          />
                          
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
              {/* <--- STEP 3 CONTENT END ---> */}
    
            </Tabs>
          </form>
</div>    
  )
}

export default EditTutorProfile

function SubmitButton({ name, username }) {
    const { pending } = useFormStatus();
  
    return (
      
      <Button
        type="submit"
        className="font-normal min-w-32"
        disabled={!name || !username || pending}
      >
        {pending ? <Spinner /> : "Save Changes"}
      </Button>
    );
  }
"use client";

import { addUser } from "@/app/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AvatarInput from "@/app/ui/dashboard/avatarUpload/avatarUpload";

import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { getCurrentTime } from "@/app/lib/utils";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormStatus } from 'react-dom'
import Spinner from "../spinner/spinner";


const AddUserForm = () => {
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <div>
      <form
        className=""
        action={async (formData) => {
          //client-side validation or some other things

          const result = await addUser(formData);
          if (result?.err) {
            //show error
            toast({
              variant: "destructive",
              title: (
                <div className="flex gap-2 items-center">
                  <IoWarningOutline className="text-2xl" />
                 { result.err} 
                </div>
              ),
              description:" Uh oh! Something went wrong.",
            });
          } else if (result.success){
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
            redirect("/dashboard/users");
          }
        }}
      >
        <div className="grid gap-4 py-4 mb-8">
          <div className="grid grid-cols-3 items-center gap-4">
            <AvatarInput />
            <div className="grid grid-cols-2 items-center col-span-2 lg:col-span-2 gap-4">
              <div className="grid items-center col-span-  gap-2">
                <Label htmlFor="name" className="text-left font-normal">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="name"
                  className="col-span-3  "
                  placeholder="John Doe"
                  required
                  // pattern="[A-Za-z\s]+"
                  // pattern="^[A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)*$"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\b\w/g, c => c.toUpperCase());
                  }}
                />
                
              </div>
              <div className="grid items-center col-span-  gap-2">
                <Label htmlFor="username" className="text-left font-normal">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="username"
                  type="text"
                  className="col-span-3 "
                  placeholder="Johndoe"
                  required
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .toLowerCase()
                      .replace(/\s/g, "");
                  }}
                />
              </div>
           
              <div className="grid items-center gap-2">
                <Label htmlFor="email" className="text-left font-normal">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="email"
                  type="email"
                  className="col-span-3"
                  placeholder="example@email.com"
                  required
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .toLowerCase()
                      .replace(/\s/g, "");
                  }}
                />
              </div>
              <div className="grid grid-cols- items-center gap-4">
                <div className="grid items-center gap-2">
                  <Label htmlFor="phone" className="text-left font-normal">
                    Phone
                  </Label>
                  <Input
                    name="phone"
                    type="tel"
                    className="col-span-3"
                    placeholder="123-456-7890"
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="address" className="text-left font-normal">
              Address
            </Label>
            <Textarea
              name="address"
              className="col-span-3"
              placeholder="123 Main Street, City, State, Zip Code"
              type="textarea"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\b\w/g, (c) =>
                  c.toUpperCase()
                );
              }}
            />
          </div>
          <div className="grid lg:grid-cols-3 items-start gap-4">
            <div className="grid items-center  gap-2">
              <Label htmlFor="role" className="text-left font-normal">
                Role
              </Label>
              <Select name="isAdmin" defaultValue="false">
                <SelectTrigger className="w-[180px">
                  <SelectValue placeholder="User Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Admin</SelectItem>
                  <SelectItem value="false">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <div className="col-span-full grid items-center gap-2">
                <Label htmlFor="password" className="text-left font-normal">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative col-span-3">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="col-span-3 pr-10"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    className="absolute inset-y-0 right-2 p-1 focus:outline-none"
                    tabindex="-1"
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
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <div className="col-span-full grid items-center gap-2">
                <Label htmlFor="password" className="text-left font-normal">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative col-span-3">
                  <Input
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`col-span-3 pr-10 ${
                      !passwordMatch && password && confirmPassword
                        ? "focus-visible:ring-red-500 border-red-500"
                        : ""
                    }${
                      passwordMatch
                        ? "focus-visible:ring-green-500 border-red-5"
                        : ""
                    } `}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <button
                    className="absolute inset-y-0 right-2 p-1 focus:outline-none"
                    tabindex="-1"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleShowConfirmPassword();
                    }}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-500 text-base" />
                    ) : (
                      <AiOutlineEye className="text-gray-500 text-base" />
                    )}
                  </button>
                </div>
                {!passwordMatch && password && confirmPassword && (
                  <div className="text-red-500 text-sm text-start  lg:text-center col-span-3">
                    Passwords do not match
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <Button
            type="submit"
            className="mt-4 "
            disabled={!passwordMatch || !password || !confirmPassword}
          >
              {pending ? <span className="sr-only">Loading...</span> : "Create"}
          </Button> */}
          <SubmitButton passwordMatch={passwordMatch} password={password} confirmPassword={confirmPassword}/>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;


function SubmitButton({passwordMatch, password, confirmPassword}) {
  const { pending } = useFormStatus()

  return (
    // <button
    //   disabled={pending}
    //   className='rounded-lg bg-black py-2 text-white disabled:cursor-not-allowed disabled:opacity-50'
    // >
      
    // </button>
     <Button
     type="submit"
     className="mt-4  hover:bg-gray-700 "
     disabled={!passwordMatch || !password || !confirmPassword || pending}
   >
       {pending ?  <Spinner />  : 'Create'}
   </Button>
  )
}
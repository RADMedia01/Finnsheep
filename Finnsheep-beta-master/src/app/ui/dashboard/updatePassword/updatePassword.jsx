"use client"

import {
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/app/lib/actions";
import { useToast } from "@/components/ui/use-toast"
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { getCurrentTime } from '@/app/lib/utils';
import { redirect } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import Spinner from "../spinner/spinner";
import { useFormStatus } from 'react-dom'


const UpdatePasswordForm = ({id}) => {
    const { toast } = useToast()
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
         <form action={async (formData) => {
        //client-side validation or some other things

        const result = await updateUser(formData);
        if(result?.err) {
            //show error
              toast({
                variant: "destructive",
                title: <div className="flex gap-2 items-center"><IoWarningOutline className="text-2xl"/>Uh oh! Something went wrong.</div>,
                description: result.err,
              })
        } else {
            toast({
                variant: "success2",
            title: <div className="flex gap-2 items-center"><IoIosCheckmarkCircleOutline className="text-2xl"/>Bingo! User password updated successfully!</div>,
          description: getCurrentTime(),
              });
              redirect("/dashboard/users");
        }
    }}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          <input type="hidden" name="id" value={id}/>

            <Label htmlFor="password" className="text-left">
              Password
            </Label>
            {/* <Input name="password" type="password" className="col-span-3" /> */}
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-password" className="text-right text-nowrap">
              Confirm Password  
            </Label>
            {/* <Input name="confirm-password" type="password" className="col-span-3" /> */}
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
                  <div className="text-red-500 text-sm text-start  lg:text-center col-span-full">
                    Passwords do not match
                  </div>
                )}
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
          <SubmitButton passwordMatch={passwordMatch} password={password} confirmPassword={confirmPassword}/>
        </DialogFooter>
        </form>
    </div>
  )
}

export default UpdatePasswordForm


function SubmitButton({passwordMatch, password, confirmPassword}) {
  const { pending } = useFormStatus()

  return (
     <Button
     type="submit"
     className="mt-4 w-28"
     disabled={!passwordMatch || !password || !confirmPassword || pending}
   >
       {pending ?  <Spinner />  : 'Save changes'}
   </Button>
  )
}
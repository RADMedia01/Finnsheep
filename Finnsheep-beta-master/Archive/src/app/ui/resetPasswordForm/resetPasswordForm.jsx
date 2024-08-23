"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { resetPassword } from "@/app/lib/accountRecovery";

const ResetPasswordForm = ({resetToken}) => {

    const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordMatch, setNewPasswordMatch] = useState(true);
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value !== confirmNewPassword) {
      setNewPasswordMatch(false);
    } else {
      setNewPasswordMatch(true);
    }
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    if (e.target.value !== newPassword) {
      setNewPasswordMatch(false);
    } else {
      setNewPasswordMatch(true);
    }
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handlePasswordResetForm = async (e) => {
    e.preventDefault();
    await resetPassword({newPassword, confirmNewPassword, resetToken})
  }

  return (
    <form onSubmit={handlePasswordResetForm}>
         <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          {/* <input type="hidden" name="id" value={id}/> */}

            <Label htmlFor="password" className="text-left">
              Password
            </Label>
            {/* <Input name="password" type="password" className="col-span-3" /> */}
            <div className="relative col-span-3">
                  <Input
                    name="password"
                    type={showNewPassword ? "text" : "password"}
                    className="col-span-3 pr-10"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  <span
                    className="absolute flex items-center inset-y-0 right-2 p-1 focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleShowNewPassword();
                    }}
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-500 text-base" />
                    ) : (
                      <AiOutlineEye className="text-gray-500 text-base" />
                    )}
                  </span>
                </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-password" className="text-left text-nowrap">
              Confirm Password  
            </Label>
            <div className="relative  col-span-3">
                  <Input
                    name="confirm-password"
                    type={showConfirmNewPassword ? "text" : "password"}
                    className={`col-span-3 pr-10 ${
                      !newPasswordMatch && newPassword && confirmNewPassword
                        ? "focus-visible:ring-red-500 border-red-500"
                        : ""
                    }${
                      newPasswordMatch
                        ? "focus-visible:ring-green-500 border-red-5"
                        : ""
                    } `}
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                  />
                  <span
                    className="absolute flex items-center  inset-y-0 right-2 p-1 focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleShowConfirmNewPassword();
                    }}
                  >
                    {showConfirmNewPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-500 text-base" />
                    ) : (
                      <AiOutlineEye className="text-gray-500 text-base" />
                    )}
                  </span>
                </div>
                {!newPasswordMatch && newPassword && confirmNewPassword && (
                  <div className="text-red-500 text-sm text-start  lg:text-center col-span-full">
                    Passwords do not match
                  </div>
                )}
          </div>
        </div>
        <SubmitButton type="submit" newPasswordMatch={newPasswordMatch} newPassword={newPassword} confirmNewPassword={confirmNewPassword}/>
    </form>
  )
}

export default ResetPasswordForm

function SubmitButton({passwordMatch, password, confirmPassword}) {
    // const { pending } = useFormStatus()
  
    return (
       <Button
       type="submit"
       className="mt-4 w-full"
    //    disabled={!passwordMatch || !password || !confirmPassword || pending}
     >
         {/* {pending ?  <Spinner />  : 'Save changes'} */}
         Reset
     </Button>
    )
  }
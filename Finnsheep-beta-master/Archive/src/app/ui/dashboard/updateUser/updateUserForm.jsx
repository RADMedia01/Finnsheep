"use client"

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/app/lib/actions";

import { useToast } from "@/components/ui/use-toast"
import { redirect } from "next/navigation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { getCurrentTime } from '@/app/lib/utils';
import AvatarInput from "../avatarUpload/avatarUpload";
import { formatDistance } from 'date-fns';
import Spinner from "../spinner/spinner";
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button";


const UpdateUserForm = ({user}) => {

    const { toast } = useToast()


  return (
    <div className="lg:h-screen flex items-center">
      

        <form className="w-full pt-4 py-20" action={async (formData) => {
        //client-side validation or some other things

        const result = await updateUser(formData);
        if(result?.err) {
            //show error
              toast({
                variant: "destructive",
                title: <div className="flex gap-2 items-center"><IoWarningOutline className="text-2xl"/> { result.err} </div>,
                description: " Uh oh! Something went wrong.",
              })
        } else if (result.success) {
            toast({
                variant: "success2",
            title: <div className="flex gap-2 items-center"><IoIosCheckmarkCircleOutline className="text-2xl"/>{result.success}</div>,
          description: getCurrentTime(),
              });
              redirect("/dashboard/users");
        }
    }}>
 
      <div className="lg:pt-[86px lg:h-full  p-3 px-4 lg:px-8 flex justify-center items-center flex-col ">
        
        <div className="grid grid-cols- md:grid-cols-4 gap-6 w-full px-4 py-6 sm:p-12 bg-slate-100 rounded-3xl ">
          {/* <Image
            src="/noavatar.png"
            alt=""
            width={200}
            height={200}
            className="border rounded-3xl mb-6 lg:mb-0  outline outline-2 outline-blue-500 outline-offset-8 grid justify-self-center self-center object-cover"
          /> */}

          <AvatarInput prev={user.img} className="h-36 w-36"/>

          <div className=" col-span-1 md:col-span-3 grid sm:grid-cols-2 gap-6">
          <input type="hidden" name="id" value={user._id}/>
            <div className="grid col-span-1  items-center gap-2">
              <Label htmlFor="username" className="text-left">
                Username:
              </Label>
              <Input name="username" className="bg-white" placeholder={user.username} onChange={(e) => {
                    e.target.value = e.target.value
                      .toLowerCase()
                      .replace(/\s/g, "");
                  }}/>
            </div>
            <div className="grid col-span-1  items-center gap-2">
              <Label htmlFor="name" className="text-left">
                Full Name:
              </Label>
              <Input name="name" className="bg-white" placeholder={user.name} onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\b\w/g, c => c.toUpperCase());
                  }}/>
            </div>
            <div className="grid col-span-1 items-center gap-2">
              <Label htmlFor="username" className="text-left">
                Email:
              </Label>
              <Input
                name="email"
                type="email"
                className="bg-white"
                placeholder={user.email}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .toLowerCase()
                    .replace(/\s/g, "");
                }}
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="phone" className="text-left">
                Phone No.:
              </Label>
              <Input
                name="phone"
                type="tel"
                className="bg-white"
                placeholder={user.phone}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            </div>
            <div className="grid items-center col-span-full gap-2">
              <Label htmlFor="address" className="text-left">
                Address:
              </Label>
              <Textarea
                name="address"
                className="bg-white"
                placeholder={user.address}
                rows="5"
                type="textarea"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\b\w/g, (c) =>
                    c.toUpperCase()
                  );
                }}
              />
            </div>
          </div>
            <div className="flex items-center col-span-full justify-between w-full gap-4 text-sm py-2  ">
        <span className=""> Last updated: {user.updatedAt ? formatDistance(new Date(user.updatedAt), new Date(), { addSuffix: true, roundingMethod: 'floor' }) : "N/A"}</span>
        <UpdateButton/>
        </div>

        </div>
      </div>
      </form>
    </div>
  )
}

export default UpdateUserForm


function UpdateButton() {
  const { pending } = useFormStatus()

  return (
     <Button
     type="submit"
     className="bg-blue-600 text-nowrap text-xs w-28 px-3 py-2  text-white h-[38px] hover:bg-blue-700 flex items-center "
     disabled={ pending}
   >
       {pending ?  <Spinner />  : 'Save Changes'}
   </Button>
  )
}
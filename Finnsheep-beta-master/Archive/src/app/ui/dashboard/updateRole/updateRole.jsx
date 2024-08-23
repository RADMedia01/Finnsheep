"use client"
// import { useMediaQuery } from 'react-responsive'
import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { redirect } from "next/navigation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { getCurrentTime } from '@/app/lib/utils';
import { useFormStatus } from 'react-dom'


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { updateUser } from "@/app/lib/actions";
import Spinner from "../spinner/spinner";
  

const UpdateRole = ({id, isAdmin}) => {
    const [open, setOpen] = useState(false)
    const isDesktop = window.matchMedia('(min-width: 768px)');


   
    if (isDesktop.matches) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
          <button className="inline-block py-1.5 w-full px-4 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-normal text-left">Manage Role</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Manage Role</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <ProfileForm id={id} isAdmin={isAdmin}/>
          </DialogContent>
        </Dialog>
      )
    }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <button className="inline-block py-1.5 w-full px-4 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-normal text-left">Manage Role</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Manage Role</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" id={id} isAdmin={isAdmin}/>
        <DrawerFooter className="pt-2 pb-12">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default UpdateRole

function ProfileForm({id, isAdmin}) {
    console.log(isAdmin)

    const { toast } = useToast()

    return (
      <form className="grid items-start p-4 lg:p-0 gap-4" action={async (formData) => {
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
            title: <div className="flex gap-2 items-center"><IoIosCheckmarkCircleOutline className="text-2xl"/>Bingo! User role updated successfully!</div>,
          description: getCurrentTime(),
              });
              redirect("/dashboard/users");
        }
    }}>
        <div className="grid gap-2">
          <Label htmlFor="email">User Role</Label>
          {/* <Input type="email" id="email" defaultValue="shadcn@example.com" /> */}
          <input type="hidden" name="id" value={id}/>
          <Select name="isAdmin">
      <SelectTrigger className="w-[180px">
        <SelectValue placeholder={isAdmin? "Admin" : "Client"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="true">Admin</SelectItem>
          <SelectItem value="false">Client</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
     
        {/* <Button type="submit">Save changes</Button> */}
        <UpdateButton />
      </form>
    )
  }

  function UpdateButton() {
    const { pending } = useFormStatus()
  
    return (
       <Button
       type="submit"
       className="mt-4"
    //    className=" w- px-3 py-2    "
       disabled={ pending}
     >
         {pending ?  <Spinner />  : 'Save Changes'}
     </Button>
    )
  }
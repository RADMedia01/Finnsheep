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
import { updateStatus, updateUser } from "@/app/lib/actions";
import Spinner from "../dashboard/spinner/spinner";
// import Spinner from "../spinner/spinner";
// import { Spinner } from '@/app/ui/dashboard/spinner/spinner';
  

const UpdateStatus = ({id, status}) => {
    const [open, setOpen] = useState(false)
    const isDesktop = window.matchMedia('(min-width: 768px)');


   
    if (isDesktop.matches) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
          <button className="inline-block py-1.5 w-full px-4 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-normal text-left">Update Status</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Status</DialogTitle>
              <DialogDescription>
                Make changes to enquiry status here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <ProfileForm id={id} status={status}/>
          </DialogContent>
        </Dialog>
      )
    }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <button className="inline-block py-1.5 w-full px-4 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-normal text-left">Update Status</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update Status</DrawerTitle>
          <DrawerDescription>
          Make changes to enquiry status here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" id={id} status={status}/>
        <DrawerFooter className="pt-2 pb-12">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default UpdateStatus

function ProfileForm({id, status}) {
    console.log(status)

    const { toast } = useToast()

    return (
      <form className="grid items-start p-4 lg:p-0 gap-4" action={async (formData) => {
        //client-side validation or some other things

        const result = await updateStatus(formData);
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
            title: <div className="flex gap-2 items-center"><IoIosCheckmarkCircleOutline className="text-2xl"/>Bingo! Enquiry status updated successfully!</div>,
          description: getCurrentTime(),
              });
              redirect("/dashboard/enquiries");
        }
    }}>
        <div className="grid gap-2">
          <Label htmlFor="status">Enquiry Status</Label>
          {/* <Input type="email" id="email" defaultValue="shadcn@example.com" /> */}
          <input type="hidden" name="id" value={id}/>
          <Select name="status">
      <SelectTrigger className="w-[180px">
        <SelectValue 
        placeholder={status} 
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Progress</SelectLabel>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Complete">Complete</SelectItem>
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
    const { pending } = useFormStatus();
  
    return (
      <Button type="submit" className="mt-4" disabled={pending}>
        {pending ? <Spinner /> : "Save Changes"}
      </Button>
    );
  }
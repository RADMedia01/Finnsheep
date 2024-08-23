"use client"
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
  import { Button } from "@/components/ui/button"
  import React, { useState, useEffect } from 'react';

const Instructions = () => {

  const [open, setOpen] = useState();

  useEffect(() => {
    if (open === undefined) {
      const timeoutId = setTimeout(() => {
        setOpen(true);
      }, 1000); // Delay for one second
  
      // Clear the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [open]);


  return (
    <>
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-fit pr-2 px-4 flex gap-2 border-gray-900 border rounded-full font-normal text-sm h-fit">View Instructions</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Instructions!</AlertDialogTitle>
          <AlertDialogDescription>
            Some Instructions here before filling the form, please read them carefully.
            <br/>
            <br/>
            <ul className="list-disc list-inside space-y-1">
            <li>Please fill out all required fields marked with an asterisk (*).</li>
            <li>Ensure that the information provided is accurate and up-to-date.</li>
            <li>Double-check your email address and phone number for correctness.</li>
            <li>Provide detailed information about your qualifications and experience.</li>
            <li>If you have any questions, please contact our support team.</li>
          </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default Instructions
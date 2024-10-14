"use client"
import Image from "next/image";
// import { auth, signOut } from "@/app/auth";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";




const LoggedUser = () => {
  const { data: session } = useSession()
  console.log(session)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className=" flex items-center gap-2 p-0.5 focus:outline-none hover:ring-indigo-200  hover:ring-2 ease-in-out duration-300 borde border-indigo-300 rounded-full">
          <span className="bg-indigo-100/50 rounded-full p-0.5">
            <Image
              src={session?.user?.image || "/noavatar.svg"}
              alt=""
              width="40"
              height="40"
              style={{
                width: "40px",
                height: "40px",
              }}
              className="object-cover border  rounded-full"
            />
          </span>
          <div className=" flex-col hidden lg:flex">
            <span className="font-medium text-sm flex gap-2 items-center">{session?.user?.name || "Guest"}
            </span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
          <IoIosArrowDown className="pr-2 text-2xl hidden lg:block" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuSeparator />

        <button className="w-full " onClick={() => signOut({ callbackUrl: '/' })}>
          <DropdownMenuItem className="cursor-pointer text-red-600" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-log-out h-4 w-4 mr-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
            Log out
          </DropdownMenuItem></button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LoggedUser
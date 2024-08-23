
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
import LoggedUser from "../../loggedUser/loggedUser";
import Search from "../search/search";
import PageTitle from "./pageTitle";



const Navbar = async () => {


  return (
    <div className="h-20 lg:h-20 flex lg:flex lg:fixed top-0 right-0 w-full outline-none bg-white shadow px-4 py-6 sm:px-12 z-20 lg:pl-[256px]  justify-between items-center">
      {/* <Search/> */}
      <PageTitle/>
     <LoggedUser/>
    

    </div>
  )
}

export default Navbar



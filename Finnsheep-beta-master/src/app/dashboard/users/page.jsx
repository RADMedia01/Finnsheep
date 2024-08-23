import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import Link from "next/link";
import { fetchUsers } from "@/app/lib/data";
import Image from "next/image";
import Search from "@/app/ui/dashboard/search/search";
import PaginationComponent from "@/app/ui/dashboard/pagination/pagination";
import AvatarInput from "@/app/ui/dashboard/avatarUpload/avatarUpload";
import { addUser, deleteUser, updateUser } from "@/app/lib/actions";
import { Badge } from "@/components/ui/badge";
import { formatDistanceStrict } from "date-fns";

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
} from "@/components/ui/alert-dialog";
import DeleteUserForm from "@/app/ui/dashboard/deleteUser/deleteUserForm";
import UpdatePasswordForm from "@/app/ui/dashboard/updatePassword/updatePassword";
import UpdateRole from "@/app/ui/dashboard/updateRole/updateRole";
import { Suspense } from "react";
import UsersTable from "@/app/ui/dashboard/usersTable/usersTable";
// import Loading from "./loading";
import Loading from "../loading";

import DownloadCsv from "@/app/ui/dashboard/downloadCsv/downloadCsv";



const UsersPage = async ({ searchParams }) => {

 
  return (
    <div className="min-h-[93vh] ">
      <div className="lg:pt-[86px] py-[70px lg:h-ful h-[83v flex  flex-col p- ">
        <div className="px-4 py-4 sm:px-12 flex flex-row justify-between items-center">
        {/* <form action={async () => {
        "use server";
        await downloadCsvServerAction("User");
      }}>
         <button >
          Download CSV
         </button>
         </form> */}
            <Search />
          <div className="flex gap-2 items-center  ">
        <DownloadCsv/>

            <Link
              href="/dashboard/users/add"
              className="bg-[#523EF3 bg-blue-600 text-nowrap text-xs rounded-md px-3 py-2  text-white h-[38px] hover:bg-[#4633DE hover:bg-blue-700 flex items-center"
            >
              <div className="pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 13.36 13.36"
                >
                  <path
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                    d="M.65 6.68h12.06M6.68.65v12.06"
                    data-name="plus-large-svgrepo-com (2)"
                  ></path>
                </svg>
              </div>
              Add User
            </Link>
          </div>
        </div>
        <div className=" w-full">
              <Suspense fallback={<Loading/>}>
                <UsersTable searchParams={searchParams}/>
              </Suspense>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

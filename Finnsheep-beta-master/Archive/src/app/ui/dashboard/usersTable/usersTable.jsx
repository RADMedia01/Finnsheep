import { fetchUsers } from '@/app/lib/data';
import React from 'react'
import UpdateRole from '../updateRole/updateRole';
import DeleteUserForm from '../deleteUser/deleteUserForm';
import PaginationComponent from '../pagination/pagination';
import Link from 'next/link';
import { formatDistanceStrict } from 'date-fns';
import Image from 'next/image';

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
import UpdatePasswordForm from '../updatePassword/updatePassword';
import { Badge } from '@/components/ui/badge';



const UsersTable = async ({ searchParams }) => {

    const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, users } = await fetchUsers(q, page);


  return (
    <div className="px-4 pt-2 pb-6 sm:px-12 ">
    <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px">Name</TableHead>
            <TableHead className="hidden lg:table-cell">
              Email
            </TableHead>
            <TableHead>Roles</TableHead>
            <TableHead className="hidden lg:table-cell">
              Created At
            </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} className="">
              <TableCell className="lg:flex items-center gap-2">
                <Image
                  src={user.img || "/noavatar.svg"}
                  alt=""
                  width={50}
                  height={50}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  className="object-cover border aspect-w-1 aspect-h-1 hidden lg:block rounded-full"
                />
                {user.name}
              </TableCell>
              <TableCell className="no-underline hidden lg:table-cell text-dec">
                {user.email}
              </TableCell>
              <TableCell className=" font-normal">
                <Badge variant={user.isAdmin ? "admin" : "client"}>
                  {user.isAdmin ? "Admin" : "Client"}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {user.createdAt
                  ? formatDistanceStrict(
                      new Date(user.createdAt),
                      new Date(),
                      { addSuffix: true, roundingMethod: "floor" }
                    )
                  : "N/A"}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-end">
                  <div className="relative ml-3 flex w-10 align-end">
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-dark hover:bg-gray-100 hover:shadow focus:outline-none font-medium rounded-lg text-sm px-2 py-1.5  transition  duration-300 ease-in-out">
                            <span className="text-md"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
</svg>
</span>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="text-sm ">
                          <Link
                            href={`/dashboard/users/${user._id}`}
                            className="inline-block py-1.5 w-full px-4 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-normal text-left"
                          >
                            Edit
                          </Link>
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="inline-block py-1.5 w-full px-4 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-normal text-left">
                                Update Password
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Update password
                                </DialogTitle>
                                <DialogDescription>
                                  {
                                    "Update the password for this user here. Click save when you're done."
                                  }
                                </DialogDescription>
                              </DialogHeader>
                              <UpdatePasswordForm
                                id={user._id.toString()}
                              />
                            </DialogContent>
                          </Dialog>

                          <UpdateRole
                            id={user._id.toString()}
                            isAdmin={user.isAdmin}
                          />

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="inline-block py-1.5 w-full px-4 text-sm border-none text-black hover:text-black hover:bg-gray-50 font-normal text-left">
                                {" "}
                                Delete
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {
                                    "This action cannot be undone. This will permanently delete this user and remove it's data from our servers."
                                  }
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Cancel
                                </AlertDialogCancel>
                                {/* <AlertDialogAction> */}
                                <DeleteUserForm
                                  userId={user.id.toString()}
                                />

                                {/* </AlertDialogAction> */}
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
    <div className="">
      <PaginationComponent count={count} perPage={8}/>
    </div>
  </div>
  )
}

export default UsersTable
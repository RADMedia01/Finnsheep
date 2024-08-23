
import React from 'react'
// import UpdateRole from '../updateRole/updateRole';
// import DeleteUserForm from '../deleteUser/deleteUserForm';
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
// import UpdatePasswordForm from '../updatePassword/updatePassword';
import { Badge } from '@/components/ui/badge';
import PaginationComponent from '../dashboard/pagination/pagination';
import { fetchProducts } from '@/app/lib/data';



const ProductsTable = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
  
    const { count, products } = await fetchProducts(q, page);

    // console.log(count)

  return (
    <div className="px-4 pt-2 pb-6 sm:px-12 ">
    <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px">Product</TableHead>
            <TableHead className="hidden lg:table-cell">
              Stock
            </TableHead>
            <TableHead >Price</TableHead>
            <TableHead >Category</TableHead>
            <TableHead className="hidden lg:table-cell">
              Created At
            </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {tutors.filter(tutor => tutor.tutorType === "Private Tutor").map((tutor) => ( */}
          {products.map((product) => (
            <TableRow key={product._id} className="">
              <TableCell className="lg:flex items-center gap-2">
                <Image
                  src={product.thumbnail || "/noImage.svg"}
                  alt=""
                  width={50}
                  height={50}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  className="object-cover border aspect-w-1 aspect-h-1 hidden lg:block rounded-md"
                />
                {product.name}
              </TableCell>
              <TableCell className="no-underline hidden lg:table-cell text-dec">
                {product.stock}
              </TableCell>
              <TableCell className="no-underline hidde lg:table-cel text-dec">
                ${product.price}
              </TableCell>
              <TableCell className=" font-normal">
                {/* <Badge 
                className={`w-fit text-nowrap shadow-sm shadow-gray-200  font-normal ${
                  product.category === "Honey"
                    ? "bg-lime-200 hover:border-lime-300 hover:bg-lime-300 text-gray-900 "
                    : product.category === "Wool"
                    ? "bg-emerald-200 hover:border-emerald-300 hover:bg-emerald-300 text-gray-900 "
                    : product.category === "Lamb"
                    ? "bg-red-200 hover:border-red-300 hover:bg-red-300 text-gray-900 "
                    : product.category === "Chocolate"
                    ? "bg-orange-200 hover:border-orange-300 hover:bg-orange-300 text-gray-900 "
                    : product.category === "Yarn"
                    ? "bg-amber-200 hover:border-amber-300 hover:bg-amber-300 text-gray-900 "
                    : product.category === "Fleece"
                    ? "bg-teal-200 hover:border-orange-300 hover:bg-orange-300 text-gray-900 "
                    : product.category === "Sock"
                    ? "bg-sky-200 hover:border-sky-300 hover:bg-sky-300 text-gray-900 "
                    : ""
                }`}
                >
                 {product.category === "Wool" ? "Wool" : product.category === "Honey" ? "Honey" : product.category === "Lamb" ? "Lamb" : product.category === "Yarn" ? "Yarn" : product.category === "Chocolate" ? "Chocolate" : product.category === "Sock" ? "Sock" : product.category === "Fleece" ? "Fleece" : ""}

                </Badge> */}
                { product.categoryName}
                {/* {tutor.tutorType === "Online Tutor"
                    ? "Online Tutor" : ""} */}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {product.createdAt
                  ? formatDistanceStrict(
                      new Date(product.createdAt),
                      new Date(),
                      { addSuffix: true, roundingMethod: "floor" }
                    )
                  : "N/A"}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-end">
                  <div className="relative ml-3 flex w-10 align-end">
                    <div>
           
                          <button className="text-dark hover:bg-gray-100 hover:shadow  focus:outline-none font-medium rounded-lg text-sm px-2 py-1.5 transition  duration-300 ease-in-out">
                            <span className="text-md"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
</svg>
</span>
                          </button>
                 
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
    <div className="">
      <PaginationComponent count={count} perPage={3}/>
    </div>
  </div>
  )
}

export default ProductsTable
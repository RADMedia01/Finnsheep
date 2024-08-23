import { fetchCategories } from "@/app/lib/data";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


  
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatDistanceStrict } from "date-fns";
  

const CategoryTable = async({searchParams}) => {


    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
  
    const { count, categories } = await fetchCategories(q, page);


  return (
    <div>

 {/* <div className="h-[80vh] relative overflow-hidden flex flex-col"> */}

 
{/* <Card className="h-[80vh] relative overflow-hidden flex flex-col">
  <CardHeader>
    <CardTitle>Categories</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent className="relative h-full pb-8"> */}
 {/* <div className="md:absolute top-0 bottom- left-4 right-2  overflow-y-auto custom-scrollbar md:pr-2 "> */}

 <div className="px-4 pt-2 pb-6 sm:px-12 ">
 <Table className="relative">
      <TableCaption>A list of all categories.</TableCaption>
      <TableHeader className="sticky w-full top-0 bg-blue-100 z-20">
        <TableRow>
          {/* <TableHead className="w-[100px]">#</TableHead> */}
          <TableHead className="w-[100px">Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-center hidden md:flex items-center">Created At</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="pr-2">
        {categories.map((category, i) => (
          <TableRow key={category._id}>
            {/* <TableCell className="font-medium text-left">{i+1}</TableCell> */}
            <TableCell className="font-medium text-left">{category.name}</TableCell>
            <TableCell className="text-left text-wrap"> {category.description}</TableCell>
            <TableCell className="hidden md:block ">{category.createdAt
                  ? formatDistanceStrict(
                      new Date(category.createdAt),
                      new Date(),
                      { addSuffix: true, roundingMethod: "floor" }
                    )
                  : "N/A"}</TableCell>
            <TableCell className="text-right pr-2">{category.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
 </div>
  {/* </CardContent>
  <CardFooter className="bg-indigo-200 absolute bottom-0 w-full">
    <p>Card Footer</p>
  </CardFooter> 
</Card> */}



    </div>
    // </div>
  )
}

export default CategoryTable
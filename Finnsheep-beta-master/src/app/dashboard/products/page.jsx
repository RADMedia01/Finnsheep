import Search from "@/app/ui/dashboard/search/search";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "../loading";
import ProductsTable from "@/app/ui/productsTable/productsTable";


const ProductsPage = ({searchParams}) => {
  return (
    <div className="min-h-[93vh]  ">
    <div className="lg:pt-[86px] py-[70px lg:h-ful h-[83v flex  flex-col p- ">
      <div className="px-4 py-4 sm:px-12 flex flex-row justify-between items-center gap-2">
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
      {/* <DownloadCsv/> */}

        <Link href="/dashboard/products/category"
            className="bg-[#523EF3 bg-gray-600 text-nowrap text-xs rounded-md px-3 py-2  text-white h-[38px] hover:bg-[#4633DE hover:bg-blue-00 flex items-center">
        Categories
        </Link>

          <Link
            href="/dashboard/products/add"
            className="bg-[#523EF3 bg-blue-600 text-nowrap text-xs rounded-md px-3 py-2  text-white h-[38px] hover:bg-[#4633DE hover:bg-blue-00 flex items-center"
          >
            <div className="md:pr-2">
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
             <span className="hidden md:block">Add Product</span>
          </Link>
        </div>
      </div>
      <div className=" w-full">
            <Suspense fallback={<Loading/>}>
              <ProductsTable searchParams={searchParams}/>
            </Suspense>
      </div>
    </div>
  </div>
  )
}

export default ProductsPage
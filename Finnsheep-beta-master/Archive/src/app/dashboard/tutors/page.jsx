import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import { Suspense } from "react";
import UsersTable from "@/app/ui/dashboard/usersTable/usersTable";
import TutorsTable from "@/app/ui/tutorsTable/tutorsTable";
import DownloadCsv from "@/app/ui/dashboard/downloadCsv/downloadCsv";
import Loading from "../loading";
// import Loading from "./loading";

const TutorsPage = ({searchParams}) => {
  
  return (
    <div className="min-h-[93vh]  ">
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
            className="bg-[#523EF3 bg-indigo-500 text-nowrap text-xs rounded-md px-3 py-2  text-white h-[38px] hover:bg-[#4633DE hover:bg-indigo-600 flex items-center"
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
            Add Tutor
          </Link>
        </div>
      </div>
      <div className=" w-full">
            <Suspense fallback={<Loading/>}>
              <TutorsTable searchParams={searchParams}/>
            </Suspense>
      </div>
    </div>
  </div>
  )
}

export default TutorsPage
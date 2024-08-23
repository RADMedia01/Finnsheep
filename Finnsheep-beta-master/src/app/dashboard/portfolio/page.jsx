import Portfolio from '@/app/ui/dashboard/portfolio/portfolio'
import Search from '@/app/ui/dashboard/search/search'
import { Button } from "@/components/ui/button"
import Link from "next/link";

const PortfolioPage = ({ searchParams }) => {
  return (
    <div className="lg:py-[86px] pb-[70px] px-6 sm:px-12 lg:h-full ">
    <div className="py-4 flex justify-between items-center ">
            <Search />
            <Link href="/dashboard/portfolio/add">
            <Button className="font-normal flex items-center gap-2 text-sm bg-slate-700 rounded-md"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hidden lg:block">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>

            New Project</Button>
            </Link>
    </div>


      <Portfolio searchParams={searchParams}/>
    </div>
  )
}

export default PortfolioPage
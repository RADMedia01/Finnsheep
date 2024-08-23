"use client"

import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import { usePathname, useRouter, useSearchParams } from "next/navigation";
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
  } from "@radix-ui/react-icons"
  

const PaginationComponent = ({count, perPage}) => {

    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathName = usePathname();

    const page = searchParams.get("page") || 1;


    const params = new  URLSearchParams(searchParams);
    const ITEM_PER_PAGE = perPage
    const totalPages = Math.ceil(count / ITEM_PER_PAGE);

    const hasPrev = ITEM_PER_PAGE * (parseInt(page)-1) > 0
    const hasNext = ITEM_PER_PAGE * (parseInt(page)-1) + ITEM_PER_PAGE  < count

    const handleChangePage = (type)=> {
        type === "prev"
        ? params.set("page", parseInt(page)-1) 
        : params.set("page", parseInt(page)+1)
        replace(`${pathName}?${params}`)
    }

    const handleChangePageNo = (pageNumber) => {
        params.set("page", pageNumber);
        replace(`${pathName}?${params}`);
    }

    console.log(count)


  return (
    <div>
         <Pagination >
      <PaginationContent className="justify-between w-full mt-4">
        <PaginationItem>
          <PaginationPrevious  disabled className={!hasPrev ? 'opacity-50 pointer-events-none' : ''} onClick={()=>handleChangePage("prev")}/>
        </PaginationItem>

      
        <PaginationItem>
          <PaginationNext disabled={!hasNext} className={!hasNext ? 'opacity-50 pointer-events-none' : ''} onClick={()=>handleChangePage("next")}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>

  
    </div>
  )
}

export default PaginationComponent

{/* <PaginationItem>
<PaginationLink href="#">1</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationLink href="#" isActive>
  2
</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationLink href="#">3</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationEllipsis />
</PaginationItem>  */}


  {/* <div className="">
        <Button disabled className="gap-1 pl-2.5">
        <ChevronLeftIcon className="h-4 w-4" />
    <span>Previous</span>
        </Button>

        <Button disabled className="gap-1 pr-2.5">
        <ChevronRightIcon className="h-4 w-4" />
    <span>Next</span>
        </Button>
    </div> */}
"use client"

import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


const Search = () => {
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathName = usePathname();
    console.log(pathName)

    const handleSearch = useDebouncedCallback((e) => {
        const params = new  URLSearchParams(searchParams);
        
        params.set("page", 1)


        if(e.target.value){
            e.target.value.length > 2 && params.set("q", e.target.value)
        } else{
            params.delete("q")
        }
        replace(`${pathName}?${params}`)
    },300);



  return (
    <div className="relative right-0 justify-end">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {/* <IoIosSearch className="text-gray-400" /> */}
      <IoIosSearch className="text-lg"/>
    </div>
    {/* <input
      type="text"
      className="block w-full pl-10 py-2 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      placeholder="Search..."
    /> */}
     <Input id="search" className="block w-48 lg:w-72  pl-10 py-2 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 "  placeholder="Search..." onChange={handleSearch}/>
  </div>
  )
}

export default Search
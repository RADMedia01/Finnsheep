"use client"

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const MenuLink = ({item}) => {
  
  const pathname = usePathname();
  const id = useParams().id;

  return (
    <Link href={item.path} className={`flex px-2 h-10 items-center gap-2 text-sm text-[#363A43 text-white font-normal hover:bg-[#EFF0FA hover:bg-gray-700  my-1 rounded-lg ${pathname === item.path && "bg-[#EFF0FA bg-gray-700  text-[#4F3BF3] text-whit"} ${pathname === item.subPath || pathname === `${item.path}/${id}` || pathname === `${item.path}/${id}/edit-profile` ? "bg-[#EFF0FA bg-gray-700  text-[#4F3BF3] text-whit" : ""}  ${pathname === 'dashboard' && "bg-[#EFF0FA bg-gray-700  text-[#4F3BF3] text-whit"}`}>
        {/* {item.icon} */}
        {item.title}
    </Link>
  )
}

export default MenuLink
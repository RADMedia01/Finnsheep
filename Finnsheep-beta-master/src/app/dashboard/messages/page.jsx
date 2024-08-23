import MessagesTable from '@/app/ui/dashboard/messagesTable/messagesTable'
import Search from '@/app/ui/dashboard/search/search'
import React from 'react'

const MessagesPage = ({ searchParams }) => {
  return (
   <div className="lg:py-[86px] pb-[70px] px-6 sm:px-12 min-h-screen ">
    <div className="py-4 flex justify-between items-center ">
        <Search/>
      </div>
        <MessagesTable searchParams={searchParams}/>
    </div>
  )
}

export default MessagesPage
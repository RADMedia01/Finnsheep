import { updateOpened } from '@/app/lib/actions';
import { fetchMessage } from '@/app/lib/data';
import React from 'react'

const MessagePage = async({ params }) => {
    const { id } = params;
    const message = await fetchMessage(id);

    if (  !message.isOpened) {
      // Update the message's isOpened field in the database
      await updateOpened(id, { isOpened: true });
  }
  return (
    <div className="lg:pt-[90px] lg:min-h-screen h-full px-4"> 

    
    <div className="grid items-center  justify-center lg:px-8 gap-4 grid-cols-2">
        <div className="items-center">
          <p className="text-sm text-slate-500"> Name:</p>
          <div  className='border rounded-xl p-2 w-full'>{message.name}</div>
        </div>

        <div className="items-center">
        <p className="text-sm text-slate-500"> Email:</p>
          {message.email}
        </div>

        <div className="items-center">
        <p className="text-sm text-slate-500"> Contact No.:</p>
          {message.contactNo}
        </div>

        <div className="items-center">
        <p className="text-sm text-slate-500"> Subject:</p>
          {message.subject}
        </div>

        <div className="items-center col-span-full">
        <p className="text-sm text-slate-500"> Message:</p>
          {message.message}
        </div>
    </div>
    </div>
  )
}

export default MessagePage
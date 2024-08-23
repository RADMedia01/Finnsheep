import { fetchMessages } from "@/app/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, isThisYear, isBefore, formatDistanceStrict } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { markImportant, } from "@/app/lib/actions";
import MarkImportant from "../markImportant/markImportant";
import DeleteMessageForm from "../deleteMessage/deleteMessageForm";



const MessagesTable = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, messages } = await fetchMessages(q, page);

  const formattedDate = (date) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    if (isBefore(new Date(date), twoDaysAgo)) {
      // Older than 2 days, format as "MMM d, h:mm a"
      return format(
        new Date(date),
        isThisYear(date) ? "MMM d, h:mm a" : "MMM d, yyyy, h:mm a"
      );
    } else {
      // Not older than 2 days, format as relative time with suffix
      return formatDistanceStrict(new Date(date), new Date(), {
        addSuffix: true,
        roundingMethod: "floor",
      });
    }
  };
  return (
    <div className="  pb-6  bg-gray-100 rounded-2xl p-4 shadow">
{/* <div className="grid grid-cols-2 sticky top-[100px] bg-gray-200 justify-between px-4 mb-1 py-2">
<div className=" py-2 ">From</div>
<div className=" py-2  text-end">Action</div>
</div> */}


  {messages && messages.length > 0 ?  (
<div className="max-h-[70vh]  overflow-scroll overscroll-contain  rounded-2xl  space-y-0.5">
      
      {messages.map((message) => (
        // <Link href={`/dashboard/messages/${message._id}`}>
      <div key={message.id} className={`grid grid-cols-2 justify-between border-b py-2 px-4 pr-4 hover:bg-gray-00 cursor-pointer transition ease-in-out duration-300 ${!message.isOpened?"bg-white rounded-xl shadow":""}`}>
      {/* <div className="grid justify-items-start justify-start gap-1">{index+1}</div> */}

        <div className="grid items-center justify-items-start py-2 gap-1">
          <div className="flex items-center gap-2">
          <h4 className={`text-base font-normal text-gray-600 ${!message.isOpened?"text-gray-900 font-semibold":""}`}>Message from {message.name} </h4>
         

<TooltipProvider>
      <Tooltip >
        <TooltipTrigger asChild >
         <MarkImportant markedImportant={message.isImportant} id={message.id}/>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Mark as Important</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

          </div>
          
          <div className="grid items-center justify-start gap-1 mt-1.5 text-sm text-gray-500">
            <span className={`flex items-center gap-1.5 font-normal text-sm ${!message.isOpened?"text-gray-700":""}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z" clipRule="evenodd" />
</svg>
{message.email}
</span>
<span className={`flex items-center gap-1.5 font-normal text-sm ${!message.isOpened?"text-gray-700":""}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
</svg>

{message.contactNo}
</span>
          </div>
        </div>

        <div className="grid items-center justify-end">
        <span className="grid grid-flow-col gap-4 items-center justify-end">
                  {!message.isOpened ? (
                    <>
                      <Badge className="bg-rose-100 hover:bg-rose-200 text-rose-800  shadow-none border-rose-500 px-4 py-0.5">
                        New
                      </Badge>{" "}
                    </>
                  ) : (
                    ""
                  )}



<Popover>
                  <PopoverTrigger asChild>
                  <button className="text-dark hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-2 py-1.5 shadow">
                    <span className="text-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="text-sm rounded-lg w-fit"
                    side="bottom"
                    align="end"
                  >
                    <div>
                      <Link
                        href={`/dashboard/messages/${message.id}`}
                        className="flex items-center gap-2 py-1.5 w-full px-4 pr-6 text-sm border-none text-gray-900 hover:text-gray-900 hover:bg-gray-50 font-normal text-left"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 p-0.5 bg-slate-100 rounded-full border border-slate-200 text-slate-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                        View/Edit
                      </Link>
                    </div>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className=" py-1.5 w-full flex items-center gap-2 px-4 pr-6 text-sm border-none outline-none text-gray-900 hover:text-slate-900 hover:bg-red-50 font-normal text-left">
                            
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 p-0.5 bg-red-100 rounded-full border border-red-200 text-red-600"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                            Delete
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {
                                "This action cannot be undone. This will permanently delete this project and remove it's data from our servers."
                              }
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <DeleteMessageForm
                                  messageId={message._id.toString()}
                                />
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </PopoverContent>
                </Popover>


                  {/* <button className="text-dark hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-2 py-1.5 shadow">
                    <span className="text-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button> */}
                </span>
                <div>
                <span className="flex items-center gap-1 text-slate-500 text-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                  {formattedDate(message.createdAt)}
</span>
                </div>
        </div>
        
      </div>
      // </Link>
        ))}
      </div>) : (<div className="mx-2 py-8 w-full grid justify-items-center ">
      <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
      <div className="text-sm text-[#00000040]">No Data</div>
      </div>)
      }
    </div>
  );
};

export default MessagesTable;

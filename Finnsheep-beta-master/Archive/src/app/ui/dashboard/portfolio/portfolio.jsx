// "use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { fetchPortfolios } from "@/app/lib/data";
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
import PaginationComponent from "../pagination/pagination";
import DeletePortfolioForm from "../deletePortfolio/deletePortfolioForm";


const Portfolio = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, portfolios } = await fetchPortfolios(q, page);
  console.log(portfolios);
  return (
    <>
      <div >
        {portfolios && portfolios.length > 0 ? (
          <div >
            <div className=" pt-2 pb-6  grid  sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
              {portfolios.map((portfolio) => (
                <Card
                  className="w-[350px overflow-hidden h-fit p-2 rounded-[24px] transition duration-300 ease-in-out hover:scale-[102%] "
                  key={portfolio._id}
                >
                  <Image
                    src={portfolio.thumbnail ? portfolio.thumbnail : "/Frame.svg"}
                    alt="Thumbnail"
                    width="300"
                    height="300"
                    className="w-full inner-shadow rounded-[16px] aspect-[5/3] object-cover"
                  />

                  <div className="py-4 px-2 flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-4">
                      <CardTitle className="leading-snug font-medium line-clamp-1 select-none text-gray-700">
                        {portfolio.projectName}
                      </CardTitle>


                      <Popover>
                        <PopoverTrigger asChild>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 p-0.5 bg-slate-50 rounded-full border border-slate-200 transition duration-300 ease-in-out hover:scale-125  hover:text-whie hover:border-gray-300 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                            />
                          </svg>
                        </PopoverTrigger>
                        <PopoverContent
                          className="text-sm rounded-lg w-fit"
                          side="bottom"
                          align="end"
                        >
                          <div>
                            <Link
                              href={`/dashboard/portfolio/${portfolio.id}`}
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
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 p-0.5 bg-red-100 rounded-full border border-red-200 text-red-600"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
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
                                  <DeletePortfolioForm
                                    portfolioId={portfolio._id.toString()}
                                  />
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex justify-between items-center gap-1.5">
                      {/* <CardDescription >Deploy your new project in one-click.</CardDescription> */}
                      <Badge
                        className={`w-fit text-nowrap shadow-sm shadow-gray-200  font-normal ${portfolio.category === "Web Development"
                          ? "bg-lime-200 hover:border-lime-300 hover:bg-lime-300 text-gray-900 "
                          : portfolio.category === "Website Development"
                            ? "bg-emerald-200 hover:border-emerald-300 hover:bg-emerald-300 text-gray-900 "
                            : portfolio.category === "SEO"
                              ? "bg-amber-200 hover:border-amber-300 hover:bg-amber-300 text-gray-900 "
                              : portfolio.category === "Social Media"
                                ? "bg-cyan-200 hover:border-cyan-300 hover:bg-cyan-300 text-gray-900 "
                                : portfolio.category === "Graphics Design"
                                  ? "bg-fuchsia-200 hover:border-fuchsia-300 hover:bg-fuchsia-300 text-gray-900 "
                                  : ""
                          }`}
                      >
                        {portfolio.category}
                      </Badge>

                      <p className="text-sm text-gray-600/90 hover:text-gray-800/90 font-normal flex items-center gap-1 cursor-pointer">
                        View Project{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </p>
                      {/* {portfolio.projectUrl && (
  <a href={portfolio.projectUrl} target="_blank" rel="noopener noreferrer" className="text-xs">
    View Project
  </a>
)} */}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className=" gap-1.5">
              <PaginationComponent count={count} perPage={9} />
            </div>
          </div>
        ) : (
          <div className="mx-2 py-8 w-full grid justify-items-center ">
            <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
            <div className="text-sm text-[#00000040]">No Data</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;

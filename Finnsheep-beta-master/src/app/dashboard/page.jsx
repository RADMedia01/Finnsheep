import { Button } from "@/components/ui/button"
import LoggedUser from "../ui/loggedUser/loggedUser"

const Dashboard = () => {
  return (
    <div className="min-h-[93vh] flex items-center justify-center ">
      {/* <header className="bg-white shadow lg:fixed top-0 left-0 right-0 lg:ml-[256px] z-10 lg:pt-0 pt-[60px]">
                    <div className="px-4 py-7 sm:px-12 flex flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                        <LoggedUser/>
                    </div>
                </header> */}
      <div className="lg:pt-[86px] lg:h-full h-[83vh] flex justify-center items-center flex-col p-3 text-center">
      <span class="text-[14px] font-medium  text-[#363A43]">Widgets will be shown here.</span>
      {/* <span class="text-[14px] font-medium  text-[#363A43]">There are no widgets to show anything</span> */}
      <span class="text-[12px] font-normal text-gray-[#363A43 pt-2 text-center mx-[20px]"> Widgets to see analytics based on any collections you have created</span>
      </div>
    </div>
  )
}

export default Dashboard
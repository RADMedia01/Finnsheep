import AddPortfolioForm from '@/app/ui/dashboard/addPortfolio/addPortfolioForm'
import React from 'react'


const AddPortfolio = () => {
  return (
    <div className="lg:pt-[86px] lg:min-h-screen h-full  text-center">
    <div className=" w-full my-4 lg:my-2 px-6 lg:px-0 ">
        {/* <div className="px-6 py-6 sm:px-12"> */}
         <AddPortfolioForm/>
    {/* </div> */}
    </div>
    </div>
  )
}

export default AddPortfolio
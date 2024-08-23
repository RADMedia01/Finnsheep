import AddCategoryForm from '@/app/ui/dashboard/addCategory/addCategoryForm'
import React from 'react'

const AddCategory = () => {
  return (
    <div className="lg:pt-[86px] lg:min-h-screen h-full  text-center">
    <div className=" w-full my-4 lg:my-2 px-6 lg:px-0 flex justify-center">
         <AddCategoryForm/>
    </div>
    </div>
  )
}

export default AddCategory
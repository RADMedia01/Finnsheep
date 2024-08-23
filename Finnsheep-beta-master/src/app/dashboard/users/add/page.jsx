import AddUserForm from "@/app/ui/dashboard/addUser/addUserForm"


const AddUser = () => {
    
  

  return (
    <div className="h-scree ">
    {/* <header className="bg-white shadow lg:flex px-2 top-0 left-0 right-0  z-10 lg:mt-[86px] pt-[60px">
    <div className="px-4 py-6 sm:px-12 flex flex-col justify-between items-left">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
       Create User
      </h1>
      <span className="text-sm text-gray-500">Create user profile here. Click create when you are done.</span>

      
    </div>
  </header> */}
    <div className="lg:pt-[86px] lg:h-full h-[83vh]  text-center">
    <div className=" w-full mt-4">
        <div className="px-6 py-6 sm:px-12">
         <AddUserForm/>
    </div>
    </div>
    </div>
    </div>
  )
}

export default AddUser
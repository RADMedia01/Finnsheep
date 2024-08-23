"use client"
import { usePathname } from 'next/navigation'

const PageTitle = () => {
    const pathname = usePathname();
    console.log(pathname)

    const getTitle = () => {
      if (pathname === '/dashboard/users/add') return "Create User";
      if (pathname === '/dashboard') return "Dashboard";
      if (pathname === '/dashboard/users') return "Users";
      if (pathname.startsWith('/dashboard/users/')) return "Edit User Information";
      if (pathname.startsWith('/dashboard/users/')) return "Edit User";
      if (pathname === '/dashboard/portfolio/add') return "Create Project";
      if (pathname === '/dashboard/portfolio') return "Project Portfolio";
      if (pathname.startsWith('/dashboard/portfolio/') ) return "Edit Project Portfolio";
      if (pathname.startsWith('/dashboard/portfolio/')) return "Edit Project";
      if (pathname === '/dashboard/products') return "Products";

      if (pathname === '/dashboard/messages') return "Messages";
      if (pathname === '/dashboard/tutors') return "Tutors";
      if (pathname.startsWith('/dashboard/tutors/') && pathname.endsWith('/edit-profile')) return "Edit Tutor Profile";
      if (pathname.startsWith('/dashboard/tutors/')) return "Tutor Profile";
      if (pathname === '/dashboard/enquiries') return "Enquiries";
      if (pathname === '/dashboard/products/category') return "Categories";
      return "";
    };
    
    const title = getTitle();

  return (
    <div className="px-4 py-6  border-l lg:border-none ml-14 lg:ml-0 sm:px-12 flex flex-col justify-between items-left">
    <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900">
     
     {/* {pathname === '/dashboard/users/add'? "Create User" : pathname === '/dashboard'? "Dashboard" : pathname === '/dashboard/users'? "Users" : pathname.startsWith('/dashboard/users/') ? "Edit User Information" : pathname === '/dashboard/portfolio/add'? "Create Project" : pathname === '/dashboard/portfolio'? "Project Portfolio" : pathname.startsWith('/dashboard/portfolio/') ? "Edit Project Portfolio"  : pathname === '/dashboard/messages'? "Messages" : pathname === '/dashboard/tutors'? "Tutors" : pathname.startsWith('/dashboard/tutors/') ? "Tutor Profile" : pathname.startsWith('/dashboard/tutors/') && pathname.endsWith('/edit-profile') ? "Edit Tutor Profile" :""} */}
      {title}
    </h1>
    <span className="text-sm text-gray-500 hidden lg:block">
    {pathname === '/dashboard/users/add'? "Create user profile here. Click create when you are done." : ""}
        </span>

    
  </div>
  )
}

export default PageTitle




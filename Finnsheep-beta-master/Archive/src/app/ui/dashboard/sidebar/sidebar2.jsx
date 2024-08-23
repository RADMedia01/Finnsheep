import React from 'react'
import MenuLink from './menuLink/menuLink';



const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          // icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          // icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Products",
          path: "/dashboard/products",
          // icon: <MdShoppingBag />,
        },
        {
          title: "Services",
          path: "/dashboard/transactions",
          // icon: <MdAttachMoney />,
        },
        {
          title: "Portfolio",
          path: "/dashboard/transactions",
          // icon: <MdAttachMoney />,
        },
        {
          title: "Contact",
          path: "/dashboard/transactions",
          // icon: <MdAttachMoney />,
        },
      ],
    },
    // {
    //   title: "Analytics",
    //   list: [
    //     {
    //       title: "Revenue",
    //       path: "/dashboard/revenue",
    //       icon: <MdWork />,
    //     },
    //     {
    //       title: "Reports",
    //       path: "/dashboard/reports",
    //       icon: <MdAnalytics />,
    //     },
    //     {
    //       title: "Teams",
    //       path: "/dashboard/teams",
    //       icon: <MdPeople />,
    //     },
    //   ],
    // },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          // icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          // icon: <MdHelpCenter />,
        },
      ],
    },
  ];

const Sidebar2 = () => {
  return (
    <div className="h-screen lg:fixed top-0 left-0 lg:w-64 bg-white">
      <div className="relative z-30 lg:h-full border-b bg-gray-200">
          <div className="px-6 md:px-0  lg:mx-auto  ">
            <div className="flex w-full items-center justify-between">
      
              <div className="flex items-center justify-star border-r lg:border-r-0">
                <input type="checkbox" name="hamburger" id="hamburger" className="peer" hidden/>
                <label for="hamburger" className="peer-checked:hamburger block relative z-20 p-6 -ml-6 cursor-pointer lg:hidden">
                  <div aria-hidden="true" className="m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
                  <div aria-hidden="true" className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
                </label>
  
                <div className="peer-checked:translate-x-0 fixed inset-0 w-[calc(100%-6.5rem)] translate-x-[-100%] z-10  border-r shadow-xl transition duration-300 lg:border-r-0 lg:w-full lg:static lg:shadow-none lg:translate-x-0">
                  <div className="flex flex-col h-ful justify-between lg:items-center lg:flex-row">
               
                    <ul className="h-[66vh flex-1 p-4 pt-20">
            {menuItems.map((cat) => (
              <li key={cat.title} >
                <span className="font-bold text-sm mx-2 text-">{cat.title}</span>
                {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </li>
            ))}
          </ul>
  
                    {/* <div className="border-t py-8 px-6 md:px-12 md:py-16 lg:border-t-0 lg:border-l lg:py-0 lg:pr-0 lg:pl-6">
                      <a href="#" className="block px-6 py-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-400 text-center text-white">
                        Get started
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
  )
}

export default Sidebar2
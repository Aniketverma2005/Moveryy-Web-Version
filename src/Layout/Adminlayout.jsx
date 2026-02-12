import React from 'react'
import Sidebar from '../Pages/Admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
function AdminLayout() {
  return (

    <div className="flex flex-col xl:flex-row min-h-screen">
  <Sidebar />
  <main className="flex-1 xl:mt-0 bg-gray-100 ">
    <Outlet />
  </main>
</div>
    // <div className='flex w-full'>
    //     <Sidebar/>
    //     <Outlet/>

      
    // </div>
  )
}

export default AdminLayout

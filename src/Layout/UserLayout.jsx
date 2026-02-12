import React from 'react'
import UserNavbar from '../Pages/User/Header'
import { Outlet } from 'react-router-dom'
function UserLayout() {
  return (
    <div>
        <UserNavbar/>
        <Outlet/>
      
      
    </div>
  )
}

export default UserLayout

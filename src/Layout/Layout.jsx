import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Page/Navbar/Navbar.jsx'

const Layout = () => {
  return (
    <>

    <Outlet/>
    <Navbar/>
      
    </>
  )
}

export default Layout

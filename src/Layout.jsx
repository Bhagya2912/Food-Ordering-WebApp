import React from 'react'
import Header from './components/Header/Header'

import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

function Layout() {
  return (
    <>
      <ScrollToTop /> {/* Add it here inside Router context */}
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout;

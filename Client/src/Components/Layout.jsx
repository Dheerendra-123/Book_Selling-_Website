import React from 'react'
import Navbar from '../Components/Nabar'
import { Outlet, useLocation } from 'react-router-dom'
const Layout = () => {
  const location = useLocation();

  const hideNavbarPaths = ['/home','/','/not-allowed'];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout
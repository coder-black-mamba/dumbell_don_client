import React from 'react'
import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function BaseLayout() {
  return (
    <div >
        <NavBar/>
      <Outlet />    
      <Footer/>
    </div>
  );
}

export default BaseLayout;
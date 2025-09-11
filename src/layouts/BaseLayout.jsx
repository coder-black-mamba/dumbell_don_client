import React from 'react'
import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';

function BaseLayout() {
  return (
    <div >
        <NavBar/>
      <Outlet />    
    </div>
  );
}

export default BaseLayout;
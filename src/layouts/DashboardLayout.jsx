import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router';
import Logo from '../assets/logo_white.png';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    membership: 'Premium',
    membershipExpiry: '2023-12-31',
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // Class helper
  const linkClass = ({ isActive }) =>
    `w-full text-left px-4 py-2 rounded-md ${
      isActive ? 'bg-brand/10 text-brand font-medium' : 'text-gray-300 hover:bg-base-100'
    }`;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-base-300 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-gray-600 hover:text-gray-900 sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <NavLink to="/" className="flex items-center">
              <img src={Logo} alt="DuBell Don" className="h-16" />
            </NavLink>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {userData.name.split(' ')[0]}</span>
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
              <FaSignOutAlt className="mr-1" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div 
            className={`fixed md:static inset-y-0 left-0 z-20 transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-56 flex-shrink-0 bg-base-300 md:bg-transparent h-screen md:h-auto overflow-y-auto sidebar`}
          >
            <nav className="space-y-1 flex flex-col bg-base-300 p-4 rounded h-full">
              <NavLink to="/user/dashboard" end className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/user/classes" className={linkClass}>
                Classes
              </NavLink>
              <NavLink to="/user/attendence" className={linkClass}>
                Attendence
              </NavLink>
              <NavLink to="/user/profile" className={linkClass}>
                My Profile
              </NavLink>
              <NavLink to="/user/invoices" className={linkClass}>
                Invoices
              </NavLink>
              <NavLink to="/user/payments" className={linkClass}>
                Payments
              </NavLink>
              <NavLink to="/user/stats" className={linkClass}>
                Stats
              </NavLink>
              {/* Add more NavLinks here as needed */}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

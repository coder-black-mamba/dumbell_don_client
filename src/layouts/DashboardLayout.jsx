import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    membership: 'Premium',
    membershipExpiry: '2023-12-31',
  };

  // Class helper
  const linkClass = ({ isActive }) =>
    `w-full text-left px-4 py-2 rounded-md ${
      isActive ? 'bg-brand/10 text-brand font-medium' : 'text-gray-300 hover:bg-base-100'
    }`;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-base-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dumbbell Don</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {userData.name.split(' ')[0]}</span>
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
              <FaSignOutAlt className="mr-1" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 ">
          {/* Sidebar */}
          <div className="md:w-56 flex-shrink-0">
            <nav className="space-y-1 flex flex-col bg-base-300 p-4 rounded ">
              <NavLink to="/dashboard" end className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/dashboard/profile" className={linkClass}>
                My Profile
              </NavLink>
              <NavLink to="/dashboard/classes" className={linkClass}>
                Classes
              </NavLink>
              <NavLink to="/dashboard/invoices" className={linkClass}>
                Invoices
              </NavLink>
              <NavLink to="/dashboard/stats" className={linkClass}>
                Stats
              </NavLink>
              <NavLink to="/dashboard/payments" className={linkClass}>
                Payments
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

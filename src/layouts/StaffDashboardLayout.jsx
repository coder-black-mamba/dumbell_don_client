import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  FaClipboardCheck,
  FaUsers,
  FaDumbbell,
  FaCalendarAlt,
  FaIdCard,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaComments,
  FaUserCog,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const StaffDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname;
  const { user } = useAuth();
  // console.log(activeTab);
  //   const [activeTab, setActiveTab] = useState('/staff');\
  // console.log(location.pathname);
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/staff/dashboard" },
    {
      name: "Attendance",
      icon: <FaClipboardCheck />,
      path: "/staff/attendance",
    },
    { name: "Classes", icon: <FaDumbbell />, path: "/staff/classes" },
    { name: "Bookings", icon: <FaCalendarAlt />, path: "/staff/bookings" },
    { name: "Members", icon: <FaUsers />, path: "/staff/members" },
    { name: "Memberships", icon: <FaIdCard />, path: "/staff/memberships" },
    { name: "Feedback", icon: <FaComments />, path: "/staff/feedback" },
    { name: "Profile", icon: <FaUserCog />, path: "/staff/profile" },

  ];

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/logout");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-75 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-800 text-gray-200 transition duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          <h1 className="text-xl font-bold">Staff Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white lg:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path} className="mb-1">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeTab === item.path
                      ? "bg-brand text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-gray-400 hover:text-white lg:hidden"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-xl font-semibold text-white">
              {menuItems.find((item) => item.path === activeTab)?.name ||
                "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
                <span className="mr-2">{user?.first_name} {user?.last_name} - {user?.role}</span>
                <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center text-white">
                  {user?.first_name?.charAt(0).toUpperCase()}{user?.last_name?.charAt(0).toUpperCase()}
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboardLayout;

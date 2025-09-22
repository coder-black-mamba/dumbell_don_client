import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  FaUsers,
  FaDumbbell,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaUserCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaFileInvoiceDollar,
  FaClipboardCheck,
  FaComments,
  FaIdCard,
  FaFileInvoice,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState('dashboard');
  const activeTab = location.pathname;

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Plans", icon: <FaIdCard />, path: "/admin/plans" },
    { name: "Classes", icon: <FaDumbbell />, path: "/admin/classes" },
    { name: "Bookings", icon: <FaCalendarAlt />, path: "/admin/bookings" },
    {
      name: "Attendance",
      icon: <FaClipboardCheck />,
      path: "/admin/attendance",
    },
    { name: "Payments", icon: <FaMoneyBillWave />, path: "/admin/payments" },
    {
      name: "Invoices",
      icon: <FaFileInvoiceDollar />,
      path: "/admin/invoices",
    },
    { name: "Feedback", icon: <FaComments />, path: "/admin/feedback" },
    { name: "Reports", icon: <FaChartBar />, path: "/admin/reports" },
    { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
  ];

  console.log(activeTab);

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login");
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
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-800 text-gray-200 transition duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          <h1 className="text-xl font-bold">Dumbell Don ADMIN</h1>
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
                    activeTab.toLowerCase().includes(item.path.toLowerCase())
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
                <span className="mr-2">Admin User</span>
                <div className="h-8 w-8 rounded-full bg-brand-dark flex items-center justify-center text-white">
                  AU
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

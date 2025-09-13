import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import {
  FaUsers,
  FaDumbbell,
  FaClipboardList,
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
  FaCog
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/admin' },
    { name: 'Users', icon: <FaUsers />, path: '/admin/users' },
    { name: 'Memberships', icon: <FaIdCard />, path: '/admin/memberships' },
    { name: 'Classes', icon: <FaDumbbell />, path: '/admin/classes' },
    { name: 'Bookings', icon: <FaCalendarAlt />, path: '/admin/bookings' },
    { name: 'Attendance', icon: <FaClipboardCheck />, path: '/admin/attendance' },
    { name: 'Payments', icon: <FaMoneyBillWave />, path: '/admin/payments' },
    { name: 'Invoices', icon: <FaFileInvoiceDollar />, path: '/admin/invoices' },
    { name: 'Feedback', icon: <FaComments />, path: '/admin/feedback' },
    { name: 'Reports', icon: <FaChartBar />, path: '/admin/reports' },
    { name: 'Settings', icon: <FaCog />, path: '/admin/settings' },
  ];

  useEffect(() => {
    // Set active tab based on current path
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.path);
    } else {
      setActiveTab('/admin');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
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
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          <h1 className="text-xl font-bold">GymAdmin Pro</h1>
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
                      ? 'bg-brand-dark text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => {
                    setActiveTab(item.path);
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
              {menuItems.find((item) => item.path === activeTab)?.name || 'Dashboard'}
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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Dashboard Overview */}
            {activeTab === '/admin' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-brand transition-colors">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-lg bg-brand p-3">
                          <FaUsers className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="ml-4 sm:ml-5 min-w-0 flex-1">
                          <dl>
                            <dt className="truncate text-xs sm:text-sm font-medium text-gray-400">Total Members</dt>
                            <dd>
                              <div className="text-base sm:text-lg font-semibold text-white">1,234</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-red-500/50 transition-colors">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-lg bg-red-900/30 p-3 text-red-400">
                          <FaMoneyBillWave className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="ml-4 sm:ml-5 min-w-0 flex-1">
                          <dl>
                            <dt className="truncate text-xs sm:text-sm font-medium text-gray-400">Monthly Revenue</dt>
                            <dd>
                              <div className="text-base sm:text-lg font-semibold text-white">$24,567</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-yellow-500/50 transition-colors">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-lg bg-yellow-900/30 p-3 text-yellow-400">
                          <FaCalendarAlt className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="ml-4 sm:ml-5 min-w-0 flex-1">
                          <dl>
                            <dt className="truncate text-xs sm:text-sm font-medium text-gray-400">Today's Bookings</dt>
                            <dd>
                              <div className="text-base sm:text-lg font-semibold text-white">156</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main content area */}
            <div className="rounded-xl bg-gray-800 border border-gray-700 overflow-hidden">
              <Outlet />
              {/* Default dashboard content */}
              {activeTab === '/admin' && (
                <div className="space-y-6">
                  <div className="px-4 pt-5 sm:px-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                      <p className="mt-1 text-sm text-gray-400">Latest actions and updates</p>
                    </div>
                    <button className="rounded-lg bg-brand-dark px-4 py-2 text-sm font-medium text-white hover:bg-brand transition-colors shadow-sm">
                      View All
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-700">
                    <div className="px-4 py-4 sm:px-6">
                      <ul className="divide-y divide-gray-700">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <li key={item} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                                  <FaUserCog className="h-4 w-4" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm text-white">
                                  <span className="font-medium">Admin</span> updated membership plan for{' '}
                                  <span className="font-medium">John Doe</span>
                                </p>
                                <p className="text-sm text-gray-400">2 hours ago</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
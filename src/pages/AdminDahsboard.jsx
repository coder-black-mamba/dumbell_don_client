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
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-indigo-700 text-white transition duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-indigo-600 px-4">
          <h1 className="text-xl font-bold">GymAdmin Pro</h1>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1 text-gray-300 hover:bg-indigo-600 hover:text-white lg:hidden"
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
                      ? 'bg-indigo-800 text-white'
                      : 'text-gray-200 hover:bg-indigo-600 hover:text-white'
                  }`}
                  onClick={() => setActiveTab(item.path)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-indigo-600 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-gray-200 hover:bg-indigo-600 hover:text-white"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.path === activeTab)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center
          ">
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                <span className="mr-2">Admin User</span>
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  AU
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-7xl">
            {/* Dashboard Overview Cards */}
            {activeTab === '/admin' && (
              <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-center">
                    <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
                      <FaUsers size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Members</p>
                      <p className="text-2xl font-semibold text-gray-900">1,254</p>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-100 p-3 text-green-600">
                      <FaDumbbell size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Active Classes</p>
                      <p className="text-2xl font-semibold text-gray-900">24</p>
                      <p className="text-sm text-green-600">+2 this week</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-center">
                    <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                      <FaMoneyBillWave size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                      <p className="text-2xl font-semibold text-gray-900">$24,500</p>
                      <p className="text-sm text-green-600">+8.2% from last month</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-center">
                    <div className="rounded-full bg-red-100 p-3 text-red-600">
                      <FaClipboardList size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                      <p className="text-2xl font-semibold text-gray-900">8</p>
                      <p className="text-sm text-gray-600">Waiting for review</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main content area */}
            <div className="rounded-lg bg-white p-6 shadow">
              <Outlet />
              
              {/* Default dashboard content */}
              {activeTab === '/admin' && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                    <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                      View All
                    </button>
                  </div>
                  
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Member</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Activity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <tr key={item} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    U{item}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">User {item}</div>
                                  <div className="text-sm text-gray-500">user{item}@example.com</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="text-sm text-gray-900">Checked in for Yoga Class</div>
                              <div className="text-sm text-gray-500">Morning Session</div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="text-sm text-gray-900">{new Date().toLocaleDateString()}</div>
                              <div className="text-sm text-gray-500">10:30 AM</div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                Completed
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
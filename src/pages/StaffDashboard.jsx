import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import {
  FaClipboardCheck,
  FaUsers,
  FaDumbbell,
  FaCalendarAlt,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaComments,
  FaUserCog
} from 'react-icons/fa';

const StaffDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [attendanceList, setAttendanceList] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/staff' },
    { name: 'Attendance', icon: <FaClipboardCheck />, path: '/staff/attendance' },
    { name: 'Classes', icon: <FaDumbbell />, path: '/staff/classes' },
    { name: 'Bookings', icon: <FaCalendarAlt />, path: '/staff/bookings' },
    { name: 'Members', icon: <FaUsers />, path: '/staff/members' },
    { name: 'Feedback', icon: <FaComments />, path: '/staff/feedback' },
    { name: 'Profile', icon: <FaUserCog />, path: '/staff/profile' },
  ];

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Simulate API call for attendance
    setAttendanceList([
      { id: 1, member: 'John Doe', date: '2023-11-15', status: 'Present', time: '09:30 AM' },
      { id: 2, member: 'Jane Smith', date: '2023-11-15', status: 'Present', time: '10:15 AM' },
      { id: 3, member: 'Mike Johnson', date: '2023-11-15', status: 'Absent', time: '11:00 AM' },
    ]);

    // Simulate upcoming classes
    setUpcomingClasses([
      { id: 1, name: 'Yoga Flow', time: '08:00 AM', trainer: 'Sarah Williams', capacity: 12, booked: 10 },
      { id: 2, name: 'HIIT', time: '05:30 PM', trainer: 'Mark Davis', capacity: 15, booked: 14 },
    ]);

    // Simulate recent bookings
    setRecentBookings([
      { id: 1, member: 'John Doe', class: 'Yoga Flow', date: '2023-11-16', status: 'Confirmed' },
      { id: 2, member: 'Jane Smith', class: 'HIIT', date: '2023-11-16', status: 'Pending' },
    ]);
  }, []);

  useEffect(() => {
    // Set active tab based on current path
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => currentPath.startsWith(item.path));
    if (activeItem) {
      setActiveTab(activeItem.path);
    } else {
      setActiveTab('/staff');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const markAttendance = (id, status) => {
    // Handle attendance marking
    console.log(`Marking attendance ${id} as ${status}`);
    // Update UI optimistically
    setAttendanceList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
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
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-blue-700 text-white transition duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-blue-600 px-4">
          <h1 className="text-xl font-bold">Staff Portal</h1>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1 text-gray-300 hover:bg-blue-600 hover:text-white lg:hidden"
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
                      ? 'bg-blue-800 text-white'
                      : 'text-gray-200 hover:bg-blue-600 hover:text-white'
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

        <div className="absolute bottom-0 w-full border-t border-blue-600 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-gray-200 hover:bg-blue-600 hover:text-white"
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
          
          <div className="flex items-center">
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                <span className="mr-2">Staff User</span>
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  SU
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-7xl">
            {/* Dashboard Overview Cards */}
            {activeTab === '/staff' && (
              <>
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                        <FaClipboardCheck size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Today's Attendance</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {attendanceList.filter(a => a.status === 'Present').length}/{attendanceList.length}
                        </p>
                        <p className="text-sm text-gray-600">Members checked in</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center">
                      <div className="rounded-full bg-green-100 p-3 text-green-600">
                        <FaDumbbell size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Upcoming Classes</p>
                        <p className="text-2xl font-semibold text-gray-900">{upcomingClasses.length}</p>
                        <p className="text-sm text-gray-600">Scheduled for today</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center">
                      <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                        <FaClipboardList size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Recent Bookings</p>
                        <p className="text-2xl font-semibold text-gray-900">{recentBookings.length}</p>
                        <p className="text-sm text-gray-600">New bookings today</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  {/* Today's Classes */}
                  <div className="rounded-lg bg-white p-6 shadow">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Today's Classes</h2>
                      <Link to="/staff/classes" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {upcomingClasses.map((cls) => (
                        <div key={cls.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                          <div>
                            <h3 className="font-medium text-gray-900">{cls.name}</h3>
                            <p className="text-sm text-gray-600">{cls.time} • {cls.trainer}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-gray-900">
                              {cls.booked}/{cls.capacity}
                            </span>
                            <p className="text-xs text-gray-500">Booked</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Attendance */}
                  <div className="rounded-lg bg-white p-6 shadow">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Recent Attendance</h2>
                      <Link to="/staff/attendance" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        View All
                      </Link>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Member</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Time</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {attendanceList.map((record) => (
                            <tr key={record.id}>
                              <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                                {record.member}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                                {record.time}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  record.status === 'Present' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {record.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Nested routes content */}
            <div className="rounded-lg bg-white p-6 shadow">
              <Outlet />
              
              {/* Default dashboard content when no sub-route is active */}
              {activeTab === '/staff' && !location.pathname.endsWith('/staff') && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <Link
                        to="/staff/attendance/new"
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm hover:bg-gray-50"
                      >
                        <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                          <FaClipboardCheck size={20} />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Mark Attendance</h3>
                        <p className="mt-1 text-xs text-gray-500">Record member check-ins</p>
                      </Link>
                      
                      <Link
                        to="/staff/classes/schedule"
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm hover:bg-gray-50"
                      >
                        <div className="rounded-full bg-green-100 p-3 text-green-600">
                          <FaDumbbell size={20} />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">View Schedule</h3>
                        <p className="mt-1 text-xs text-gray-500">Upcoming classes</p>
                      </Link>
                      
                      <Link
                        to="/staff/bookings/new"
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm hover:bg-gray-50"
                      >
                        <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                          <FaCalendarAlt size={20} />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">New Booking</h3>
                        <p className="mt-1 text-xs text-gray-500">Book a class for member</p>
                      </Link>
                      
                      <Link
                        to="/staff/members"
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm hover:bg-gray-50"
                      >
                        <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                          <FaUsers size={20} />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Member Directory</h3>
                        <p className="mt-1 text-xs text-gray-500">View all members</p>
                      </Link>
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

export default StaffDashboard;
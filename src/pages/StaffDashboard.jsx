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

  const menuItems = React.useMemo(() => [
    { name: 'Dashboard', icon: <FaHome />, path: '/staff' },
    { name: 'Attendance', icon: <FaClipboardCheck />, path: '/staff/attendance' },
    { name: 'Classes', icon: <FaDumbbell />, path: '/staff/classes' },
    { name: 'Bookings', icon: <FaCalendarAlt />, path: '/staff/bookings' },
    { name: 'Members', icon: <FaUsers />, path: '/staff/members' },
    { name: 'Feedback', icon: <FaComments />, path: '/staff/feedback' },
    { name: 'Profile', icon: <FaUserCog />, path: '/staff/profile' },
  ], []);

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
    const activeItem = menuItems.find(item => 
      item.path !== '/staff' ? currentPath.startsWith(item.path) : currentPath === item.path
    );
    if (activeItem) {
      setActiveTab(activeItem.path);
    }
  }, [location.pathname, menuItems]);

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
          <h1 className="text-xl font-bold">Staff Portal</h1>
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
                  onClick={() => {
                    setActiveTab(item.path);
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
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
            className="flex w-full items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 transition-colors"
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
                <span className="mr-2">Staff User</span>
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                  SU
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          <div className="mx-auto max-w-7xl">
            {/* Dashboard Overview Cards */}
            {activeTab === '/staff' && (
              <>
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
                    <div className="flex items-center">
                      <div className="rounded-full bg-blue-900 bg-opacity-30 p-3 text-blue-400">
                        <FaClipboardCheck size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Today's Attendance</p>
                        <p className="text-2xl font-semibold text-white">
                          {attendanceList.filter(a => a.status === 'Present').length}/{attendanceList.length}
                        </p>
                        <p className="text-sm text-gray-400">Members checked in</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
                    <div className="flex items-center">
                      <div className="rounded-full bg-green-900 bg-opacity-30 p-3 text-green-400">
                        <FaDumbbell size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Upcoming Classes</p>
                        <p className="text-2xl font-semibold text-white">{upcomingClasses.length}</p>
                        <p className="text-sm text-gray-400">Scheduled for today</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
                    <div className="flex items-center">
                      <div className="rounded-full bg-purple-900 bg-opacity-30 p-3 text-purple-400">
                        <FaClipboardList size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Recent Bookings</p>
                        <p className="text-2xl font-semibold text-white">
                          {recentBookings.length}
                        </p>
                        <p className="text-sm text-gray-400">New registrations</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  {/* Today's Classes */}
                  <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-white">Today's Classes</h2>
                      <Link to="/staff/classes" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {upcomingClasses.map((cls) => (
                        <div key={cls.id} className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-900 p-4">
                          <div>
                            <h3 className="font-medium text-white">{cls.name}</h3>
                            <p className="text-sm text-gray-400">{cls.time} • {cls.trainer}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-white">
                              {cls.booked}/{cls.capacity}
                            </span>
                            <p className="text-xs text-gray-400">Booked</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Attendance */}
                  <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-white">Recent Attendance</h2>
                      <Link to="/staff/attendance" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                        View All
                      </Link>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-gray-700">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Member</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 bg-gray-900">
                          {attendanceList.map((record) => (
                            <tr key={record.id}>
                              <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-white">
                                {record.member}
                              </td>
                              <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-400">
                                {record.time}
                              </td>
                              <td className="whitespace-nowrap px-6 py-3">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  record.status === 'Present' 
                                    ? 'bg-green-900 bg-opacity-30 text-green-400' 
                                    : 'bg-red-900 bg-opacity-30 text-red-400'
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
            <div className="rounded-lg bg-gray-800 p-6 border border-gray-700">
              <Outlet />
              
              {/* Default dashboard content when no sub-route is active */}
              {activeTab === '/staff' && !location.pathname.endsWith('/staff') && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-white">Quick Actions</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <Link
                        to="/staff/attendance/new"
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-6 text-center hover:bg-gray-700 transition-colors"
                      >
                        <div className="rounded-full bg-blue-900 bg-opacity-30 p-3 text-blue-400">
                          <FaClipboardCheck size={20} />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-white">Mark Attendance</h3>
                        <p className="mt-1 text-xs text-gray-400">Record member check-ins</p>
                      </Link>
                      
                      <Link
                        to="/staff/classes/schedule"
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-6 text-center hover:bg-gray-700 transition-colors"
                      >
                        <div className="rounded-full bg-green-900 bg-opacity-30 p-3 text-green-400">
                          <FaDumbbell size={20} />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-white">View Schedule</h3>
                        <p className="mt-1 text-xs text-gray-400">Upcoming classes</p>
                      </Link>
                      
                      <Link
                        to="/staff/bookings/new"
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-6 text-center hover:bg-gray-700 transition-colors"
                      >
                        <div className="rounded-full bg-purple-900 bg-opacity-30 p-3 text-purple-400">
                          <FaCalendarAlt size={20} />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-white">New Booking</h3>
                        <p className="mt-1 text-xs text-gray-400">Book a class for member</p>
                      </Link>
                      
                      <Link
                        to="/staff/members"
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-6 text-center hover:bg-gray-700 transition-colors"
                      >
                        <div className="rounded-full bg-yellow-900 bg-opacity-30 p-3 text-yellow-400">
                          <FaUsers size={20} />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-white">Member Directory</h3>
                        <p className="mt-1 text-xs text-gray-400">View all members</p>
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
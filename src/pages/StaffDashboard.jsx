import React, { useState, useEffect } from 'react';
import { FaClipboardCheck, FaUsers, FaDumbbell, FaCalendarAlt, FaClock, FaUserClock, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router';
import axios from 'axios';

const StaffDashboard = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeClasses: 0,
    todayBookings: 0,
    attendanceRate: 0,
    recentBookings: [],
    pendingPayments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchDashboardData = async () => {
      try {
        // Example API calls - replace with actual API calls
        // const membersRes = await axios.get('/api/v1/auth/users/');
        // const classesRes = await axios.get('/api/v1/fitness-classes/');
        // const bookingsRes = await axios.get('/api/v1/bookings/');
        // const attendanceRes = await axios.get('/api/v1/attendances/');
        // const paymentsRes = await axios.get('/api/v1/payments/');

        // Mock data for demonstration
        setTimeout(() => {
          setStats({
            totalMembers: 124,
            activeClasses: 8,
            todayBookings: 24,
            attendanceRate: 78,
            pendingPayments: 5,
            recentBookings: [
              { id: 1, member: 'John Doe', className: 'Yoga', time: '09:00 AM', status: 'Confirmed' },
              { id: 2, member: 'Jane Smith', className: 'HIIT', time: '10:30 AM', status: 'Pending' },
              { id: 3, member: 'Mike Johnson', className: 'Zumba', time: '12:00 PM', status: 'Confirmed' },
              { id: 4, member: 'Sarah Williams', className: 'Pilates', time: '04:00 PM', status: 'Cancelled' },
              { id: 5, member: 'David Brown', className: 'CrossFit', time: '05:30 PM', status: 'Confirmed' },
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  // Stats cards data
  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: <FaUsers className="text-2xl text-blue-500" />,
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Classes',
      value: stats.activeClasses,
      icon: <FaDumbbell className="text-2xl text-green-500" />
    },
    {
      title: "Today's Bookings",
      value: stats.todayBookings,
      icon: <FaCalendarAlt className="text-2xl text-yellow-500" />
    },
    {
      title: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      icon: <FaChartLine className="text-2xl text-purple-500" />
    }
  ];

  // Quick actions
  const quickActions = [
    { 
      title: 'Mark Attendance', 
      icon: <FaClipboardCheck className="text-xl" />, 
      link: '/staff/attendance',
      bgColor: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      title: 'Add Booking', 
      icon: <FaCalendarAlt className="text-xl" />, 
      link: '/staff/bookings/new',
      bgColor: 'bg-green-500 hover:bg-green-600'
    },
    { 
      title: 'View Schedule', 
      icon: <FaClock className="text-xl" />, 
      link: '/staff/classes/schedule',
      bgColor: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      title: 'Check Members', 
      icon: <FaUserClock className="text-xl" />, 
      link: '/staff/members',
      bgColor: 'bg-yellow-500 hover:bg-yellow-600'
    },
    { 
      title: 'Process Payment', 
      icon: <FaMoneyBillWave className="text-xl" />, 
      link: '/staff/payments',
      bgColor: 'bg-red-500 hover:bg-red-600'
    }
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                {stat.change && (
                  <span className={`text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </span>
                )}
              </div>
              <div className="p-3 rounded-full bg-gray-700 bg-opacity-50">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${action.bgColor} text-white transition-colors duration-200 transform hover:scale-105`}
                >
                  <span>{action.icon}</span>
                  <span className="font-medium">{action.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Bookings</h2>
              <Link to="/staff/bookings" className="text-blue-400 hover:text-blue-300 text-sm">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Member</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Class</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {stats.recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{booking.member}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{booking.className}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{booking.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Upcoming Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">Morning Yoga</h3>
                  <p className="text-sm text-gray-300">08:00 AM - 09:00 AM</p>
                  <p className="text-sm text-gray-400 mt-1">Instructor: Sarah Johnson</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">12/20</span>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-gray-300">Today</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
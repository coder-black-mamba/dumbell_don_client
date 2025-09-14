import React, { useEffect, useState } from 'react';
import { FaUsers, FaDumbbell, FaMoneyBillWave, FaClipboardCheck, FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    attendanceRate: 0,
    recentActivities: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      // Dummy data
      const dummyActivities = [
        { user: 'John Doe', action: 'checked in for Yoga class', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
        { user: 'Jane Smith', action: 'purchased a membership', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
        { user: 'Mike Johnson', action: 'booked a personal training session', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
        { user: 'Sarah Williams', action: 'added a new class schedule', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
        { user: 'System', action: 'scheduled maintenance for tomorrow at 2 AM', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }
      ];

      setStats({
        totalUsers: 248,
        activeSubscriptions: 189,
        monthlyRevenue: 12450.75,
        attendanceRate: 78,
        recentActivities: dummyActivities,
        isLoading: false
      });
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ title, value, icon, change, isCurrency = false }) => (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">
            {isCurrency ? `$${value.toLocaleString()}` : value}
            {!isCurrency && title === 'Attendance Rate' && '%'}
          </p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {change > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {Math.abs(change)}% from last month
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-brand bg-opacity-20 text-brand">
          {icon}
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-start py-3 border-b border-gray-700 last:border-0">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
        {activity.user?.charAt(0).toUpperCase() || 'A'}
      </div>
      <div className="ml-3">
        <p className="text-sm text-gray-300">
          <span className="font-medium text-white">{activity.user || 'System'}</span> {activity.action}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(activity.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );

  if (stats.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="bg-red-900/20 border border-red-700 text-red-200 p-4 rounded-lg">
        <p>{stats.error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-700 hover:bg-red-600 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<FaUsers size={20} />} 
          change={5.2} 
        />
        <StatCard 
          title="Active Subscriptions" 
          value={stats.activeSubscriptions} 
          icon={<FaClipboardCheck size={20} />} 
          change={2.8} 
        />
        <StatCard 
          title="Monthly Revenue" 
          value={stats.monthlyRevenue} 
          icon={<FaMoneyBillWave size={20} />} 
          isCurrency 
          change={12.5} 
        />
        <StatCard 
          title="Attendance Rate" 
          value={stats.attendanceRate} 
          icon={<FaDumbbell size={20} />} 
          change={-1.2} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <button className="text-sm text-brand hover:underline">View All</button>
            </div>
            <div className="divide-y divide-gray-700">
              {stats.recentActivities.length > 0 ? (
                stats.recentActivities.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No recent activities</p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upcoming Classes</h2>
              <button className="text-sm text-brand hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="bg-brand/20 text-brand rounded-lg p-2 mr-3">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="font-medium text-white">Yoga Class</p>
                    <p className="text-sm text-gray-400">10:00 AM - 11:00 AM</p>
                    <p className="text-xs text-gray-500">Instructor: Sarah</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

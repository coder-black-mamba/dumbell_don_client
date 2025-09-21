import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaCheck, FaTimes, FaFilter, FaSync, FaClipboardCheck } from 'react-icons/fa';
import Loader from '../common/Loader';
import AttendenceDetail from '../AdminStaffCommon/AttendenceDetail';
import { formatDateTime, formatDate, formatTime } from '../../utils/datetime'

// Mock data for demonstration
const mockAttendances = {
  count: 5,
  results: [
    {
      id: 1,
      present: true,
      marked_at: '2025-09-14T10:22:28.414138Z',
      booking: {
        id: 1,
        member: {
          id: 3,
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        fitness_class: {
          id: 1,
          name: 'Morning Yoga',
          instructor: 'Sarah Johnson',
          schedule: '2025-09-14T09:00:00Z',
          duration_minutes: 60
        },
        status: 'ATTENDED'
      },
      marked_by: {
        id: 1,
        name: 'Admin User',
        role: 'admin'
      }
    },
    {
      id: 2,
      present: false,
      marked_at: '2025-09-13T18:05:15.123456Z',
      booking: {
        id: 2,
        member: {
          id: 4,
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        fitness_class: {
          id: 2,
          name: 'HIIT Training',
          instructor: 'Mike Chen',
          schedule: '2025-09-13T17:30:00Z',
          duration_minutes: 45
        },
        status: 'NO_SHOW'
      },
      marked_by: {
        id: 2,
        name: 'Staff Member',
        role: 'staff'
      }
    },
    {
      id: 3,
      present: true,
      marked_at: '2025-09-12T15:30:00.000000Z',
      booking: {
        id: 3,
        member: {
          id: 5,
          name: 'Alex Wong',
          email: 'alex@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        fitness_class: {
          id: 3,
          name: 'Zumba Party',
          instructor: 'Maria Garcia',
          schedule: '2025-09-12T18:00:00Z',
          duration_minutes: 60
        },
        status: 'ATTENDED'
      },
      marked_by: {
        id: 1,
        name: 'Admin User',
        role: 'admin'
      }
    },
    {
      id: 4,
      present: true,
      marked_at: '2025-09-11T10:15:00.000000Z',
      booking: {
        id: 4,
        member: {
          id: 6,
          name: 'Emily Davis',
          email: 'emily@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
        },
        fitness_class: {
          id: 1,
          name: 'Morning Yoga',
          instructor: 'Sarah Johnson',
          schedule: '2025-09-11T09:00:00Z',
          duration_minutes: 60
        },
        status: 'ATTENDED'
      },
      marked_by: {
        id: 1,
        name: 'Admin User',
        role: 'admin'
      }
    },
    {
      id: 5,
      present: false,
      marked_at: '2025-09-10T18:10:00.000000Z',
      booking: {
        id: 5,
        member: {
          id: 7,
          name: 'Robert Johnson',
          email: 'robert@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
        },
        fitness_class: {
          id: 2,
          name: 'HIIT Training',
          instructor: 'Mike Chen',
          schedule: '2025-09-10T17:30:00Z',
          duration_minutes: 45
        },
        status: 'NO_SHOW'
      },
      marked_by: {
        id: 2,
        name: 'Staff Member',
        role: 'staff'
      }
    }
  ]
};

const AdminAttendences = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [attendanceFilter, setAttendanceFilter] = useState('ALL'); // ALL, PRESENT, ABSENT
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load attendances
  useEffect(() => {
    const timer = setTimeout(() => {
      setAttendances(mockAttendances.results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter attendances based on search and filters
  const filteredAttendances = attendances.filter(attendance => {
    const matchesSearch = 
      attendance.booking.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.booking.member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.booking.fitness_class.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAttendance = 
      attendanceFilter === 'ALL' || 
      (attendanceFilter === 'PRESENT' && attendance.present) ||
      (attendanceFilter === 'ABSENT' && !attendance.present);
    
    let matchesDateRange = true;
    if (dateRange.startDate && dateRange.endDate) {
      const attendanceDate = new Date(attendance.marked_at);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999); // End of the day
      
      matchesDateRange = attendanceDate >= startDate && attendanceDate <= endDate;
    }
    
    return matchesSearch && matchesAttendance && matchesDateRange;
  });

  // Toggle attendance status
  const toggleAttendanceStatus = (id) => {
    setAttendances(attendances.map(att => 
      att.id === id ? { ...att, present: !att.present } : att
    ));
  };

  // Handle view attendance details
  const handleViewDetails = (attendance) => {
    setSelectedAttendance(attendance);
    setIsModalOpen(true);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setAttendanceFilter('ALL');
    setDateRange({ startDate: '', endDate: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-300 mb-4 md:mb-0">Class Attendance</h1>
        <div className="flex space-x-3 w-full md:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button
            onClick={resetFilters}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <FaSync className="mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Filters */}
      {/* {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by member, email, or class..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Status</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={attendanceFilter}
                onChange={(e) => setAttendanceFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                />
                <input
                  type="date"
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  min={dateRange.startDate}
                />
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Attendance Summary */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaClipboardCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Attendance</p>
              <p className="text-2xl font-semibold text-gray-800">
                {attendances.filter(a => a.present).length}
                <span className="text-sm font-normal text-gray-500"> / {attendances.length}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaUser className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Present Today</p>
              <p className="text-2xl font-semibold text-gray-800">
                {attendances.filter(a => a.present && new Date(a.marked_at).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <FaCalendarAlt className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">This Week</p>
              <p className="text-2xl font-semibold text-gray-800">
                {attendances.filter(a => {
                  const oneWeekAgo = new Date();
                  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  return a.present && new Date(a.marked_at) >= oneWeekAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Attendances Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marked By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendances.length > 0 ? (
                filteredAttendances.map((attendance) => (
                  <tr key={attendance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={attendance.booking.member.avatar} alt={attendance.booking.member.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{attendance.booking.member.name}</div>
                          <div className="text-sm text-gray-500">{attendance.booking.member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{attendance.booking.fitness_class.name}</div>
                      <div className="text-sm text-gray-500">{attendance.booking.fitness_class.instructor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(attendance.marked_at)}</div>
                      <div className="text-sm text-gray-500">{formatTime(attendance.marked_at)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attendance.marked_by.name}
                      <div className="text-xs text-gray-400">{attendance.marked_by.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        attendance.present 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {attendance.present ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(attendance)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No attendance records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Details Modal */}
      {isModalOpen && selectedAttendance && (
        <AttendenceDetail selectedAttendance={selectedAttendance} toggleAttendanceStatus={toggleAttendanceStatus} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default AdminAttendences;
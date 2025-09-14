import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaDumbbell, FaCheck, FaTimes, FaClock, FaFilter, FaSync } from 'react-icons/fa';

// Mock data for demonstration
const mockBookings = {
  count: 5,
  results: [
    {
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
        schedule: '2025-09-15T09:00:00Z',
        duration_minutes: 60
      },
      status: 'ATTENDED',
      booked_at: '2025-08-13T15:16:23.089960Z'
    },
    {
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
        schedule: '2025-09-15T17:30:00Z',
        duration_minutes: 45
      },
      status: 'BOOKED',
      booked_at: '2025-09-10T10:30:15.000000Z'
    },
    {
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
        schedule: '2025-09-16T18:00:00Z',
        duration_minutes: 60
      },
      status: 'CANCELLED',
      booked_at: '2025-09-09T14:22:10.000000Z'
    },
    {
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
        schedule: '2025-09-17T09:00:00Z',
        duration_minutes: 60
      },
      status: 'BOOKED',
      booked_at: '2025-09-14T08:15:30.000000Z'
    },
    {
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
        schedule: '2025-09-18T17:30:00Z',
        duration_minutes: 45
      },
      status: 'NO_SHOW',
      booked_at: '2025-09-14T11:45:20.000000Z'
    }
  ]
};

const statusOptions = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'BOOKED', label: 'Booked' },
  { value: 'ATTENDED', label: 'Attended' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NO_SHOW', label: 'No Show' }
];

const StaffBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load bookings
  useEffect(() => {
    const timer = setTimeout(() => {
      setBookings(mockBookings.results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  // Format time only
  const formatTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format date only
  const formatDate = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'BOOKED':
        return 'bg-blue-100 text-blue-800';
      case 'ATTENDED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      case 'NO_SHOW':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.fitness_class.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.fitness_class.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'ALL' || booking.status === selectedStatus;
    
    let matchesDateRange = true;
    if (dateRange.startDate && dateRange.endDate) {
      const bookingDate = new Date(booking.booked_at);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999); // End of the day
      
      matchesDateRange = bookingDate >= startDate && bookingDate <= endDate;
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Handle status update
  const handleStatusUpdate = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  // Handle view booking details
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('ALL');
    setDateRange({ startDate: '', endDate: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Class Bookings</h1>
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
      {showFilters && (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
      )}

      {/* Bookings Table */}
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
                  Booked On
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
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={booking.member.avatar} alt={booking.member.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{booking.member.name}</div>
                          <div className="text-sm text-gray-500">{booking.member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.fitness_class.name}</div>
                      <div className="text-sm text-gray-500">{booking.fitness_class.instructor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(booking.fitness_class.schedule)}</div>
                      <div className="text-sm text-gray-500">{formatTime(booking.fitness_class.schedule)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(booking.booked_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                        >
                          View
                        </button>
                        {booking.status === 'BOOKED' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'ATTENDED')}
                              className="text-green-600 hover:text-green-900"
                              title="Mark as Attended"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'NO_SHOW')}
                              className="text-red-600 hover:text-red-900 ml-2"
                              title="Mark as No Show"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Member Information</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    className="h-16 w-16 rounded-full" 
                    src={selectedBooking.member.avatar} 
                    alt={selectedBooking.member.name} 
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-900">{selectedBooking.member.name}</p>
                    <p className="text-gray-600">{selectedBooking.member.email}</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Class Details</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Class:</span>{' '}
                    {selectedBooking.fitness_class.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Instructor:</span>{' '}
                    {selectedBooking.fitness_class.instructor}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Date:</span>{' '}
                    {formatDate(selectedBooking.fitness_class.schedule)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Time:</span>{' '}
                    {formatTime(selectedBooking.fitness_class.schedule)} - {new Date(new Date(selectedBooking.fitness_class.schedule).getTime() + selectedBooking.fitness_class.duration_minutes * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Duration:</span>{' '}
                    {selectedBooking.fitness_class.duration_minutes} minutes
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Booking Information</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Booking ID:</span>{' '}
                    {selectedBooking.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Booked On:</span>{' '}
                    {formatDateTime(selectedBooking.booked_at)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Status:</span>{' '}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(selectedBooking.status)}`}>
                      {selectedBooking.status.replace('_', ' ')}
                    </span>
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'BOOKED');
                        setIsModalOpen(false);
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedBooking.status === 'BOOKED' 
                          ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                          : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      Booked
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'ATTENDED');
                        setIsModalOpen(false);
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedBooking.status === 'ATTENDED' 
                          ? 'bg-green-100 text-green-800 border border-green-300' 
                          : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
                      }`}
                    >
                      Attended
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'NO_SHOW');
                        setIsModalOpen(false);
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedBooking.status === 'NO_SHOW' 
                          ? 'bg-red-100 text-red-800 border border-red-300' 
                          : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                      }`}
                    >
                      No Show
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'CANCELLED');
                        setIsModalOpen(false);
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedBooking.status === 'CANCELLED' 
                          ? 'bg-gray-100 text-gray-800 border border-gray-300' 
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffBookings;
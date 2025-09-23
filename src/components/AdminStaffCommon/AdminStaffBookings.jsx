import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaDumbbell, FaCheck, FaTimes, FaClock, FaFilter, FaSync ,FaPlus} from 'react-icons/fa';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../common/ErrorMessage';
import { authApiClient } from '../../services/apiServices';



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
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showFilters, setShowFilters] = useState(false); 
  const navigate = useNavigate();
  const {isAdmin}=useAuth();

  // Load bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await authApiClient.get('/bookings');
        setBookings(response.data.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchBookings();
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
        return 'bg-blue-900/30 text-blue-300 border border-blue-700';
      case 'ATTENDED':
        return 'bg-green-900/30 text-green-300 border border-green-700';
      case 'CANCELLED':
        return 'bg-gray-700/50 text-gray-300 border border-gray-600';
      case 'NO_SHOW':
        return 'bg-red-900/30 text-red-300 border border-red-700';
      default:
        return 'bg-gray-700/50 text-gray-300 border border-gray-600';
    }
  };

  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.fitness_class.title.toLowerCase().includes(searchTerm.toLowerCase())
      
      
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

  // Ha
  // Handle view booking details
  const handleViewDetails = (booking) => { 
    if(isAdmin){
      navigate(`/admin/bookings/${booking.id}`,{state:{booking}});
    }else{
      navigate(`/staff/bookings/${booking.id}`,{state:{booking}});
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('ALL');
    setDateRange({ startDate: '', endDate: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900">
        <Loader/>
      </div>
    );
  }

  if(error){
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900">
        <ErrorMessage message={"Something went wrong.Please try again later"}/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Class Bookings</h1>
        <div className="flex space-x-3 w-full md:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-600 rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button
            onClick={resetFilters}
            className="flex items-center px-4 py-2 border border-gray-600 rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FaSync className="mr-2" />
            Reset
          </button>
          {isAdmin && (
            <button
              onClick={() => navigate('/admin/bookings/add')}
              className="flex items-center px-4 py-2 border border-gray-600 rounded-lg text-gray-200 bg-blue-700 hover:bg-blue-600 transition-colors"
            >
              <FaPlus className="mr-2" />
            Add Booking
          </button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by member, email, or class..."
                  className="pl-10 pr-4 py-2 border border-gray-600 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-300 mb-1">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                />
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Booked On
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full ring-2 ring-gray-600" src={booking.member.profile_picture_url || 'https://i.pravatar.cc/300'} alt={booking.member.first_name + ' ' + booking.member.last_name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{booking.member.first_name + ' ' + booking.member.last_name}</div>
                          <div className="text-sm text-gray-300">{booking.member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{booking.fitness_class.title}</div>
                      <div className="text-sm text-gray-300">#{booking.fitness_class.instructor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{formatDateTime(booking.fitness_class.start_datetime)}</div>
                      <div className="text-sm text-gray-300">{formatDateTime(booking.fitness_class.end_datetime)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
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
                          className="text-blue-400 hover:text-blue-300 mr-2 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-400">
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default StaffBookings;
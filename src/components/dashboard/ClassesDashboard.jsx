import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUserAlt, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';

const ClassesDashboard = () => {
  const [bookings, setBookings] = useState({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchBookings = async () => {
      try {
        // In a real app, you would fetch this from your API
        const mockData = {
          success: true,
          status: 200,
          message: "Success",
          data: [
            {
              id: 1,
              member: 6,
              status: "BOOKED",
              booked_at: "2025-09-16T03:51:05.122298Z",
              fitness_class: {
                id: 1,
                title: "Morning Yoga",
                description: "Energizing flow to build strength and flexibility; suitable for all levels.",
                instructor: {
                  id: 2,
                  first_name: "abu",
                  last_name: "sayed",
                  email: "sde.sayed24@gmail.com"
                },
                start_datetime: "2025-08-08T12:12:00Z",
                end_datetime: "2025-08-08T13:20:00Z",
                duration_minutes: 60,
                location: "Studio A"
              }
            }
            // More bookings would be added here in a real scenario
          ]
        };
        
        setBookings({
          data: mockData.data,
          loading: false
        });
      } catch (error) {
        setBookings(prev => ({
          ...prev,
          loading: false,
          error: "Failed to load class bookings"
        }));
      }
    };

    fetchBookings();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = { 
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : ''}`.trim();
  };

  if (bookings.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (bookings.error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{bookings.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-200">My Class Bookings</h1>
      </div>

      {bookings.data.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <p className="text-gray-400">No class bookings found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.data.map((booking) => (
            <div key={booking.id} className="bg-base-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-100">{booking.fitness_class.title}</h2>
                  <span className="flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    <FaCheckCircle className="mr-1" />
                    {booking.status}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{booking.fitness_class.description}</p>
                
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-brand mr-2" />
                    <span>{formatDateTime(booking.fitness_class.start_datetime)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-brand mr-2" />
                    <span>{formatDuration(booking.fitness_class.duration_minutes)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUserAlt className="text-brand mr-2" />
                    <span>Instructor: {`${booking.fitness_class.instructor.first_name} ${booking.fitness_class.instructor.last_name}`}</span>
                  </div>
                  <div className="pt-2 text-xs text-gray-400">
                    Booked on: {formatDateTime(booking.booked_at)}
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-brand mr-2" />
                    <span>{booking.fitness_class.location}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between">
                  <button className="text-brand hover:text-brand-light font-medium">
                    View Details
                  </button>
                  <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-md text-sm font-medium">
                    {booking.status === 'BOOKED' ? 'View Booking' : 'Book Again'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassesDashboard;
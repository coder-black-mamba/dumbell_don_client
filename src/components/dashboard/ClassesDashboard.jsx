import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserAlt, FaDollarSign, FaUsers } from 'react-icons/fa';

const ClassesDashboard = () => {
  // Mock data based on your API response
  const [classes, setClasses] = useState({
    count: 0,
    results: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchClasses = async () => {
      try {
        // In a real app, you would fetch this from your API
        const mockData = {
          count: 3,
          results: [
            {
              id: 1,
              title: "Morning Vinyasa Yoga",
              description: "Energizing flow to build strength and flexibility; suitable for all levels.",
              capacity: 18,
              price_cents: 1500,
              duration_minutes: 60,
              start_datetime: "2025-08-08T12:12:00Z",
              end_datetime: "2025-08-08T13:20:00Z",
              location: "Studio A",
              is_active: true,
              instructor: 2
            },
            {
              id: 2,
              title: "Power Spin",
              description: "High-intensity indoor cycling class with intervals",
              capacity: 20,
              price_cents: 2000,
              duration_minutes: 45,
              start_datetime: "2025-09-25T12:00:00Z",
              end_datetime: "2025-09-25T12:45:00Z",
              location: "Spin Room",
              is_active: true,
              instructor: 6
            }
          ]
        };
        setClasses({
          ...mockData,
          loading: false
        });
      } catch (error) {
        setClasses({
          ...classes,
          loading: false,
          error: "Failed to load classes"
        });
      }
    };

    fetchClasses();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  if (classes.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (classes.error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{classes.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-200">Class Schedule</h1> 
      </div>

      {classes.results.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No classes scheduled yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.results.map((cls) => (
            <div key={cls.id} className="bg-base-300 rounded-lg shadow-md overflow-hidden   hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-100">{cls.title}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    cls.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {cls.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{cls.description}</p>
                
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-brand mr-2" />
                    <span>{formatDate(cls.start_datetime)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-brand mr-2" />
                    <span>{cls.duration_minutes} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-brand mr-2" />
                    <span>{cls.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUserAlt className="text-brand mr-2" />
                    <span>Instructor #{cls.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-brand mr-2" />
                    <span>Capacity: {cls.capacity} people</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="text-brand mr-2" />
                    <span className="font-semibold">{formatPrice(cls.price_cents)}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
                  <button className="text-brand hover:text-brand-dark font-medium">
                    View Details
                  </button>
                  <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-md text-sm font-medium">
                    Book Now
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
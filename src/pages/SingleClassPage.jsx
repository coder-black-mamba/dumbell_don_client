import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaArrowLeft, FaClock, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaDumbbell, FaRegClock } from 'react-icons/fa';
import { apiClient } from '../services/apiServices';

const SingleClassPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        setIsLoading(true);
        // Replace with actual API endpoint
        // const response = await apiClient.get(`/api/classes/${classId}/`);
        // setClassData(response.data);
        
        // Mock data for now
        setTimeout(() => {
          setClassData({
            id: id,
            title: 'Morning Yoga Flow',
            instructor: 'Sarah Johnson',
            description: 'Start your day with a refreshing yoga session that combines traditional poses with modern flow sequences. Perfect for all levels, this class focuses on building strength, flexibility, and mindfulness. Great for improving posture and reducing stress.',
            duration: 60, // in minutes
            schedule: [
              { day: 'Monday', time: '07:00 AM' },
              { day: 'Wednesday', time: '07:00 AM' },
              { day: 'Friday', time: '07:30 AM' }
            ],
            location: 'Main Studio',
            capacity: 15,
            enrolled: 12,
            intensity: 'Moderate',
            category: 'Yoga',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          });
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load class details. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleRegister = () => {
    // Implement registration logic
    alert('Registration functionality will be implemented soon!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaTimesCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600">Class not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-200">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 py-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Classes
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:flex lg:space-x-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-300 mb-2">{classData.title}</h1>
              <p className="text-lg text-gray-600 mb-6">Instructor: {classData.instructor}</p>
              
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-6">
                <img
                  src={classData.image}
                  alt={classData.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">About This Class</h2>
                <p className="text-gray-700 leading-relaxed">{classData.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Class Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      <FaDumbbell className="h-5 w-5 mt-1" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Category</p>
                      <p className="text-sm text-gray-300">{classData.category}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      <FaRegClock className="h-5 w-5 mt-1" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="text-sm text-gray-300">{classData.duration} minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      <FaUser className="h-5 w-5 mt-1" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Intensity</p>
                      <p className="text-sm text-gray-300">{classData.intensity}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      <FaMapMarkerAlt className="h-5 w-5 mt-1" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-sm text-gray-300">{classData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-base-300 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Class Schedule</h2>
              
              <div className="space-y-4 mb-6">
                {classData.schedule.map((session, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaCalendarAlt className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-300">{session.day}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaClock className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {session.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Available Spots</span>
                  <span className="text-sm font-medium text-gray-300">
                    {classData.capacity - classData.enrolled} of {classData.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(classData.enrolled / classData.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleRegister}
                className="w-full justify-center py-3 text-base font-medium btn bg-brand"
              >
                Register for Class
              </button>
              
              <p className="mt-3 text-center text-sm text-gray-500">
                Have questions?{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClassPage;
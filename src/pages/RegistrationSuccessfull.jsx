import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowLeft } from 'react-icons/fa';

const RegistrationSuccessfull = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get class data from location state or use mock data if not available
  const classData = location.state?.classData || {
    title: 'Morning Yoga Flow',
    instructor: 'Sarah Johnson',
    date: 'Monday, September 20, 2023',
    time: '07:00 AM - 08:00 AM',
    location: 'Main Studio',
    bookingId: 'BK' + Math.floor(100000 + Math.random() * 900000)
  };

  const handleBackToClasses = () => {
    navigate('/classes');
  };

  const handleViewSchedule = () => {
    navigate('/my-schedule'); // Update this route based on your app's routing
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-100 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-brand text-white p-6 text-center">
            <div className="flex justify-center mb-4">
              <FaCheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold">Registration Successful!</h1>
            <p className="mt-2">You're all set for your class</p>
          </div>

          {/* Booking Details */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Booking Confirmation</h2>
            <div className="bg-base-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Booking ID:</span>
                <span className="font-mono font-medium">{classData.bookingId}</span>
              </div>
              <div className="text-xs text-gray-500">
                A confirmation has been sent to your email
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-brand">
                  <FaCalendarAlt className="h-5 w-5 mt-0.5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-400">Class</p>
                  <p className="text-gray-300">{classData.title}</p>
                  <p className="text-sm text-gray-500">with {classData.instructor}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-brand">
                  <FaClock className="h-5 w-5 mt-0.5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-400">Date & Time</p>
                  <p className="text-gray-300">{classData.date}</p>
                  <p className="text-sm text-gray-300">{classData.time}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-brand">
                  <FaMapMarkerAlt className="h-5 w-5 mt-0.5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-400">Location</p>
                  <p className="text-gray-300">{classData.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">What's Next?</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">1</div>
                <div>
                  <p className="font-medium text-gray-300">Check your email</p>
                  <p className="text-sm text-gray-500">We've sent you a confirmation email with all the details.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">2</div>
                <div>
                  <p className="font-medium text-gray-300">Add to your calendar</p>
                  <p className="text-sm text-gray-500">Don't forget to add this class to your calendar.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">3</div>
                <div>
                  <p className="font-medium text-gray-300">Prepare for class</p>
                  <p className="text-sm text-gray-500">Bring a water bottle and arrive 10 minutes early.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBackToClasses}
                className="btn btn-outline flex-1 flex items-center justify-center gap-2"
              >
                <FaArrowLeft />
                Back to Classes
              </button>
              <button
                onClick={handleViewSchedule}
                className="btn bg-brand hover:bg-brand/90 border-0 text-white flex-1"
              >
                View My Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="/contact" className="text-brand hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessfull;
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaClock,
  FaUser,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { apiClient } from "../services/apiServices";
import { format, parseISO } from "date-fns";

const SingleClassPage = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchClassDetails = async () => {
      try {
        const response = await apiClient.get(`/fitness-classes/${id}`);
        setClassData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load class details. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchClassDetails();
  }, [id]);

  const handleEnroll = async () => {
    if (!classData) {
      console.error('No class data available');
      return;
    }
    
    console.log('Navigating to payment with classData:', classData);
    
    navigate('/payment/initiate/booking', {
      state: {
        classData: { ...classData },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-screen">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-20">
          <p className="text-red-700">{error}</p>
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

  const formatTime = (dateString) => {
    return format(parseISO(dateString), "h:mm a");
  };

  const formatDate = (dateString) => {
    return format(parseISO(dateString), "EEEE, MMMM d, yyyy");
  };

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 py-16">
        <Link
          to="/classes"
          className="inline-flex items-center text-gray-600 hover:text-brand transition-colors mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Classes
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Class Image */}
            <div className="md:w-1/2">
              <img
                src={
                  classData?.image ||
                  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                }
                alt={classData.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Class Info */}
            <div className="p-8 md:w-1/2">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {classData.title}
                </h1>
                <span className="bg-brand/10 text-brand text-sm font-medium px-3 py-1 rounded-full">
                  {classData.capacity} spots left
                </span>
              </div>

              <p className="text-lg text-gray-600 mb-6">
                <FaUser className="inline mr-2 text-brand" />
                Instructor:{" "}
                <span className="font-medium">#{classData.instructor}</span>
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Class Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaCalendarAlt className="h-5 w-5 text-brand mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatDate(classData.start_datetime)}
                        </p>
                        <p className="text-gray-600">
                          {formatTime(classData.start_datetime)} -{" "}
                          {formatTime(classData.end_datetime)}
                          <span className="mx-2">•</span>
                          {classData.duration_minutes} minutes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaMapMarkerAlt className="h-5 w-5 text-brand mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">{classData.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaUsers className="h-5 w-5 text-brand mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Capacity</p>
                        <p className="text-gray-600">
                          {classData.capacity} spots available
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaDollarSign className="h-5 w-5 text-brand mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Price</p>
                        <p className="text-gray-600">
                          ${(classData.price_cents / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About This Class
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {classData.description}
                  </p>
                </div>
                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                    className={`w-full bg-brand hover:bg-brand/90 text-white font-medium py-3 px-6 rounded-lg transition-colors ${
                      isEnrolling ? "opacity-70 cursor-not-allowed" : ""
                    }`}>
                    {isEnrolling ? "Enrolling..." : "Enroll Now"}
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClassPage;

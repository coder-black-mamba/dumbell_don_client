import React, { useState, useEffect } from 'react';
import { FaClock, FaUserFriends, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { authApiClient } from '../services/apiServices';
import Loader from '../components/common/Loader';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await authApiClient.get('fitness-classes/');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
        // You might want to add error handling here
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const categories = [
    { id: 'all', name: 'All Classes' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'strength', name: 'Strength Training' }
  ];

  const formatDateTime = (dateTimeString) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  const formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const filteredClasses = activeFilter === 'all' 
    ? classes 
    : classes.filter(cls => 
        cls.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
        cls.description.toLowerCase().includes(activeFilter.toLowerCase())
      );

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleBookNow = (cls) => {
    navigate(`/classes/${cls.id}`);
  };

  if (loading) return<div className="flex justify-center items-center h-screen"><Loader /></div>;

  return (
    <div className="min-h-screen bg-base-300 py-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Classes
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join our expert-led fitness classes designed for all levels. Find the perfect workout that fits your schedule.
          </p>
        </div>
      </div>

      {/* Class Filters */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeFilter === category.id
                  ? 'bg-brand text-white'
                  : 'bg-base-100 text-gray-700 hover:bg-base-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search classes..."
              className="input input-bordered w-full pl-10"
              value={activeFilter === 'all' ? '' : activeFilter}
              onChange={(e) => setActiveFilter(e.target.value || 'all')}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600">No classes found. Try a different search.</p>
            </div>
          ) : filteredClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              variants={fadeInUp}
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-brand/20 transition-all duration-300 border border-gray-800 hover:border-brand/30"
            >
              <div className="relative">
                <img 
                  src={`https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80`} 
                  alt={cls.title}
                  className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white">{cls.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cls.is_active ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                      : 'bg-red-900/30 text-red-400 border border-red-500/30'
                    }`}>
                      {cls.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 line-clamp-2 mb-4">{cls.description}</p>
                
                <div className="space-y-3 border-t border-gray-800 pt-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <FaClock className="mr-3 text-brand" />
                    <div>
                      <p className="text-white font-medium">{formatDateTime(cls.start_datetime)}</p>
                      <p className="text-xs text-gray-500">{cls.duration_minutes} minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400">
                    <FaUserFriends className="mr-3 text-brand" />
                    <div>
                      <p className="text-white font-medium">{cls.capacity} spots available</p>
                      <p className="text-xs text-gray-500">Class capacity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400">
                    <FaDollarSign className="mr-3 text-brand" />
                    <div>
                      <p className="text-white font-medium">{formatPrice(cls.price_cents)}</p>
                      <p className="text-xs text-gray-500">Per session</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start text-sm text-gray-400 pt-2 border-t border-gray-800">
                    <FaMapMarkerAlt className="mt-1 mr-3 text-brand flex-shrink-0" />
                    <span className="text-gray-300">{cls.location}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => handleBookNow(cls)}
                    className="w-full bg-brand hover:bg-brand/90 text-black font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    View Class Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4 ">Can't Find What You're Looking For?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We offer custom training programs and private sessions. Contact us to create a personalized fitness plan.
          </p>
          <button className="bg-brand hover:bg-brand/90 text-white font-medium py-3 px-8 rounded-full transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
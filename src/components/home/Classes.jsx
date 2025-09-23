import React , { useState , useEffect } from 'react';
import SectionTitle from '../SectionTitle';
import { FaDumbbell, FaRunning, FaFire, FaHeartbeat, FaClock, FaUserFriends , FaMapMarkerAlt} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {apiClient} from '../../services/apiServices';


const icons=[
  <FaFire className="w-6 h-6" />,
  <FaDumbbell className="w-6 h-6" />,
  <FaRunning className="w-6 h-6" />,
  <FaHeartbeat className="w-6 h-6" />,
]





const Classes = () => {
  const [fitnessClasses, setFitnessClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);
     (async () => {
      try {
      const response = await apiClient.get('/fitness-classes');
      const data = response.data;
      setFitnessClasses(data.slice(0, 4));
      setLoading(false);
      } catch (error) {
        setLoading(false)
        console.error('Error fetching classes:', error);
      }
     })()
    }, [])
  
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Classes"
          subtitle="Find Your Fit"
          description="Discover the perfect workout for your fitness journey"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
          {loading ? (
            <div className="flex justify-center items-center h-48 w-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
            </div>
          ) : fitnessClasses.map((cls) => (
            <motion.div
              key={cls.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cls.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80" }
                  alt={cls.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <div className="bg-brand text-white px-3 py-1 rounded-full text-xs font-semibold">
                    HIGH
                  </div>
                  <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    {cls.capacity} spots left
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-brand/10 text-brand rounded-lg mr-3 flex-shrink-0">
                    {icons[Math.floor(Math.random() * icons.length)]}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {cls.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2 flex-1">{cls.description}</p>
                
                <div className="space-y-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FaClock className="w-4 h-4 mr-2 text-brand" />
                    <span className="font-medium">Time: </span>
                    <span className="ml-1">
                      {new Date(cls.start_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(cls.end_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaUserFriends className="w-4 h-4 mr-2 text-brand" />
                    <span>Instructor: <span className="font-medium">#{cls.instructor}</span></span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-brand" />
                    <span>Location: <span className="font-medium">{cls.location}</span></span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${(cls.price_cents / 100).toFixed(2)}
                  </span>
                  <Link to={{ pathname: `/classes/${cls.id}`, state: cls }} >
                    <button className="bg-brand hover:bg-brand/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Book Now
                    </button>
                  </Link>
                  </div>
                  {/* <button className="mt-4 w-full bg-brand hover:bg-brand/90 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Join Class
                  </button> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Link to="/classes">
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-full font-medium transition-colors">
              View All Classes
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Classes;
import React, { useState } from 'react';
import { FaClock, FaUserFriends, FaFire, FaDumbbell, FaHeartbeat, FaRunning } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const ClassesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const classes = [
    {
      id: 1,
      title: 'HIIT Training',
      instructor: 'Sarah Johnson',
      time: '07:00 AM - 08:00 AM',
      capacity: 20,
      level: 'Advanced',
      category: 'cardio',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      icon: <FaFire className="text-orange-500 text-2xl" />
    },
    {
      id: 2,
      title: 'Power Lifting',
      instructor: 'Mike Chen',
      time: '06:00 PM - 07:30 PM',
      capacity: 15,
      level: 'Intermediate',
      category: 'strength',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      icon: <FaDumbbell className="text-blue-500 text-2xl" />
    },
    {
      id: 3,
      title: 'Yoga Flow',
      instructor: 'Emma Wilson',
      time: '09:00 AM - 10:00 AM',
      capacity: 25,
      level: 'All Levels',
      category: 'mind-body',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80',
      icon: <FaHeartbeat className="text-green-500 text-2xl" />
    },
    {
      id: 4,
      title: 'Zumba',
      instructor: 'Carlos Mendez',
      time: '06:00 PM - 07:00 PM',
      capacity: 30,
      level: 'Beginner',
      category: 'cardio',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      icon: <FaRunning className="text-purple-500 text-2xl" />
    }
  ];

  const categories = [
    { id: 'all', name: 'All Classes' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'strength', name: 'Strength' },
    { id: 'mind-body', name: 'Mind & Body' }
  ];

  const filteredClasses = activeFilter === 'all' 
    ? classes 
    : classes.filter(cls => cls.category === activeFilter);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  const handleBookNow = (cls) => {
    navigate(`/classes/${cls.id}`);
  };

  return (
    <div className="min-h-screen bg-base-300 py-16 ">
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
            Join our expert-led classes designed for all fitness levels. Find the perfect workout that fits your schedule.
          </p>
        </div>
      </div>

      {/* Class Filters */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeFilter === category.id
                  ? 'bg-brand text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-brand text-white text-sm font-medium px-3 py-1 rounded-full">
                      {cls.level}
                    </span>
                    <div className="flex items-center text-white">
                      <FaUserFriends className="mr-1" />
                      <span className="text-sm">{cls.capacity} spots</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  {cls.icon}
                  <h3 className="text-xl font-bold ml-2 text-base-300">{cls.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">With {cls.instructor}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaClock className="mr-2" />
                  <span>{cls.time}</span>
                </div>
                
                <button onClick={(cls) => handleBookNow(cls)} className="w-full bg-brand hover:bg-brand/90 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Book Now
                </button>
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
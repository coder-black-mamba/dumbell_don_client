import React from 'react';
import SectionTitle from '../SectionTitle';
import { FaDumbbell, FaRunning, FaFire, FaHeartbeat, FaClock, FaUserFriends } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const fitnessClasses = [
  {
    id: 1,
    title: "HIIT Training",
    description: "High-Intensity Interval Training to burn maximum calories",
    duration: "45 min",
    intensity: "High",
    trainer: "Sarah Johnson",
    icon: <FaFire className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 2,
    title: "Strength & Conditioning",
    description: "Build muscle and improve overall strength only 30 days",
    duration: "60 min",
    intensity: "Medium",
    trainer: "Mike Chen",
    icon: <FaDumbbell className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 3,
    title: "Cardio Blast",
    description: "Heart-pumping cardio workout for endurance",
    duration: "50 min",
    intensity: "High",
    trainer: "Emma Davis",
    icon: <FaRunning className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80"
  },
  {
    id: 4,
    title: "Yoga & Mobility",
    description: "Improve flexibility and mind-body connection",
    duration: "60 min",
    intensity: "Low",
    trainer: "Priya Patel",
    icon: <FaHeartbeat className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80"
  }
];

const Classes = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Classes"
          subtitle="Find Your Fit"
          description="Discover the perfect workout for your fitness journey"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
          {fitnessClasses.map((cls) => (
            <motion.div
              key={cls.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {cls.intensity}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-brand/10 text-brand rounded-lg mr-3">
                    {cls.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{cls.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{cls.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{cls.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUserFriends className="mr-1" />
                    <span>With {cls.trainer}</span>
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-brand hover:bg-brand/90 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Join Class
                </button>
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
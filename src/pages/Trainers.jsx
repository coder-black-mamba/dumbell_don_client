import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaDumbbell, FaHeartbeat, FaRunning, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Trainers = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const trainers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Head Trainer & Nutritionist',
      specialization: ['HIIT', 'CrossFit', 'Weight Loss'],
      experience: '8 years',
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      bio: 'Certified personal trainer with a passion for helping clients achieve their fitness goals through customized workout plans and nutrition guidance.'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Strength & Conditioning Coach',
      specialization: ['Powerlifting', 'Strength Training', 'Athletic Performance'],
      experience: '10 years',
      rating: 4.8,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      bio: 'Former competitive powerlifter turned coach, specializing in strength development and functional movement patterns.'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Yoga & Mindfulness Instructor',
      specialization: ['Vinyasa Yoga', 'Meditation', 'Flexibility'],
      experience: '6 years',
      rating: 4.9,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      bio: 'RYT-500 certified yoga instructor with a holistic approach to health and wellness, focusing on mind-body connection.'
    }
  ];

  const specializations = [
    { id: 'all', name: 'All Trainers' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'strength', name: 'Strength Training' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'crossfit', name: 'CrossFit' }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Meet Our Expert Trainers
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our certified fitness professionals are dedicated to helping you achieve your fitness goals with personalized training programs.
          </p>
        </div>
      </div>

      {/* Specialization Filters */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {specializations.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setActiveFilter(spec.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeFilter === spec.id
                  ? 'bg-brand text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {spec.name}
            </button>
          ))}
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{trainer.name}</h3>
                      <p className="text-brand font-medium">{trainer.role}</p>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-white font-medium">{trainer.rating}</span>
                      <span className="text-gray-300 text-sm ml-1">({trainer.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.specialization.map((spec, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6">{trainer.bio}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{trainer.experience}</span> Experience
                  </div>
                  <div className="flex space-x-3">
                    {Object.entries(trainer.social).map(([platform, url]) => {
                      const Icon = {
                        facebook: FaFacebook,
                        twitter: FaTwitter,
                        instagram: FaInstagram,
                        linkedin: FaLinkedin
                      }[platform];
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-brand transition-colors"
                          aria-label={`${trainer.name}'s ${platform}`}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-brand hover:bg-brand/90 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Book Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Become a Trainer</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Are you a certified fitness professional? Join our team of expert trainers and help others achieve their fitness goals.
          </p>
          <button className="bg-brand hover:bg-brand/90 text-white font-medium py-3 px-8 rounded-full transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trainers;
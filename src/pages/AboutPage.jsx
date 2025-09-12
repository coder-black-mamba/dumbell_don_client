import React from 'react';
import { FaDumbbell, FaHeartbeat, FaUsers, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const features = [
    {
      icon: <FaDumbbell className="text-4xl text-brand mb-4" />,
      title: 'Modern Equipment',
      description: 'State-of-the-art fitness equipment for all your workout needs.'
    },
    {
      icon: <FaHeartbeat className="text-4xl text-brand mb-4" />,
      title: 'Expert Trainers',
      description: 'Certified professionals to guide you on your fitness journey.'
    },
    {
      icon: <FaUsers className="text-4xl text-brand mb-4" />,
      title: 'Community',
      description: 'Join a supportive community of fitness enthusiasts.'
    },
    {
      icon: <FaMedal className="text-4xl text-brand mb-4" />,
      title: 'Proven Results',
      description: 'Transform your body and achieve your fitness goals.'
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">About Dumbbell Don</h1>
            <p className="text-xl text-gray-300 mb-8">
              Empowering your fitness journey with world-class facilities, expert trainers, and a supportive community.
            </p>
          </motion.div>
        </div>
      </div>

       <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-400 mb-6">
                Founded in 2010, Dumbbell Don started as a small fitness center with a big vision: to create a community where everyone feels welcome and empowered to achieve their fitness goals. What began as a single location has grown into a premier fitness destination known for its state-of-the-art facilities and exceptional training programs.
              </p>
              <p className="text-gray-400">
                Our mission is to inspire and support individuals on their fitness journey, providing the tools, knowledge, and motivation needed to transform lives through health and wellness.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Modern gym interior with equipment and natural light" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div> 
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-300">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <div className="w-20 h-1 bg-brand mx-auto mb-8" style={{ backgroundColor: "#C60822" }}></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-base-300">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       <section className="py-20 bg-gradient-to-r bg-base-200 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Dumbbell Don today and take the first step towards a healthier, stronger you.
            </p>
            <button className="bg-white text-brand font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300">
              Join Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
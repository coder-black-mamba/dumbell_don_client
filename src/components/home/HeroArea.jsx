import React from "react";
import { motion } from "framer-motion";
import HeroAreaImage from "../../assets/hero-bg.jpg";
import { FaDumbbell, FaMedal, FaClock } from "react-icons/fa";

const stats = [
  {
    icon: <FaDumbbell className="w-6 h-6 text-brand" />,
    value: "500+",
    label: "Happy Customers"
  },
  {
    icon: <FaMedal className="w-6 h-6 text-brand" />,
    value: "50+",
    label: "Certified Trainers"
  },
  {
    icon: <FaClock className="w-6 h-6 text-brand" />,
    value: "50+",
    label: "Years Experience"
  }
];

const HeroArea = () => {
  return (
    <section 
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${HeroAreaImage})`,
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center my-10 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Transform Your <span className="text-brand">Body</span>, <br />
              Transform Your <span className="text-brand">Life</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our fitness community and start your journey to a healthier, stronger you. 
              With personalized training programs and expert guidance, we'll help you achieve 
              your fitness goals faster than you ever thought possible.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand hover:bg-brand/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-brand/10 rounded-full mb-3">
                    {stat.icon}
                  </div>
                  <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-sm text-gray-300 text-center">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

// Add these styles to your global CSS file or in a style tag
const styles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;

export default HeroArea;
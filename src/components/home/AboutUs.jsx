import React from 'react';
import SectionTitle from '../SectionTitle';
import { FaDumbbell, FaHeartbeat, FaUsers, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaDumbbell className="w-8 h-8 text-brand" />,
    title: 'Expert Trainers',
    description: 'Certified professionals with years of experience'
  },
  {
    icon: <FaHeartbeat className="w-8 h-8 text-brand" />,
    title: 'Personalized Plans',
    description: 'Customized workout and nutrition plans'
  },
  {
    icon: <FaUsers className="w-8 h-8 text-brand" />,
    title: 'Community',
    description: 'Join our supportive fitness community'
  },
  {
    icon: <FaMedal className="w-8 h-8 text-brand" />,
    title: 'Proven Results',
    description: 'Transformations you can see and feel'
  }
];

const AboutUs = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-base-100 to-base-200">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-brand/5 -skew-y-2 transform origin-top-left"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Our Story"
          subtitle="Get to Know Us"
          description="Transforming lives through fitness, one rep at a time"
          center
        />

        <div className="flex flex-col lg:flex-row items-center gap-12 mt-16">
          {/* Image Section */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Fitness Training"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand text-white p-6 rounded-2xl shadow-lg w-3/4">
                <h4 className="text-2xl font-bold mb-2">5+ Years</h4>
                <p className="text-sm opacity-90">Of transforming lives through fitness</p>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-base-content mb-6">
                More Than Just <span className="text-brand">A Gym</span>
              </h2>
              <p className="text-lg text-base-content/80 leading-relaxed mb-8">
                At Dumbell Don, we believe in building more than just muscles. We build confidence, community, 
                and lasting lifestyle changes. Our certified trainers are dedicated to helping you achieve 
                your fitness goals through personalized training programs and expert guidance.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-base-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-2 bg-brand/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-base-content">{feature.title}</h4>
                      <p className="text-base-content/70">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="px-8 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand/90 transition-colors duration-300 flex items-center gap-2">
                Join Our Community
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs

import React from 'react';
import SectionTitle from '../SectionTitle';
import { FaDumbbell, FaUsers, FaAppleAlt, FaHeartbeat } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';

const Services = () => {
  const services = [
    {
      icon: <FaDumbbell className="w-12 h-12 text-brand mb-4" />,
      title: "Personal Training",
      description: "One-on-one sessions with certified trainers to create a personalized workout plan tailored to your specific goals and fitness level."
    },
    {
      icon: <FaUsers className="w-12 h-12 text-brand mb-4" />,
      title: "Group Classes",
      "description": "Join our high-energy group workouts designed to motivate and challenge you while building a supportive community."
    },
    {
      icon: <FaAppleAlt className="w-12 h-12 text-brand mb-4" />,
      title: "Nutrition Planning",
      "description": "Customized nutrition plans and counseling to complement your fitness journey and optimize your results."
    },
    {
      icon: <GiWeightLiftingUp className="w-12 h-12 text-brand mb-4" />,
      title: "Strength Training",
      "description": "Specialized programs to build strength, increase muscle mass, and improve overall physical performance."
    },
    {
      icon: <FaHeartbeat className="w-12 h-12 text-brand mb-4" />,
      title: "Cardio Programs",
      "description": "Customized cardiovascular training to improve endurance, burn calories, and enhance heart health."
    }
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className='container mx-auto px-4'>
        <SectionTitle 
          title="Our Services" 
          description="Discover our comprehensive range of fitness services designed to help you achieve your health and wellness goals." 
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
          {services.map((service, index) => (
            <div 
              key={index}
              className='p-8 bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center'
            >
              <div className='bg-brand/10 p-4 rounded-full mb-6'>
                {service.icon}
              </div>
              <h3 className='text-2xl font-bold text-base-content mb-4'>{service.title}</h3>
              <p className='text-base-content/80 leading-relaxed'>{service.description}</p>
              <button className='mt-6 px-6 py-2 bg-brand text-white rounded-full hover:bg-brand/90 transition-colors duration-300 text-sm font-medium'>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
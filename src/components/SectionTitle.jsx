import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, description, align = 'center' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <motion.div 
      className={`flex flex-col ${alignClasses[align]} mb-12 md:mb-16`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.div 
        className="relative inline-block mb-4"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-brand">
          {title}
        </h2>
        <div className="absolute -bottom-2 left-0 w-16 h-1 bg-brand rounded-full" />
      </motion.div>
      
      {description && (
        <motion.p 
          className={`text-gray-600 text-base md:text-lg max-w-2xl mt-4 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
          variants={itemVariants}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
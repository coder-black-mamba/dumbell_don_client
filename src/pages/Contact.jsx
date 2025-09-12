import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    try {
      // Replace with your form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({ submitting: false, submitted: false, error: 'Failed to send message. Please try again.' });
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-brand" />,
      title: 'Visit Us',
      description: '123 Fitness Street, Gym City, 10001',
      link: 'https://maps.google.com',
      linkText: 'View on Map'
    },
    {
      icon: <FaPhoneAlt className="text-2xl text-brand" />,
      title: 'Call Us',
      description: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      linkText: 'Call Now'
    },
    {
      icon: <FaEnvelope className="text-2xl text-brand" />,
      title: 'Email Us',
      description: 'info@dumbelldon.com',
      link: 'mailto:info@dumbelldon.com',
      linkText: 'Send Email'
    },
    {
      icon: <FaClock className="text-2xl text-brand" />,
      title: 'Working Hours',
      description: 'Mon - Fri: 6:00 AM - 10:00 PM\nSat - Sun: 8:00 AM - 8:00 PM',
      link: null
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get In Touch
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of these channels.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 whitespace-pre-line mb-4">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  className="text-brand font-medium hover:underline inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.linkText}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <SectionTitle 
              title="Send Us a Message" 
              description="Have questions about our services? Fill out the form below and we'll get back to you as soon as possible."
              align="left"
            />
            
            {formStatus.submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full flex items-center justify-center bg-brand hover:bg-brand/90 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-70"
                  >
                    {formStatus.submitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FaPaperPlane className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-full min-h-[500px] bg-gray-100 rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209057074!2d-73.98784492460072!3d40.75798597139178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Our Location"
              className="rounded-xl"
            ></iframe>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r bg-base-300 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Dumbbell Don today and take the first step towards a healthier, stronger you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/membership"
              className="bg-white text-brand font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
            >
              Join Now
            </a>
            <a
              href="/classes"
              className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
            >
              View Classes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
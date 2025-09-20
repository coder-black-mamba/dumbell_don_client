import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { Link } from 'react-router';
import Logo from '../assets/logo_white.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Pricing', path: '/subscriptions' },
    { name: 'Contact', path: '/contact' },
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt className="mr-3" />, text: '123 Fitness Street, Gym City, 10001' },
    { icon: <FaPhoneAlt className="mr-3" />, text: '+1 (555) 123-4567' },
    { icon: <FaEnvelope className="mr-3" />, text: 'info@dumbelldon.com' },
    { icon: <FaClock className="mr-3" />, text: 'Mon - Fri: 6:00 AM - 10:00 PM' },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com' },
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaYoutube />, url: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img src={Logo} alt="Dumbbell Don" className="h-20 mb-4" />
            </Link>
            <p className="text-gray-400">
              Transform your body, transform your life. Join our community of fitness enthusiasts 
              and start your journey to a healthier, stronger you today.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand text-xl transition-colors duration-300"
                  aria-label={`Follow us on ${social.url.split('//')[1]}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-brand transition-colors duration-300 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-brand rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-brand mt-1">{item.icon}</span>
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand hover:bg-brand/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {currentYear} Dumbell Don. All rights reserved. | 
            <Link to="/privacy" className="hover:text-brand ml-1">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-brand ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

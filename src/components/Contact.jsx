
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import PropTypes from 'prop-types';
import { useState } from 'react';

function ContactSection({ handleCopyPhone }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
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
    setStatus({ submitting: true, success: false, error: false, message: '' });

    try {
      const response = await fetch('https://sp-electro-1.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipient: 'spelectro.contact@gmail.com'
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus({
          submitting: false,
          success: true,
          error: false,
          message: 'Thank you! Your message has been sent.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: error.message || 'Failed to send message. Please try again.'
      });
    }
  };
  return (
    <AnimatedSection className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 h-32"
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  disabled={status.submitting}
                  whileHover={{ scale: status.submitting ? 1 : 1.05 }}
                  whileTap={{ scale: status.submitting ? 1 : 0.95 }}
                  className={`w-full py-2 rounded-md ${status.submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </motion.button>
                
                {status.success && (
                  <div className="mt-3 p-2 bg-green-100 text-green-700 rounded-md text-center">
                    {status.message}
                  </div>
                )}
                
                {status.error && (
                  <div className="mt-3 p-2 bg-red-100 text-red-700 rounded-md text-center">
                    {status.message}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">Store Location</h3>
              <div className="h-64 w-full rounded-lg overflow-hidden">
                <iframe
                  className="h-64 w-full"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3802.095644408684!2d75.913299550867!3d17.64562851512867!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5da104bf9f617%3A0x1d7144abdbd5ca80!2s149%2FA%2C%20Hotgi%20Rd%2C%20near%20DIC%20office%2C%20Murarji%20Peth%2C%20Solapur%2C%20Maharashtra%20413001!5e0!3m2!1sen!2sin!4v1668150625484!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-lg">SP Electro</h4>
                <p className="text-gray-600">
                  149/A, Hotgi Rd, near DIC office, Murarji Peth, Solapur,
                  Maharashtra 413001
                </p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">Shop Timings</h3>
              <ul className="text-gray-600 mb-4">
                <li>Monday - Saturday: 10:30 AM - 7:30 PM</li>
                <li>Sunday: Closed</li>
              </ul>

              <div className="text-gray-600">
                <h4 className="font-semibold mb-2">Contact Us</h4>
                <p
                  onClick={handleCopyPhone}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                >
                  +91 9404702745
                </p>
                <p
                  onClick={handleCopyPhone}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                >
                  +91 9404703645
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


ContactSection.propTypes = {
  handleCopyPhone: PropTypes.func.isRequired, 
};

export default ContactSection;

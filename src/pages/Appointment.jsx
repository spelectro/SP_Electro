import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    vehicle: '',
    type: 'test-drive'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Book an Appointment</h1>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              className="w-full border rounded-md px-3 py-2"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Preferred Date</label>
            <input
              type="date"
              className="w-full border rounded-md px-3 py-2"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Preferred Time</label>
            <input
              type="time"
              className="w-full border rounded-md px-3 py-2"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Vehicle Model</label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={formData.vehicle}
              onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
              required
            >
              <option value="">Select a vehicle</option>
              <option value="Rikshaw">EV Rikshaw</option>
              <option value="Hindustan EV">Hindustan Power EV</option>
              <option value="Loader-2">2 Wheeler Loader</option>
              <option value="Loader-3">3 Wheeler Loader</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Appointment Type</label>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="type"
                value="test-drive"
                checked={formData.type === 'test-drive'}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              />
              <span className="ml-2">Test Drive</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="type"
                value="consultation"
                checked={formData.type === 'consultation'}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              />
              <span className="ml-2">Consultation</span>
            </label>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Book Appointment
        </motion.button>
      </motion.form>
    </div>
  );
}
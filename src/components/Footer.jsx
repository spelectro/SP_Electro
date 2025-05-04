import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(auth);
    };
    
    // Check on initial load
    checkAuth();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkAuth);
    
    // Custom event for auth changes within the app
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
    
    // Redirect to home page
    navigate('/');
    
    alert('You have been logged out successfully');
  };
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Leading the electric revolution with innovative and sustainable
              mobility solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/vehicles" className="text-gray-400 hover:text-white">
                  Vehicles
                </a>
              </li>
              <li>
                <a href="/accessories" className="text-gray-400 hover:text-white">
                  Accessories
                </a>
              </li>
              <li>
                <a href="/appointment" className="text-gray-400 hover:text-white">
                  Book Appointment
                </a>
              </li>
              <li>
                {isAuthenticated ? (
                  <button 
                    onClick={handleLogout} 
                    className="text-gray-400 hover:text-white bg-transparent border-none p-0 cursor-pointer"
                  >
                    Admin Logout
                  </button>
                ) : (
                  <a href="/login" className="text-gray-400 hover:text-white">
                    Admin Login
                  </a>
                )}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Gangadhar Housing Society</li>
              <li>Opp. La Adiccion Cafe</li>
              <li>Near DIC office, Hotgi Road</li>
              <li>Solapur-413003</li>
              <li>Phone: +91 9404702745</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SP Electro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

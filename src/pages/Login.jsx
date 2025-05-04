import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Sending OTP request for email:', email);
      
      // Skip the login endpoint and directly use send-otp since that endpoint exists on the deployed server
      const otpResponse = await fetch('https://sp-electro-1.onrender.com/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'omit'
      });

      try {
        // Check if the response is JSON
        const otpContentType = otpResponse.headers.get('content-type');
        if (!otpContentType || !otpContentType.includes('application/json')) {
          const text = await otpResponse.text();
          console.error('Non-JSON response received:', text);
          
          // If the response contains 'Unauthorized', it's likely an authorization error
          if (text.includes('Unauthorized')) {
            setError('Unauthorized email address. Only admin emails are allowed.');
          } else {
            setError('Server error: Invalid response format');
          }
          setLoading(false);
          return;
        }

        const otpData = await otpResponse.json();
        console.log('OTP response:', otpData);

        if (otpResponse.ok) {
          console.log('OTP sent successfully');
          setOtpSent(true);
          setError('');
        } else {
          console.log('Failed to send OTP:', otpData.message);
          setError(otpData.message || 'Failed to send OTP');
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        setError('Error processing server response');
      }
    } catch (err) {
      console.error('Error during login/OTP process:', err);
      setError('Network error. Please try again. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Verifying OTP for email:', email, 'OTP:', otp);
      
      const response = await fetch('https://sp-electro-1.onrender.com/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
        credentials: 'omit'
      });

      try {
        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Non-JSON response received:', text);
          
          if (text.includes('Invalid') || text.includes('expired')) {
            setError('Invalid or expired OTP. Please try again.');
          } else {
            setError('Server error: Invalid response format');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('OTP verification response:', data);

        if (response.ok) {
          console.log('OTP verification successful');
          // Store authentication state
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', email);
          
          // Show success message
          setError('');
          alert('Login successful! Redirecting to admin panel...');
          
          // Redirect to admin page
          navigate('/admin');
        } else {
          console.log('OTP verification failed:', data.message);
          setError(data.message || 'Invalid OTP');
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        setError('Error processing server response');
      }
    } catch (err) {
      console.error('Error during OTP verification:', err);
      setError('Network error. Please try again. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-blue-700">Admin Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!otpSent ? (
          <form className="space-y-6" onSubmit={handleSendOtp}>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your admin email"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Only authorized emails can access the admin panel.</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded-lg transition duration-300`}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifyOtp}>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter the OTP sent to your email"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Check your email for the OTP code.</p>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded-lg transition duration-300`}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Back to Email Entry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;

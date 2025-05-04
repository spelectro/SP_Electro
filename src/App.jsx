
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import AdminVehicles from "./pages/AdminVehicles";
import Accessories from './pages/Accessories';
import AdminAccessories from './pages/AdminAccessories.jsx';
// import Appointment from './pages/Appointment';
import Appointment from './pages/Appointment2.jsx';
import Footer from './components/Footer';
import Error from './pages/Error';
import WhatsAppMessage from './pages/WhatsAppMessage';
import Login from './pages/Login.jsx';
import Verification from './pages/Verification.jsx';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/adminvehicles" element={
              <ProtectedRoute>
                <AdminVehicles />
              </ProtectedRoute>
            } />
            <Route path="/adminaccessories" element={
              <ProtectedRoute>
                <AdminAccessories />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Navigate to="/adminvehicles" replace />
              </ProtectedRoute>
            } />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <WhatsAppMessage />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Temples from './pages/Temples';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/temples" element={user ? <Temples /> : <Navigate to="/login" />} />
        <Route path="/booking/:id" element={user ? <Booking /> : <Navigate to="/login" />} />
        <Route path="/my-bookings" element={user ? <MyBookings /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
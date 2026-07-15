import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Temples from './pages/Temples';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/temples" element={user ? <Temples /> : <Navigate to="/login" />} />
        <Route path="/booking/:id" element={user ? <Booking /> : <Navigate to="/login" />} />
        <Route path="/mybookings" element={user ? <MyBookings /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
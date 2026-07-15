import { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/bookings')
    .then(res => setBookings(res.data))
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-800 mb-6">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-bold">Booking ID: {booking.bookingId}</p>
              <p>Name: {booking.userName}</p>
              <p>Date: {booking.date} | Slot: {booking.slot}</p>
              
              {/* QR CODE SHOWS HERE */}
              {booking.qrCode && (
                <div className="mt-3">
                  <p className="font-semibold">Show this QR at Temple:</p>
                  <img src={booking.qrCode} alt="QR" className="w-32 h-32 border"/>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
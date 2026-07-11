import { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBookings = async () => {
      if(user?.phone) {
        try {
          const res = await axios.get(`http://localhost:8000/api/temples/bookings/${user.phone}`);
          setBookings(res.data);
        } catch(err) {
          console.log(err);
        }
        setLoading(false);
      }
    };
    fetchBookings();
  }, []); // EMPTY ARRAY = run only once

  if(loading) return <div className="p-6 text-center">Loading...</div>;
  if(bookings.length === 0) return <div className="p-6 text-center">No bookings yet</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">My Bookings</h1>
      <div className="grid gap-4">
        {bookings.map(b => (
          <div key={b._id} className="border p-4 rounded-lg shadow bg-white">
            <h2 className="text-xl font-bold text-green-700">{b.templeName}</h2>
            <p><b>Date:</b> {new Date(b.date).toLocaleDateString()} | <b>Slot:</b> {b.slot}</p>
            <p><b>People:</b> {b.people} | <b>Booking ID:</b> {b.ticketId}</p>
            <div className="mt-2">
              <QRCodeSVG value={b.ticketId} size={100}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
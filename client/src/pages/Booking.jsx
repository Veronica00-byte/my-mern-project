import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);

  // All form fields
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    email: '',
    people: 1,
    date: '',
    slot: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/temples/${id}`)
    .then(res => {
        setTemple(res.data);
        setLoading(false);
      })
    .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleBooking = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/bookings', {
      templeId: id,
      ...formData
    })
  .then(() => {
      alert('Darshan Booked Successfully!');
      navigate('/mybookings');
    })
  .catch(err => alert('Booking Failed: ' + err.response?.data?.message));
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!temple) return <div className="p-10 text-center text-red-500">Temple not found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-2">Book Darshan</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <img src={`/temples/${temple.image}`} className="w-full h-48 object-cover rounded mb-4"/>
        <h2 className="text-2xl font-bold">{temple.templeName}</h2>
        <p className="text-red-600 mb-4">📍 {temple.location}</p>
        <p className="text-gray-600 mb-6">{temple.description}</p>
        
        <form onSubmit={handleBooking} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} required className="w-full border p-2 rounded"/>
          </div>

          {/* PHONE */}
          <div>
            <label className="block font-semibold mb-1">Phone Number</label>
            <input type="tel" name="userPhone" value={formData.userPhone} onChange={handleChange} required className="w-full border p-2 rounded"/>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded"/>
          </div>

          {/* PEOPLE */}
          <div>
            <label className="block font-semibold mb-1">No. of People</label>
            <input type="number" name="people" value={formData.people} onChange={handleChange} min="1" max="10" required className="w-full border p-2 rounded"/>
          </div>

          {/* DATE */}
          <div>
            <label className="block font-semibold mb-1">Select Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border p-2 rounded"/>
          </div>

          {/* SLOT */}
          <div>
            <label className="block font-semibold mb-1">Select Slot</label>
            <select name="slot" value={formData.slot} onChange={handleChange} required className="w-full border p-2 rounded">
              <option value="">--Choose Slot--</option>
              <option value="Morning 6AM-9AM">Morning 6AM-9AM</option>
              <option value="Afternoon 12PM-3PM">Afternoon 12PM-3PM</option>
              <option value="Evening 5PM-8PM">Evening 5PM-8PM</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
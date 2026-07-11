import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [fullName, setFullName] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if(!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    axios.get(`http://localhost:8000/api/temples/${id}`)
   .then(res => setTemple(res.data))
   .catch(err => console.log(err));
  }, [id, user, navigate]);

  const handleBooking = async () => {
    if(!date ||!slot ||!fullName) return alert("Fill all fields");
    if(!user ||!user._id ||!user.phone) return alert("User data missing. Please login again");
    
    setLoading(true);
    
    try {
      await axios.post('http://localhost:8000/api/temples/bookings', {
        templeId: id,
        templeName: temple.templeName,
        userId: user._id, // THIS WAS MISSING
        phone: user.phone,
        fullName,
        date,
        slot,
        people
      });
      alert("Booking Successful!");
      navigate('/my-bookings');
    } catch(err) {
      alert("Booking failed: " + err.response.data.message);
    }
    setLoading(false);
  };

  if(!user) return null;
  if(!temple) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-green-700 mb-2">Book Darshan</h1>
      <h2 className="text-xl mb-4">{temple.templeName}</h2>
      <img src={temple.image} className="w-full h-64 object-cover rounded mb-4" alt={temple.templeName}/>
      
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Full Name *</label>
          <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="border w-full p-2 rounded"/>
        </div>
        <div>
          <label className="block font-semibold mb-1">Phone Number *</label>
          <input type="text" value={user.phone} disabled className="border w-full p-2 rounded bg-gray-100"/>
        </div>
        <div>
          <label className="block font-semibold mb-1">Darshan Date *</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border w-full p-2 rounded" min={new Date().toISOString().split('T')[0]}/>
        </div>
        <div>
          <label className="block font-semibold mb-1">Time Slot *</label>
          <select value={slot} onChange={e => setSlot(e.target.value)} className="border w-full p-2 rounded">
            <option value="">Choose Slot</option>
            {temple.slots.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Number of People *</label>
          <input type="number" value={people} onChange={e => setPeople(e.target.value)} className="border w-full p-2 rounded" min="1" max="10"/>
        </div>
        
        <button onClick={handleBooking} disabled={loading} className="bg-green-600 text-white w-full py-3 rounded font-bold hover:bg-green-700 disabled:bg-gray-400">
          {loading? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default Booking;
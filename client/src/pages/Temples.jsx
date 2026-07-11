import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Temples = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/temples')
     .then(res => {
       setTemples(res.data);
       setLoading(false);
     })
     .catch(err => {
       console.log(err);
       setLoading(false);
     });
  }, []);

  if (loading) return <div className="p-6">Loading temples...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">All Temples</h1>
      
      {temples.length === 0 ? (
        <p>No temples found. Add data to DB.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temples.map(temple => (
            <div key={temple._id} className="border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl">
              <img src={temple.image} alt={temple.templeName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-green-700">{temple.templeName}</h2>
                <p className="text-gray-600 mb-2">📍 {temple.location}</p>
                <p className="text-gray-700 text-sm mb-4">{temple.description}</p>
                <Link 
                  to={`/booking/${temple._id}`} 
                  className="bg-green-600 text-white px-4 py-2 rounded block text-center hover:bg-green-700"
                >
                  Book Darshan
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Temples;
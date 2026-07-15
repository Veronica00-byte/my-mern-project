import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Temples = () => {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/temples')
      .then(res => setTemples(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">All Temples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {temples.map((temple) => (
          <div key={temple._id} className="bg-white rounded-lg shadow-md overflow-hidden border-gray-200">
            {/* IMAGE - Note the /temples/ prefix */}
            <img 
              src={`/temples/${temple.image}`} 
              alt={temple.templeName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              {/* NAME - Changed from temple.name to temple.templeName */}
              <h2 className="text-xl font-bold text-green-700 mb-1">{temple.templeName}</h2>
              {/* LOCATION */}
              <p className="text-sm text-red-600 flex items-center gap-1 mb-2">📍 {temple.location}</p>
              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm mb-4">{temple.description}</p>
              {/* BUTTON */}
              <Link 
                to={`/booking/${temple._id}`}
                className="block w-full text-center bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700"
              >
                Book Darshan
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temples;
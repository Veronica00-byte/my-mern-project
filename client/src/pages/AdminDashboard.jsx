import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [temples, setTemples] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [templesRes, usersRes] = await Promise.all([
          api.get('/temples'),
          api.get('/users')
        ]);
        setTemples(templesRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Failed to fetch admin data', error);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-3">Temples ({temples.length})</h2>
          <div className="space-y-2">
            {temples.map((temple) => (
              <div key={temple._id} className="p-2 bg-gray-50 rounded">
                <p className="font-medium">{temple.name}</p>
                <p className="text-sm text-gray-600">{temple.location}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Add New Temple
          </button>
        </div>

        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-3">Users ({users.length})</h2>
          <div className="space-y-2">
            {users.map((u) => (
              <div key={u._id} className="p-2 bg-gray-50 rounded">
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-600">{u.email} - {u.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
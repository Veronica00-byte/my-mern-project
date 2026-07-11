import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ name: '', phone: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Create fake user object with _id
    const userData = {
      _id: "user_" + form.phone, // fake id based on phone
      name: form.name,
      phone: form.phone
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    alert(`Welcome ${form.name}`);
    navigate('/temples');
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center h-[70vh]">
      <form onSubmit={handleLogin} className="border p-8 rounded-lg shadow-lg w-96 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Login to Book</h2>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={form.name} 
          onChange={e=>setForm({...form, name:e.target.value})} 
          required 
          className="border p-2 rounded w-full mb-4" 
        />
        <input 
          type="tel" 
          placeholder="Phone Number" 
          value={form.phone} 
          onChange={e=>setForm({...form, phone:e.target.value})} 
          pattern="[0-9]{10}" 
          required 
          className="border p-2 rounded w-full mb-4" 
        />
        <button className="bg-green-600 text-white px-6 py-2 rounded w-full hover:bg-green-700">Login</button>
      </form>
    </div>
  );
};
export default Login;
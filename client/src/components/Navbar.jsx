import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user'); // THIS LOGS OUT
    alert("Logged out successfully");
    navigate('/login');
  };

  return (
    <nav className="bg-green-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/temples" className="text-2xl font-bold">🛕 Temple Darshan</Link>
        
        <div className="flex gap-4 items-center">
          <Link to="/temples" className="hover:underline">Temples</Link>
          <Link to="/my-bookings" className="hover:underline">My Bookings</Link>
          {user && <span>Hi, {user.name}</span>}
          {user && (
            <button 
              onClick={handleLogout} 
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
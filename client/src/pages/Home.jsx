import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Darshan ease</h1>
      <p className="text-lg text-gray-600 mb-8">
        Book your darshan slots online and skip the queues
      </p>
      <Link 
        to="/temples" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
      >
        View Temples
      </Link>
    </div>
  );
};

export default Home;
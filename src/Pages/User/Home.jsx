import React from 'react';
import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineBusinessCenter, MdOutlineInventory2,
  MdOutlineLocationOn, MdOutlineStar, MdOutlineKeyboardArrowRight, MdOutlineLocalShipping
} from 'react-icons/md';
import { Link } from 'react-router-dom';

// --- Data Structures (Example Data) ---
const services = [
  { icon: <MdOutlineHome size={36} className="text-blue-600" />, title: 'House Moving', description: 'Complete household relocation',path:"/house-moving" },
  { icon: <MdOutlineDirectionsCar size={36} className="text-green-600" />, title: 'Car Moving', description: 'Safe vehicle transportation',path:"/car-moving" },
  { icon: <MdOutlineBusinessCenter size={36} className="text-purple-600" />, title: 'Office Shifting', description: 'Commercial relocation services' ,path:"/office-shifting"},
  { icon: <MdOutlineInventory2 size={36} className="text-orange-600" />, title: 'Storage', description: 'Secure storage solutions',path:"" },
];

const recentSearches = [
  { from: 'Koramangala', to: 'Whitefield' },
  { from: 'HSR Layout', to: 'Electronic City' },
  { from: 'Indiranagar', to: 'Marathahalli' },
];

const topMovers = [
  { name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km away', price: '₹1,200', icon: <MdOutlineLocalShipping size={24} className="text-orange-600" /> },
  { name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km away', price: '₹1,150', icon: <MdOutlineLocalShipping size={24} className="text-green-600" /> },
  { name: 'CityMove Pro', rating: 4.6, reviews: 756, distance: '4.2 km away', price: '₹1,350', icon: <MdOutlineLocalShipping size={24} className="text-blue-600" /> },
];

// --- Helper Components ---

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const RecentSearchItem = ({ from, to }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
    <div className="flex items-center gap-3">
      <MdOutlineLocationOn size={24} className="text-blue-600" />
      <span className="text-base text-gray-700">{from} to {to}</span>
    </div>
    <MdOutlineKeyboardArrowRight size={24} className="text-gray-400" />
  </div>
);

const MoverCard = ({ mover }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
    <div className="flex items-center gap-4">
      {mover.icon}
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-800">{mover.name}</span>
        <div className="flex items-center text-sm text-gray-600">
          <MdOutlineStar size={16} className="text-yellow-500 mr-1" />
          <span>{mover.rating} ({mover.reviews} reviews)</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-500">{mover.distance}</span>
        </div>
      </div>
    </div>
    <span className="text-lg font-bold text-blue-600">{mover.price}</span>
  </div>
);


// --- Main Component ---

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">
      
      {/* Services Section
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div> */}

        {/* Services Section */}
<div className="mb-8">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Services</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {services.map((service, index) => (
      <Link to={`${service.path}`} key={index}>
        <ServiceCard {...service} />
      </Link>
    ))}
  </div>
{/* </div> */}



       






      </div>

      {/* Recent Searches Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Searches</h2>
        <div className="flex flex-col gap-4">
          {recentSearches.map((search, index) => (
            <RecentSearchItem key={index} {...search} />
          ))}
        </div>
      </div>

      {/* Top Rated Movers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Rated Movers</h2>
        <div className="flex flex-col gap-4">
          {topMovers.map((mover, index) => (
            <MoverCard key={index} mover={mover} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;

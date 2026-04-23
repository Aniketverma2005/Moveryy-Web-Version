import { useState, useEffect } from 'react';
import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineBusinessCenter, MdOutlineInventory2,
  MdOutlineLocationOn, MdOutlineStar, MdOutlineKeyboardArrowRight, MdOutlineLocalShipping,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

// ── Static service cards ──────────────────────────────────────────────────────
const services = [
  { icon: <MdOutlineHome size={36} className="text-white" />, title: 'House Moving', description: 'Complete household relocation', path: '/house-moving', gradient: 'from-[#4285F4] to-[#3367D6]', serviceType: 'houseshift' },
  { icon: <MdOutlineDirectionsCar size={36} className="text-white" />, title: 'Car Moving', description: 'Safe vehicle transportation', path: '/car-moving', gradient: 'from-[#4285F4] to-[#3367D6]', serviceType: 'carshift' },
  { icon: <MdOutlineBusinessCenter size={36} className="text-white" />, title: 'Office Shifting', description: 'Commercial relocation services', path: '/office-shifting', gradient: 'from-[#4285F4] to-[#3367D6]', serviceType: 'officeshift' },
  { icon: <MdOutlineInventory2 size={36} className="text-white" />, title: 'Storage', description: 'Secure storage solutions', path: '', gradient: 'from-[#4285F4] to-[#3367D6]', serviceType: null },
];

// ── Components ────────────────────────────────────────────────────────────────
const ServiceCard = ({ icon, title, description, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-md flex flex-col items-center text-center cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-base font-bold text-white mb-1">{title}</h3>
    <p className="text-sm text-blue-100 opacity-90 leading-relaxed">{description}</p>
    <div className="mt-3 h-0.5 w-0 bg-white/60 rounded-full group-hover:w-10 transition-all duration-300" />
  </div>
);

const RecentSearchItem = ({ from, to }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
    <div className="flex items-center gap-3">
      <MdOutlineLocationOn size={24} className="text-[#4285F4]" />
      <span className="text-base text-gray-700">{from} to {to}</span>
    </div>
    <MdOutlineKeyboardArrowRight size={24} className="text-gray-400" />
  </div>
);

// Vehicle card — maps API response fields
const VehicleCard = ({ vehicle }) => {
  const name = vehicle?.organizationName || vehicle?.name || vehicle?.vehicleName || 'Mover';
  const rating = vehicle?.rating ?? 4.5;
  const reviews = vehicle?.reviews ?? vehicle?.totalReviews ?? 0;
  const distance = vehicle?.distance ? `${vehicle.distance} km away` : 'Nearby';
  const price = vehicle?.price ?? vehicle?.basePrice ?? vehicle?.pricing?.base;
  const formattedPrice = price ? `₹${Number(price).toLocaleString('en-IN')}` : 'Get Quote';

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <MdOutlineLocalShipping size={22} className="text-[#4285F4]" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-800">{name}</span>
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <MdOutlineStar size={14} className="text-yellow-500" />
            <span>{rating}</span>
            {reviews > 0 && <span className="text-gray-400">({reviews} reviews)</span>}
            <span className="text-gray-300 mx-1">•</span>
            <span className="text-gray-500">{distance}</span>
          </div>
        </div>
      </div>
      <span className="text-lg font-bold text-[#4285F4]">{formattedPrice}</span>
    </div>
  );
};

// Spinner
const Spinner = () => (
  <div className="flex items-center justify-center py-10">
    <div className="w-8 h-8 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const HomePage = () => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  });
  const [vehicles, setVehicles] = useState([]);
  const [vehicleLoad, setVehicleLoad] = useState(true);
  const [vehicleErr, setVehicleErr] = useState('');

  // ── 1. Fetch fresh user profile from API ──────────────────────────────────
  useEffect(() => {
    userService.getCurrentUser()
      .then(u => { if (u) setUser(u); })
      .catch(() => { }); // silently fall back to localStorage
  }, []);

  // ── 2. Fetch available vehicles (Delhi NCR default, houseshift) ───────────
  useEffect(() => {
    setVehicleLoad(true);
    setVehicleErr('');
    userService.getAvailableVehicles({
      serviceType: 'houseshift',
      capacityValue: 2,
      capacityUnit: 'bhk',
      distance: 10,
      pincode: '110001', // Delhi NCR — hardcoded for now
    })
      .then(data => setVehicles(Array.isArray(data) ? data : []))
      .catch(err => setVehicleErr(err?.message || 'Failed to load vehicles'))
      .finally(() => setVehicleLoad(false));
  }, []);

  const userName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
    : user?.name || 'there';

  const recentSearches = [
    { from: 'Koramangala', to: 'Whitefield' },
    { from: 'HSR Layout', to: 'Electronic City' },
    { from: 'Indiranagar', to: 'Marathahalli' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">

      {/* Welcome Banner */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : "Guest"} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Where would you like to move today?</p>
      </div>

      {/* Services Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            service.path
              ? <Link to={service.path} key={i}><ServiceCard {...service} /></Link>
              : <div key={i}><ServiceCard {...service} /></div>
          ))}
        </div>
      </div>

      {/* Recent Searches Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Searches</h2>
        <div className="flex flex-col gap-4">
          {recentSearches.map((s, i) => <RecentSearchItem key={i} {...s} />)}
        </div>
      </div>

      {/* Available Vehicles / Top Movers Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {vehicles.length > 0 ? 'Available Movers Near You' : 'Top Rated Movers'}
          </h2>
          <Link to="/compare" className="text-sm text-[#4285F4] hover:underline font-medium">
            View all →
          </Link>
        </div>

        {vehicleLoad && <Spinner />}

        {!vehicleLoad && vehicleErr && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-3">{vehicleErr}</p>
        )}

        {!vehicleLoad && !vehicleErr && vehicles.length > 0 && (
          <div className="flex flex-col gap-4">
            {vehicles.slice(0, 5).map((v, i) => (
              <VehicleCard key={v?.id || v?._id || i} vehicle={v} />
            ))}
          </div>
        )}

        {/* Fallback static data when API returns empty */}
        {!vehicleLoad && !vehicleErr && vehicles.length === 0 && (
          <div className="flex flex-col gap-4">
            {[
              { name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km away', price: '₹1,200' },
              { name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km away', price: '₹1,150' },
              { name: 'CityMove Pro', rating: 4.6, reviews: 756, distance: '4.2 km away', price: '₹1,350' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <MdOutlineLocalShipping size={22} className="text-[#4285F4]" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-800">{m.name}</p>
                    <div className="flex items-center text-sm text-gray-500 gap-1">
                      <MdOutlineStar size={14} className="text-yellow-500" />
                      <span>{m.rating} ({m.reviews} reviews)</span>
                      <span className="mx-1 text-gray-300">•</span>
                      <span>{m.distance}</span>
                    </div>
                  </div>
                </div>
                <span className="text-lg font-bold text-[#4285F4]">{m.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default HomePage;

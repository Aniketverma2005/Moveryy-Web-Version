import React from 'react';
import {
  MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineSort,
  MdOutlineViewList, MdOutlineFilterList, MdOutlineStar,
  MdOutlineAttachMoney, MdOutlineSecurity, MdOutlineLocalShipping,
  MdOutlinePeopleAlt, MdOutlineAccessTime, MdOutlineInfo,
  MdOutlineFormatListBulleted
} from 'react-icons/md';

// --- Data Structures (Example Data) ---
const availableMovers = [
  {
    name: 'QuickMove Express',
    rating: 4.8,
    reviews: 1250,
    distance: '2.5 km away',
    price: '₹1,200',
    tags: ['Insurance Included', 'Packing Service', '24/7 Support'],
    icon: <MdOutlineLocalShipping size={24} className="text-green-600" />,
  },
  {
    name: 'SafeShift Services',
    rating: 4.7,
    reviews: 980,
    distance: '3.1 km away',
    price: '₹1,150',
    tags: ['Investment Included', 'Professional Team', 'Quick Service'],
    icon: <MdOutlineLocalShipping size={24} className="text-orange-600" />,
  },
  {
    name: 'CityMove Pro',
    rating: 4.6,
    reviews: 750,
    distance: '4.2 km away',
    price: '₹1,350',
    tags: ['Premium Service', 'People Move Cost', 'Storage Options'],
    icon: <MdOutlineLocalShipping size={24} className="text-blue-600" />,
  },
  {
    name: 'FlexiMove Solutions',
    rating: 4.5,
    reviews: 601,
    distance: '9.1 km away',
    price: '₹950',
    tags: ['Budget Friendly', 'Local Expert', 'Quick Response'],
    icon: <MdOutlineLocalShipping size={24} className="text-cyan-600" />,
  },
];

// --- Helper Components ---

const FilterButton = ({ label, icon, isActive = false }) => (
  <button
    className={`flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-300 transition-colors duration-200 ${
      isActive
        ? 'bg-blue-600 text-white font-medium border-blue-600'
        : 'bg-white text-gray-700 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const MoverCard = ({ mover }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-200">
    
    {/* Header and Rating */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        {mover.icon}
        <span className="text-lg font-semibold text-gray-800">{mover.name}</span>
        <div className="flex items-center text-sm text-gray-600">
          <MdOutlineStar size={16} className="text-yellow-500 mr-1" />
          <span>{mover.rating} ({mover.reviews})</span>
          <span className="text-xs text-gray-500 ml-2">• {mover.distance}</span>
        </div>
      </div>
      <span className="text-green-600 text-sm font-medium">Verified</span>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {mover.tags.map((tag, index) => (
        <span key={index} className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
          {tag}
        </span>
      ))}
    </div>

    {/* Price and Button */}
    <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
      <div className="flex flex-col">
        <span className="text-xl font-bold text-blue-600">{mover.price}</span>
        <span className="text-xs text-gray-500">starting from</span>
      </div>
      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
        Book Now
      </button>
    </div>
  </div>
);

// --- Main Component ---

const MoverSearchPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">
      
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hassle-free House Moving</h1>
        <p className="text-gray-500 text-sm">Professional packers & movers for your complete home relocation</p>
        <p className="text-gray-500 text-xs mt-1">Get secure, reliable house moving services with professional packing, safe transportation, and timely delivery. Our verified movers ensure your belongings reach safely.</p>
      </div>

      {/* Plan Your Move (Input Fields) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Plan Your Move</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Pickup Location */}
          <div className="relative">
            <MdOutlineLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type="text"
              placeholder="Pickup Location"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Drop Location */}
          <div className="relative">
            <MdOutlineLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type="text"
              placeholder="Drop Location"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Picker */}
          <div className="relative">
            <MdOutlineCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MdOutlineCalendarToday className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Available Movers (4)</h3>
        <div className="flex items-center gap-3">
          <FilterButton label="List" icon={<MdOutlineViewList size={20} />} isActive={true} />
          <FilterButton label="Filters" icon={<MdOutlineFilterList size={20} />} isActive={false} />
          <div className="relative">
            <MdOutlineSort className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            <select className="w-40 pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Sort by Price</option>
              <option>Sort by Rating</option>
              <option>Sort by Distance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mover Listings */}
      <div className="flex flex-col gap-4 mb-8">
        {availableMovers.map((mover, index) => (
          <MoverCard key={index} mover={mover} />
        ))}
      </div>

      {/* House Moving Tips */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
          <MdOutlineInfo size={24} className="text-blue-600" />
          House Moving Tips
        </h3>
        <ul className="text-sm text-gray-700 space-y-2 ml-6 list-disc">
          <li>Start packing non-essential items 2 weeks before moving.</li>
          <li>Label boxes clearly with contents and destination room.</li>
          <li>Confirm insurance and service policies before packing.</li>
          <li>Keep important documents and valuables with you.</li>
        </ul>
      </div>
    </div>
  );
};

export default MoverSearchPage;
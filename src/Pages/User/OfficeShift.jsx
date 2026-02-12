import React, { useState } from 'react';
import {
  MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineSort,
  MdOutlineViewList, MdOutlineFilterList, MdOutlineApartment,
  MdOutlineInfo, MdOutlineKeyboardArrowDown, MdOutlineStar,
  MdOutlineFormatListBulleted
} from 'react-icons/md';

// --- Data Structures (Example Data) ---
const availableMovers = [
  {
    name: 'Corporate Move Pro',
    rating: 4.8,
    reviews: 142,
    distance: '1.2 km away',
    time: '1-2 days',
    price: '₹3,500',
    tags: ['Legal Offices', 'IT Equipment', 'Secure Documents', 'IT Setup', 'Furniture Assembly', 'Document Security', 'Weekend Service'],
    icon: <MdOutlineApartment size={24} className="text-blue-600" />,
  },
  {
    name: 'BizShift Solutions',
    rating: 4.8,
    reviews: 107,
    distance: '2.1 km away',
    time: '2-3 days',
    price: '₹2,800',
    tags: ['Small Offices', 'Quick Setup', 'Budget Friendly', 'Minimal Downtime', 'Professional Team', 'Insurance Included'],
    icon: <MdOutlineApartment size={24} className="text-red-600" />, // Using a different color for visual distinction
  },
  {
    name: 'Enterprise Relocators',
    rating: 4.7,
    reviews: 189,
    distance: '3.6 km away',
    time: '1 day',
    price: '₹4,200',
    tags: ['Large Offices', 'High Value Removal', 'Premium Service', 'Same Day Service', 'Crate Handling', 'Premium Support'],
    icon: <MdOutlineApartment size={24} className="text-green-600" />,
  },
  {
    name: 'StartupMove Express',
    rating: 4.6,
    reviews: 152,
    distance: '2.8 km away',
    time: '2-3 days',
    price: '₹2,200',
    tags: ['Small Offices', 'Co-working Spaces', 'Quick Moves', 'Startup Friendly', 'Flexible Timing', 'Basic IT Support'],
    icon: <MdOutlineApartment size={24} className="text-purple-600" />,
  },
];

const specialRequirements = [
  'Fragile equipment handling',
  'IT setup assistance',
  'Furniture assembly/disassembly',
  'Secure document handling',
];

// --- Helper Components ---

const FilterButton = ({ label, icon, isActive = false }) => (
  <button
    className={`flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-300 transition-colors duration-200 ${
      isActive
        ? 'bg-white text-blue-600 font-medium border-blue-600'
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
          <span className="text-xs text-gray-500 ml-2">• {mover.time}</span>
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

const OfficeRelocationSearchPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">
      
      {/* Title Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <MdOutlineApartment size={24} className="text-blue-600" />
          Professional Office Relocation
        </h1>
        <p className="text-gray-500 text-sm">Secure, efficient office shifting with minimal downtime</p>
        <p className="text-gray-500 text-xs mt-1">Get specialized office relocation service with secure equipment handling, IT setup assistance, and minimal business disruption. Perfect for startups to large enterprises.</p>
      </div>

      {/* Office Details (Input Fields) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Office Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Current Location */}
          <div className="relative col-span-1 md:col-span-2">
            <MdOutlineLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type="text"
              placeholder="Current office location"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         
          
          {/* New Location */}
          <div className="relative col-span-1 md:col-span-2">
            <MdOutlineLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type="text"
              placeholder="New office location"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Picker */}
          <div className="relative col-span-1 md:col-span-2">
            <MdOutlineCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MdOutlineCalendarToday className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Office Size Dropdown */}
          <div className="relative col-span-1 md:col-span-2">
            <select className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Office Size (for accurate quote)</option>
              <option>Small (1-10 employees)</option>
              <option>Medium (11-50 employees)</option>
              <option>Large (50+ employees)</option>
            </select>
            <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Special Requirements */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Special Requirements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
            {specialRequirements.map((req, index) => (
              <label key={index} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                {req}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Office Movers ({availableMovers.length})</h3>
        <div className="flex items-center gap-3">
          <FilterButton label="List" icon={<MdOutlineFormatListBulleted size={20} />} isActive={true} />
          <FilterButton label="Filters" icon={<MdOutlineFilterList size={20} />} isActive={false} />
          <div className="relative">
            <select className="w-40 pl-4 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
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

      {/* Office Relocation Tips */}
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
          <MdOutlineInfo size={24} className="text-purple-600" />
          Office Relocation Tips
        </h3>
        <ul className="text-sm text-gray-700 space-y-2 ml-6 list-disc">
          <li>Start planning at least 6-8 weeks in advance for minimal disruption.</li>
          <li>Assign a dedicated project manager for the move.</li>
          <li>Back up all digital data before disconnecting IT equipment.</li>
          <li>Notify clients, suppliers, and utility companies of the new address.</li>
        </ul>
      </div>
    </div>
  );
};

export default OfficeRelocationSearchPage;
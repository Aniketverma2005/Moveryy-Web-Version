import React, { useState } from 'react';
import {
  MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineSort,
  MdOutlineViewList, MdOutlineFilterList, MdOutlineStar,
  MdOutlineDirectionsCar, MdOutlineKeyboardArrowDown,
  MdOutlineInfo, MdOutlineFormatListBulleted
} from 'react-icons/md';

// --- Data Structures (Example Data) ---
const availableTransporters = [
  {
    name: 'AutoMove Express',
    rating: 4.8,
    reviews: 160,
    distance: '1.6 km away',
    time: '2-3 days',
    price: '₹800',
    tags: ['Reliable Transport', 'Insurance Included', 'Door to Door'],
    icon: <MdOutlineDirectionsCar size={24} className="text-green-600" />,
  },
  {
    name: 'SafeCar Transport',
    rating: 4.7,
    reviews: 210,
    distance: '2.4 km away',
    time: '1-2 days',
    price: '₹950',
    tags: ['Live Tracking', '24/7 Support', 'Professional Team'],
    icon: <MdOutlineDirectionsCar size={24} className="text-orange-600" />,
  },
  {
    name: 'QuickDrive Movers',
    rating: 4.6,
    reviews: 144,
    distance: '3.2 km away',
    time: '3-4 days',
    price: '₹750',
    tags: ['Budget Friendly', 'Open Transport', 'Local Expert'],
    icon: <MdOutlineDirectionsCar size={24} className="text-blue-600" />,
  },
  {
    name: 'Premium Auto Shift',
    rating: 4.8,
    reviews: 178,
    distance: '2.8 km away',
    time: '1-2 days',
    price: '₹1,200',
    tags: ['Premium Service', 'Safety Car Specialist', 'Enclosed Transport'],
    icon: <MdOutlineDirectionsCar size={24} className="text-purple-600" />,
  },
];

// --- Helper Components ---

const FilterButton = ({ label, icon, isActive = false }) => (
  <button
    className={`flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-300 transition-colors duration-200 ${
      isActive
        ? 'bg-white text-blue-600 font-medium border-blue-600' // Changed active style to match image (blue border, white bg)
        : 'bg-white text-gray-700 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const TransporterCard = ({ transporter }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-200">
    
    {/* Header and Rating */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        {transporter.icon}
        <span className="text-lg font-semibold text-gray-800">{transporter.name}</span>
        <div className="flex items-center text-sm text-gray-600">
          <MdOutlineStar size={16} className="text-yellow-500 mr-1" />
          <span>{transporter.rating} ({transporter.reviews})</span>
          <span className="text-xs text-gray-500 ml-2">• {transporter.distance}</span>
          <span className="text-xs text-gray-500 ml-2">• {transporter.time}</span>
        </div>
      </div>
      <span className="text-green-600 text-sm font-medium">Verified</span>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {transporter.tags.map((tag, index) => (
        <span key={index} className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
          {tag}
        </span>
      ))}
    </div>

    {/* Price and Button */}
    <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
      <div className="flex flex-col">
        <span className="text-xl font-bold text-blue-600">{transporter.price}</span>
        <span className="text-xs text-gray-500">starting from</span>
      </div>
      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
        Book Now
      </button>
    </div>
  </div>
);


// --- Main Component ---

const CarTransportSearchPage = () => {
  const [carDetailsOpen, setCarDetailsOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">
      
      {/* Title Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h1 className="text-xl font-bold text-gray-800">Safe Car Transportation</h1>
        <p className="text-gray-500 text-sm">Professional vehicle moving with door-to-door service</p>
        <p className="text-gray-500 text-xs mt-1">Get secure, reliable car transportation with insurance coverage. Our verified transporters ensure your vehicle reaches safely with real-time tracking.</p>
      </div>

      {/* Transport Details (Input Fields) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Transport Details</h2>
        <div className="grid grid-cols-1 gap-4">
          
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

          {/* Car Details Dropdown */}
          <button 
            onClick={() => setCarDetailsOpen(!carDetailsOpen)}
            className="w-full text-left pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
                <MdOutlineDirectionsCar size={20} className="text-gray-500 -ml-7" />
                <span>Car Details <span className="text-xs text-gray-400">(for better pricing)</span></span>
            </div>
            <MdOutlineKeyboardArrowDown size={24} className={`transition-transform duration-300 ${carDetailsOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          
          {/* Collapsible Car Details Content */}
          {carDetailsOpen && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-2">
                {/* You would add actual car detail inputs here (e.g., make, model, year) */}
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Car Make" className="p-2 border border-gray-300 rounded-lg" />
                    <input type="text" placeholder="Car Model" className="p-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filters & Sort</h3>
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

      {/* Transporter Listings */}
      <div className="flex flex-col gap-4 mb-8">
        <h3 className="text-lg font-semibold text-gray-800">Car Transporters ({availableTransporters.length})</h3>
        {availableTransporters.map((transporter, index) => (
          <TransporterCard key={index} transporter={transporter} />
        ))}
      </div>

      {/* Car Moving Preparation Tips */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
          <MdOutlineInfo size={24} className="text-green-600" />
          Car Moving Preparation Tips
        </h3>
        <ul className="text-sm text-gray-700 space-y-2 ml-6 list-disc">
          <li>Remove all personal items and valuables from the vehicle.</li>
          <li>Ensure the fuel tank is no more than 1/4 full.</li>
          <li>Keep copies of insurance and registration documents ready for pickup.</li>
          <li>Note any existing damage before handover.</li>
        </ul>
      </div>
    </div>
  );
};

export default CarTransportSearchPage;
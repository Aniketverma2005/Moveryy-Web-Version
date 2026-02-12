import React from 'react';
import {
  MdOutlineStar, MdOutlineVerified, MdOutlineDirectionsCar, MdOutlineHome,
  MdOutlineWork, MdOutlineBusinessCenter, MdOutlineSecurity, MdOutlineLocalShipping,
  MdOutlineCheck, MdOutlineClose, MdOutlineAccessTime, MdOutlineInfo,
  MdOutlineInventory2, MdOutlineLocationCity, MdOutlineSchool, MdOutlineApartment
} from 'react-icons/md';

// --- Data Structure ---
const comparisonData = {
  movers: [
    {
      name: 'QuickMove Express',
      service: 'House Moving',
      rating: 4.8,
      reviews: 250,
      price: '₹1,200',
      distance: '2.5 km',
      features: {
        insurance: true,
        packing: true,
        tracking: true,
        reviews: 1250,
        delivery: 'Same Day',
        experience: '8 years',
        verified: true,
        types: ['House', 'Car', 'Office'],
      },
      color: 'text-orange-600', // for icon color
    },
    {
      name: 'SafeShift Services',
      service: 'Car Moving',
      rating: 4.7,
      reviews: 980,
      price: '₹1,150',
      distance: '3.1 km',
      features: {
        insurance: false,
        packing: true,
        tracking: true,
        reviews: 980,
        delivery: '1-2 Days',
        experience: '5 years',
        verified: true,
        types: ['House', 'Car'],
      },
      color: 'text-green-600',
    },
    {
      name: 'CityMove Pro',
      service: 'Office Shifting',
      rating: 4.6,
      reviews: 750,
      price: '₹1,350',
      distance: '4.2 km',
      features: {
        insurance: false,
        packing: false,
        tracking: false,
        reviews: 756,
        delivery: '2-3 Days',
        experience: '12 years',
        verified: false,
        types: ['House', 'Car', 'Office', 'Storage'],
      },
      color: 'text-blue-600',
    },
  ],
  featureLabels: [
    { key: 'insurance', label: 'Insurance included', type: 'bool' },
    { key: 'packing', label: 'Packing Services', type: 'bool' },
    { key: 'tracking', label: 'Live Tracking', type: 'bool' },
    { key: 'reviews', label: 'Total Reviews', type: 'text' },
    { key: 'delivery', label: 'Delivery Time', type: 'text' },
    { key: 'experience', label: 'Experience', type: 'text' },
    { key: 'verified', label: 'Verified Mover', type: 'bool' },
  ],
  typeIcons: {
    House: <MdOutlineHome />,
    Car: <MdOutlineDirectionsCar />,
    Office: <MdOutlineBusinessCenter />,
    Storage: <MdOutlineInventory2 />,
  },
};

// --- Helper Components ---

const ComparisonCard = ({ mover }) => (
  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex-1">
    <div className="flex items-center mb-2">
      <MdOutlineLocalShipping size={24} className={mover.color + " mr-2"} />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800">{mover.name}</span>
        <span className="text-xs text-gray-500">{mover.service}</span>
      </div>
    </div>
    <div className="flex items-center text-sm mb-2">
      <MdOutlineStar size={16} className="text-yellow-500 mr-1" />
      <span className="font-semibold">{mover.rating}</span>
      <span className="text-gray-500 ml-1">({mover.reviews})</span>
    </div>
    <p className="text-xl font-bold text-blue-600">{mover.price}</p>
    <p className="text-xs text-gray-500">{mover.distance}</p>
  </div>
);

const FeatureCell = ({ value, type }) => {
  if (type === 'bool') {
    return value
      ? <MdOutlineCheck size={20} className="text-green-600 mx-auto" />
      : <MdOutlineClose size={20} className="text-red-600 mx-auto" />;
  }
  return <span className="text-sm text-gray-700 mx-auto">{value}</span>;
};

// --- Main Component ---

const ComparePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">
      
      {/* Cards Section */}
      <div className="flex gap-6 mb-8">
        {comparisonData.movers.map((mover, index) => (
          <ComparisonCard key={index} mover={mover} />
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature Comparison</h2>
        <p className="text-sm text-gray-500 mb-6">Compare services and features side by side</p>

        {/* Table Header Row */}
        <div className="grid grid-cols-4 border-b border-gray-200 pb-3 mb-3 text-sm font-medium text-gray-500">
          <div>Features</div>
          {comparisonData.movers.map((mover, index) => (
            <div key={index} className="text-center">{mover.name}</div>
          ))}
        </div>

        {/* Feature Rows */}
        {comparisonData.featureLabels.map((feature, index) => (
          <div key={index} className="grid grid-cols-4 py-3 border-b border-gray-100 last:border-b-0">
            <div className="text-sm text-gray-700 font-medium">{feature.label}</div>
            {comparisonData.movers.map((mover, i) => (
              <div key={i} className="text-center">
                <FeatureCell value={mover.features[feature.key]} type={feature.type} />
              </div>
            ))}
          </div>
        ))}

        {/* Service Type Row (Special Row) */}
        <div className="grid grid-cols-4 py-3 border-b border-gray-100 last:border-b-0">
          <div className="text-sm text-gray-700 font-medium">Service Types</div>
          {comparisonData.movers.map((mover, i) => (
            <div key={i} className="flex justify-center gap-2">
              {mover.features.types.map((type, j) => (
                <div key={j} className="text-gray-500" title={type}>
                  {comparisonData.typeIcons[type]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Ready to Book Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ready to Book?</h2>
        <div className="flex flex-col gap-4">
          {comparisonData.movers.map((mover, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <MdOutlineLocalShipping size={24} className={mover.color} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">{mover.name}</span>
                  <span className="text-xs text-gray-500">{mover.price} starting from</span>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Tips Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <MdOutlineInfo size={24} className="text-blue-600" />
          Comparison Tips
        </h2>
        <ul className="text-sm text-gray-600 space-y-2 ml-4 list-disc">
          <li>Check if **insurance and packing services** are included in the base price.</li>
          <li>Compare the **total reviews** and **experience** for peace of mind.</li>
          <li>Read movers to understand **service quality and reliability**.</li>
          <li>Verify if the mover provides **live tracking** for peace of mind.</li>
        </ul>
      </div>

    </div>
  );
};

export default ComparePage;
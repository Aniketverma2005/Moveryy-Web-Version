import React from 'react';
import {
  MdOutlineSearch, MdOutlineAdd, MdDeleteOutline
} from 'react-icons/md';

// Helper component for a single row in the offers table
const OfferTableRow = ({ offer }) => {
  const statusStyles = {
    Active: 'bg-green-100 text-green-600',
    Inactive: 'bg-red-100 text-red-600',
  };

  const actionButtonText = offer.status === 'Active' ? 'Disable' : 'Enable';
  const actionButtonColor = offer.status === 'Active' ? 'text-red-600' : 'text-green-600';

  return (
    <tr className="border-b border-gray-100 last:border-b-0">
      <td className="py-4 px-2 text-sm font-semibold text-gray-800">{offer.code}</td>
      <td className="py-4 px-2 text-sm text-gray-600">{offer.discount}</td>
      <td className="py-4 px-2 text-sm text-gray-600">{offer.type}</td>
      <td className="py-4 px-2 text-sm text-gray-600">{offer.expires}</td>
      <td className="py-4 px-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[offer.status]}`}>
          {offer.status}
        </span>
      </td>
      <td className="py-4 px-2 text-sm text-gray-600">{offer.created}</td>
      <td className="py-4 px-2">
        <div className="flex items-center gap-2">
          <button className={`text-sm font-medium hover:underline ${actionButtonColor}`}>
            {actionButtonText}
          </button>
          <button className="text-gray-400 hover:text-red-600 transition-colors duration-200">
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const offersData = [
  { code: 'WELCOME10', discount: '10%', type: 'percentage', expires: '—', status: 'Active', created: '2025-09-20' },
  { code: 'FLAT500', discount: '₹500', type: 'flat', expires: '—', status: 'Inactive', created: '2025-09-20' },
];

const OffersPage = () => {
  const totalOffers = offersData.length;

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter w-full">
      {/* Header, Search, and Button Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Offers</h1>
          <p className="text-gray-500 text-sm">Create and manage coupon offers for your customers.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search code..."
              className="w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <MdOutlineAdd size={20} />
            <span>New Offer</span>
          </button>
        </div>
      </div>

      {/* Offers Table Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Existing Offers</h2>
          <span className="text-sm font-medium text-gray-500">{totalOffers} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-400">
                <th className="py-3 px-2">Code</th>
                <th className="py-3 px-2">Discount</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2">Expires</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Created</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offersData.map((offer, index) => (
                <OfferTableRow key={index} offer={offer} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
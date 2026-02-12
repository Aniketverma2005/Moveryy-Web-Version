import React from 'react';
import {
  MdOutlineCloud, MdOutlineVerified, MdOutlineStar, MdOutlinePeople,
  MdOutlineAccessTime, MdOutlineAttachMoney, MdOutlineAddLocation
} from 'react-icons/md';

// Helper component for styled info fields
const InfoField = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-medium text-gray-400">{label}</span>
    <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
      {value}
    </div>
  </div>
);

// Helper component for rating bars
const RatingBar = ({ stars, percentage }) => (
  <div className="flex items-center gap-2 mb-1">
    <div className="w-12 text-sm text-gray-600 flex-shrink-0">{stars} stars</div>
    <div className="w-full bg-gray-200 h-2 rounded-full">
      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
    <span className="text-xs text-gray-500 w-6 text-right flex-shrink-0">{percentage}%</span>
  </div>
);

// Helper component for right-side stats
const BusinessStat = ({ title, value, icon, iconBg, iconColor }) => (
  <div className="flex items-center gap-4">
    <div className={`p-2 rounded-full ${iconBg} ${iconColor}`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-lg font-semibold text-gray-800">{value}</span>
    </div>
  </div>
);

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter w-full">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <MdOutlineCloud size={48} className="text-blue-600 bg-blue-100 p-2 rounded-md" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Swift Movers Ltd
              <MdOutlineVerified size={20} className="text-blue-600" />
            </h1>
            <p className="text-gray-500 text-sm">since 2018 | Licensed & Verified</p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Information Cards */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Company Information Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoField label="Company Name" value="Swift Movers Ltd" />
              <InfoField label="GST Number" value="GST123456789" />
              <div className="md:col-span-2">
                <InfoField label="Business Address" value="23 Industrial Area, Sector 15, Gurgaon, Haryana 122015" />
              </div>
              <InfoField label="Contact Number" value="+91 98765 43210" />
              <InfoField label="Email Address" value="info@swiftmovers.com" />
              <InfoField label="Website" value="www.swiftmovers.com" />
            </div>
          </div>

          {/* Service Areas Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Areas</h2>
            <div className="flex flex-wrap gap-2">
              {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'].map(city => (
                <span key={city} className="bg-blue-100 text-blue-600 px-3 py-1 text-sm font-medium rounded-full cursor-pointer hover:bg-blue-200">{city}</span>
              ))}
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Operating Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-400">Weekdays (Mon - Fri)</span>
                <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">9:00 AM - 6:00 PM</div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-400">Weekends (Sat - Sun)</span>
                <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">10:00 AM - 4:00 PM</div>
              </div>
            </div>
          </div>

          {/* Pricing Details Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Local Moving (Within City)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoField label="Minimum Price (₹)" value="2000" />
                  <InfoField label="Maximum Price (₹)" value="8000" />
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Inter-City Moving</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoField label="Minimum Price (₹)" value="5000" />
                  <InfoField label="Maximum Price (₹)" value="25000" />
                </div>
              </div>
            </div>
          </div>

          {/* About Us Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">About Us</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Swift Movers Ltd is a leading packers and movers company with over 5 years of experience in providing reliable and efficient relocation services across India. We specialize in household shifting, office relocation, vehicle transportation, and warehousing solutions. Our trained professionals ensure safe and on-time delivery of your belongings with complete care and transparency.
            </p>
          </div>
        </div>

        {/* Right Column: Stats and Actions */}
        <div className="lg:col-span-1 flex flex-col gap-6">

          {/* Customer Ratings Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer ratings</h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow-500">
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <span className="text-3xl font-bold text-gray-800">4.3</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Based on 127 reviews</p>
            <div>
              <RatingBar stars="5" percentage="85" />
              <RatingBar stars="4" percentage="26" />
              <RatingBar stars="3" percentage="8" />
              <RatingBar stars="2" percentage="2" />
              <RatingBar stars="1" percentage="0" />
            </div>
          </div>

          {/* Business Statistics Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Business Statistics</h2>
            <div className="flex flex-col gap-4">
              <BusinessStat title="Total Completed" value="898" icon={<MdOutlineVerified />} iconBg="bg-blue-100" iconColor="text-blue-600" />
              <BusinessStat title="Active Customers" value="234" icon={<MdOutlinePeople />} iconBg="bg-blue-100" iconColor="text-blue-600" />
              <BusinessStat title="Years in Business" value="6+" icon={<MdOutlineAccessTime />} iconBg="bg-blue-100" iconColor="text-blue-600" />
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-4">
              <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800">
                <MdOutlineStar size={20} />
                <span>View All Reviews</span>
              </button>
              <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800">
                <MdOutlineAttachMoney size={20} />
                <span>Update Pricing</span>
              </button>
              <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800">
                <MdOutlineAddLocation size={20} />
                <span>Manage Service Areas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
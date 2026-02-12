import React, { useState } from 'react';
import {
  MdOutlineAccountCircle, MdOutlineNotifications, MdOutlinePayment,
  MdOutlineSettings, MdOutlineInfo, MdOutlineCheck, MdOutlineCancel
} from 'react-icons/md';

// Helper component for styled text inputs and dropdowns
const InputField = ({ label, placeholder, type = 'text', value }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Helper component for the toggle switch
const ToggleSwitch = ({ label, description, checked, onToggle }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <span className="text-xs text-gray-500">{description}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onToggle} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

// Helper component for the left sidebar navigation
const SettingsSidebar = ({ activeSection, onSectionClick }) => {
  const navItems = [
    { name: 'Account', icon: <MdOutlineAccountCircle />, id: 'account' },
    { name: 'Notifications', icon: <MdOutlineNotifications />, id: 'notifications' },
    { name: 'Payments', icon: <MdOutlinePayment />, id: 'payments' },
    { name: 'Preferences', icon: <MdOutlineSettings />, id: 'preferences' },
  ];

  return (
    <div className="w-[200px] flex-shrink-0">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onSectionClick(item.id)}
          className={`flex items-center gap-3 py-2 px-4 w-full text-left rounded-lg transition-colors duration-200 mb-1
          ${activeSection === item.id ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {item.icon}
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
};

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('account');

  // Hardcoded state for toggles
  const [toggles, setToggles] = useState({
    email: true,
    inApp: false,
    push: false,
    bookingUpdates: true,
    paymentNotifications: false,
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account preferences and application settings.</p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex gap-6">
        {/* Left Sidebar */}
        <SettingsSidebar activeSection={activeSection} onSectionClick={setActiveSection} />

        {/* Right Content Panel */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Account Settings Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h2>
            <p className="text-sm font-medium text-gray-700 mb-4">Personal Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField label="Full name" placeholder="Enter your full name" value="Rajesh Kumar" />
              <InputField label="Username" placeholder="Enter a username" value="rajesh.k" />
              <InputField label="Email address" placeholder="Enter your email address" value="rajesh@swiftmovers.com" />
              <InputField label="Phone number" placeholder="Enter your phone number" value="+91 98765 43210" />
            </div>
            
            <p className="text-sm font-medium text-gray-700 mb-4">Change Password</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Current Password" placeholder="Enter current password" type="password" />
              <InputField label="New Password" placeholder="Enter new password" type="password" />
              <InputField label="Confirm Password" placeholder="Confirm new password" type="password" />
            </div>
          </div>

          {/* Notification Settings Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h2>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">Email notifications</span>
              <span className="text-xs text-gray-500">Receive notifications on your email account.</span>
              <ToggleSwitch 
                label="Email notifications" 
                description="Receive notifications on your email account." 
                checked={toggles.email} 
                onToggle={() => handleToggle('email')} 
              />
              <ToggleSwitch 
                label="In-app notifications" 
                description="Receive notifications on your in-app inbox." 
                checked={toggles.inApp} 
                onToggle={() => handleToggle('inApp')} 
              />
              <ToggleSwitch 
                label="Push notifications" 
                description="Receive push notifications on your device." 
                checked={toggles.push} 
                onToggle={() => handleToggle('push')} 
              />
            </div>
            
            <p className="text-sm font-medium text-gray-700 mt-6 mb-4">Notification Types</p>
            <div className="flex flex-col gap-2">
              <ToggleSwitch 
                label="Booking updates" 
                description="Get notified about booking status changes." 
                checked={toggles.bookingUpdates} 
                onToggle={() => handleToggle('bookingUpdates')} 
              />
              <ToggleSwitch 
                label="Payment notifications" 
                description="Receive payment confirmations and receipts." 
                checked={toggles.paymentNotifications} 
                onToggle={() => handleToggle('paymentNotifications')} 
              />
            </div>
          </div>

          {/* Payment Settings Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Default Currency</label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>INR - Indian Rupee (₹)</option>
                  <option>USD - US Dollar ($)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Default Payment Method</label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Card</option>
                  <option>UPI</option>
                  <option>Netbanking</option>
                </select>
              </div>
              <InputField label="Tax rate (%)" value="18" />
              <InputField label="Invoice prefix" value="INV" />
            </div>
          </div>

          {/* Preferences Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Timezone</label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Asia/Kolkata (IST)</option>
                  <option>America/New_York (EST)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Date Format</label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Theme</label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <MdOutlineCheck size={20} />
          <span>Save All Changes</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
          <MdOutlineCancel size={20} />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
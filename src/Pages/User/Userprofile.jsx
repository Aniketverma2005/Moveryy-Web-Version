import React, { useRef, useState } from "react";
import {
  MdOutlineCameraAlt,
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineHistory,
  MdOutlineCardGiftcard,
  MdOutlineSupportAgent,
  MdOutlineGavel,
  MdOutlineEmojiEvents,
  MdOutlineSettings,
  MdAdd,
  MdDeleteOutline,
} from "react-icons/md";

const UserProfileDashboard = () => {
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "https://as2.ftcdn.net/v2/jpg/02/23/50/73/1000_F_223507324_jKl7xbsaEdUjGr42WzQeSazKRighVDU4.jpg"
  );

  const [personalDetails, setPersonalDetails] = useState({
    firstName: "Rakshit",
    lastName: "Panwar",
    email: "rakshit.panwar@email.com",
    phone: "+91 98765 43210",
    dob: "",
    occupation: "",
  });

  // Array of addresses
  const [addresses, setAddresses] = useState([
    { house: "", street: "", area: "", pincode: "", city: "", state: "" },
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handlePersonalChange = (field, value) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Handle address input change
  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  // Add new address form
  const addNewAddress = () => {
    setAddresses([...addresses, { house: "", street: "", area: "", pincode: "", city: "", state: "" }]);
  };

  // Remove address
  const removeAddress = (index) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 shadow-lg px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <div className="inline-block bg-white/10 border border-white/20 px-4 py-1 rounded-full text-blue-100 font-medium tracking-wider uppercase text-[11px] mb-4">
              Verified Profile
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {personalDetails.firstName}{" "}
              <span className="text-yellow-400">{personalDetails.lastName}</span>
            </h1>

            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-8 text-blue-100/80 text-sm">
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <MdOutlineEmail className="text-yellow-400" size={18} />
                {personalDetails.email}
              </span>
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <MdOutlinePhone className="text-yellow-400" size={18} />
                {personalDetails.phone}
              </span>
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div className="relative group order-1 md:order-2">
            <div className="w-40 h-40 rounded-3xl bg-white p-1.5 shadow-2xl overflow-hidden border-2 border-white/20">
              <img src={profileImage} alt="Profile" className="w-full h-full rounded-[1.25rem] object-cover" />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl"
              >
                <MdOutlineCameraAlt className="text-white" size={32} />
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORMS COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PERSONAL DETAILS */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MdOutlinePerson className="text-blue-600" size={22} />
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                ["First Name", "firstName"], ["Last Name", "lastName"],
                ["Email Address", "email"], ["Phone Number", "phone"],
                ["Date of Birth", "dob"], ["Occupation", "occupation"]
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={personalDetails[key]}
                    onChange={(e) => handlePersonalChange(key, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESS DETAILS */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <MdOutlineLocationOn className="text-rose-500" size={22} />
                Address Details
              </h2>
              <button 
                onClick={addNewAddress}
                className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100 transition"
              >
                <MdAdd size={18} /> Add Address
              </button>
            </div>

            <div className="space-y-8">
              {addresses.map((addr, index) => (
                <div key={index} className="relative p-5 border border-slate-100 bg-slate-50/50 rounded-xl">
                  {addresses.length > 1 && (
                    <button 
                      onClick={() => removeAddress(index)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition"
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  )}
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Address #{index + 1}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(addr).map((field) => (
                      <div key={field}>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          value={addr[field]}
                          onChange={(e) => handleAddressChange(index, field, e.target.value)}
                          className="w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:border-rose-400 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR COLUMN */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-md font-bold text-slate-800 mb-5 flex items-center gap-2">
              <MdOutlineHistory className="text-orange-500" size={20} />
              Activity
            </h2>
            <div className="space-y-2">
              {["Recent Bookings", "Completed Orders", "Cancelled Orders"].map((item, i) => (
                <div key={i} className="group flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition">
                  <span className="text-sm font-medium text-slate-600">{item}</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-orange-100">
                    <MdAdd className="text-slate-400 group-hover:text-orange-600" size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-md font-bold text-slate-800 mb-5 flex items-center gap-2">
              <MdOutlineSettings className="text-indigo-600" size={20} />
              Quick Links
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: "Rewards", icon: <MdOutlineEmojiEvents />, color: "text-emerald-600" },
                { title: "Referrals", icon: <MdOutlineCardGiftcard />, color: "text-blue-600" },
                { title: "Legal", icon: <MdOutlineGavel />, color: "text-slate-500" },
                { title: "Support", icon: <MdOutlineSupportAgent />, color: "text-indigo-600" },
              ].map((link, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-sm transition">
                  <div className="flex items-center gap-3">
                    <span className={link.color}>{link.icon}</span>
                    <span className="text-sm font-bold text-slate-700">{link.title}</span>
                  </div>
                  <MdAdd size={16} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDashboard;
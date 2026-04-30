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
  MdOutlineFileUpload,
} from "react-icons/md";

const UserProfileDashboard = () => {
  const fileInputRef = useRef(null);

  // Default generic suited man image
  const [profileImage, setProfileImage] = useState(
    "https://as2.ftcdn.net/v2/jpg/02/23/50/73/1000_F_223507324_jKl7xbsaEdUjGr42WzQeSazKRighVDU4.jpg"
  );

  // Personal Details State (linked to header dynamically)
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "Rakshit",
    lastName: "Panwar",
    email: "rakshit.panwar@email.com",
    phone: "+91 98765 43210",
    dob: "",
    occupation: "",
  });

  // Address State
  const [addressDetails, setAddressDetails] = useState({
    house: "",
    street: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  // Upload Profile Photo
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  // Personal Details Input Change
  const handlePersonalChange = (field, value) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Address Change
  const handleAddressChange = (field, value) => {
    setAddressDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 shadow-2xl px-6 py-2">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          
          {/* USER DETAILS → AUTO FILLED FROM PERSONAL DETAILS */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <div className="inline-block bg-white/10 border border-white/20 px-5 py-2 rounded-full text-blue-100 font-bold tracking-widest uppercase text-sm mb-5">
              Verified Profile
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-white leading-tight">
              {personalDetails.firstName || "First Name"}{" "}
              <span className="text-yellow-400">
                {personalDetails.lastName || "Last Name"}
              </span>
            </h1>

            <div className="mt-8 flex flex-col gap-5 text-blue-100 text-xl md:text-2xl font-semibold">
              <span className="flex items-center gap-3 justify-center md:justify-start">
                <MdOutlineEmail size={28} />
                {personalDetails.email || "Email Address"}
              </span>

              <span className="flex items-center gap-3 justify-center md:justify-start">
                <MdOutlinePhone size={28} />
                {personalDetails.phone || "Phone Number"}
              </span>
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center order-1 md:order-2">
            <div className="relative group">
              <div className="w-56 h-56 rounded-[3rem] bg-white p-3 shadow-2xl border-4 border-white/20">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-[2.5rem] object-cover"
                />
              </div>

              {/* Camera Overlay */}
              <button
                onClick={triggerUpload}
                className="absolute inset-0 bg-blue-900/50 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
              >
                <MdOutlineCameraAlt className="text-white" size={50} />
              </button>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={triggerUpload}
              className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl text-lg transition"
            >
              <MdOutlineFileUpload size={24} />
              Upload / Change Photo
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PERSONAL DETAILS */}
          <div className="bg-white rounded-[2rem] shadow-md border border-slate-200 p-8">
            <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <MdOutlinePerson className="text-blue-600" />
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["First Name", "firstName"],
                ["Last Name", "lastName"],
                ["Email Address", "email"],
                ["Phone Number", "phone"],
                ["Date of Birth", "dob"],
                ["Occupation", "occupation"],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-sm font-bold text-slate-500 mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={personalDetails[key]}
                    onChange={(e) =>
                      handlePersonalChange(key, e.target.value)
                    }
                    placeholder={`Enter ${label}`}
                    className="w-full px-4 py-4 rounded-xl border border-slate-300 bg-slate-50 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESS DETAILS */}
          <div className="bg-white rounded-[2rem] shadow-md border border-slate-200 p-8">
            <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <MdOutlineLocationOn className="text-pink-600" />
              Address Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["House No.", "house"],
                ["Street", "street"],
                ["Area", "area"],
                ["Pincode", "pincode"],
                ["City", "city"],
                ["State", "state"],
                ["Country", "country"],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-sm font-bold text-slate-500 mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={addressDetails[key]}
                    onChange={(e) =>
                      handleAddressChange(key, e.target.value)
                    }
                    placeholder={`Enter ${label}`}
                    className="w-full px-4 py-4 rounded-xl border border-slate-300 bg-slate-50 text-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          
          {/* ORDER HISTORY */}
          <div className="bg-white rounded-[2rem] shadow-md border border-slate-200 p-8">
            <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <MdOutlineHistory className="text-orange-500" />
              Order History
            </h2>

            <div className="space-y-4">
              {[
                "Recent Bookings",
                "Completed Orders",
                "Cancelled Orders",
                "Refund Status",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-orange-50 border border-orange-100 rounded-2xl px-5 py-5 font-semibold text-lg text-slate-700 hover:bg-orange-100 transition"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className="bg-white rounded-[2rem] shadow-md border border-slate-200 p-8">
            <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <MdOutlineSettings className="text-purple-600" />
              Account Settings
            </h2>

            <div className="space-y-5">
              {[
                {
                  title: "Rewards & Points",
                  icon: <MdOutlineEmojiEvents className="text-green-600" />,
                  sub: "2,450 points earned",
                },
                {
                  title: "Refer & Earn",
                  icon: <MdOutlineCardGiftcard className="text-blue-600" />,
                  sub: "Invite friends & earn rewards",
                },
                {
                  title: "Terms of Service",
                  icon: <MdOutlineGavel className="text-red-500" />,
                  sub: "Read privacy & policies",
                },
                {
                  title: "Help & Support",
                  icon: <MdOutlineSupportAgent className="text-purple-600" />,
                  sub: "24/7 customer assistance",
                },
              ].map((setting, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-md transition"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow">
                    {setting.icon}
                  </div>

                  <div>
                    <h4 className="font-black text-xl text-slate-800">
                      {setting.title}
                    </h4>
                    <p className="text-slate-500">{setting.sub}</p>
                  </div>
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
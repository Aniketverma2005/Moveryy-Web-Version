// UserProfileDashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addressService } from "../../services/addressService";
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
  MdKeyboardArrowRight,
} from "react-icons/md";

const UserProfileDashboard = () => {
  const fileInputRef = useRef(null);

  // ── PROFILE IMAGE ──
  const [profileImage, setProfileImage] = useState(
    "https://as2.ftcdn.net/v2/jpg/02/23/50/73/1000_F_223507324_jKl7xbsaEdUjGr42WzQeSazKRighVDU4.jpg"
  );

  // ── PERSONAL DETAILS ──
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "Rakshit",
    lastName: "Panwar",
    email: "rakshit.panwar@email.com",
    phone: "+91 98765 43210",
    dob: "1995-08-15",
    occupation: "Software Engineer",
  });

  // ── ADDRESSES ──
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await addressService.getAllAddresses();

      if (data && data.length > 0) {
        setAddresses(data);
      } else {
        setAddresses([
          {
            addressType: "Home",
            addressName: "My Apartment",
            address: "123, MG Road, Sector 14",
            city: "Bangalore",
            state: "Karnataka",
            pincode: "560001",
            isDefault: true,
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to load addresses", error);

      setAddresses([
        {
          addressType: "Home",
          addressName: "My Apartment",
          address: "123, MG Road, Sector 14",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560001",
          isDefault: true,
        },
      ]);
    }
  };

  // ── ANIMATION ──
  const getFloatingAnimation = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: [0.2, 0.5, 0.2],
      x: [0, 30, -30, 0],
      y: [0, -40, 40, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  });

  // ── IMAGE UPLOAD ──
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // ── PERSONAL DETAILS UPDATE ──
  const handlePersonalChange = (field, value) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ── ADDRESS UPDATE ──
  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setAddresses(updated);
  };

  // ── ADD NEW ADDRESS ──
  const addNewAddress = async () => {
    const newAddress = {
      addressType: "Home",
      addressName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    };

    try {
      await addressService.createAddress(newAddress);
      loadAddresses();
    } catch (error) {
      console.error("Failed to add address", error);
      setAddresses([...addresses, newAddress]);
    }
  };

  // ── DELETE ADDRESS ──
  const removeAddress = async (index, id) => {
    if (addresses.length <= 1) return;

    try {
      if (id) {
        await addressService.deleteAddress(id);
        loadAddresses();
      } else {
        setAddresses(addresses.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* ── HEADER ── */}
      <div className="relative bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 shadow-lg px-6 py-12 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            {...getFloatingAnimation(0)}
            className="absolute w-64 h-64 rounded-full bg-white/20 border border-white/30 blur-3xl -top-10 -left-10"
          />
          <motion.div
            {...getFloatingAnimation(3)}
            className="absolute w-80 h-80 rounded-full bg-blue-400/20 border border-white/10 blur-3xl top-1/2 -right-20"
          />
          <motion.div
            {...getFloatingAnimation(6)}
            className="absolute w-40 h-40 rounded-full bg-white/15 blur-2xl bottom-5 left-1/3"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* USER INFO */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <div className="inline-block bg-white/20 border border-white/30 backdrop-blur-md px-4 py-1 rounded-full text-blue-50 font-bold tracking-wider uppercase text-[10px] mb-4 shadow-sm">
              Verified Premium Account
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {personalDetails.firstName}{" "}
              <span className="text-yellow-400">
                {personalDetails.lastName}
              </span>
            </h1>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 text-blue-50/90 text-sm font-semibold">
              <span className="flex items-center gap-2 justify-center md:justify-start bg-white/10 px-4 py-2 rounded-xl">
                <MdOutlineEmail className="text-yellow-400" size={18} />
                {personalDetails.email}
              </span>

              <span className="flex items-center gap-2 justify-center md:justify-start bg-white/10 px-4 py-2 rounded-xl">
                <MdOutlinePhone className="text-yellow-400" size={18} />
                {personalDetails.phone}
              </span>
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div className="relative group order-1 md:order-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-40 h-40 rounded-[2.8rem] bg-white/20 p-2 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/30 overflow-hidden relative"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-[2.2rem] object-cover"
              />

              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-[2.8rem] text-white"
              >
                <MdOutlineCameraAlt size={36} />
                <span className="text-[10px] font-black mt-2 uppercase">
                  Update Photo
                </span>
              </button>
            </motion.div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* PERSONAL DETAILS */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <MdOutlinePerson size={20} />
              </div>
              Personal Information
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
                  <label className="block text-[10px] font-black text-slate-800 mb-2 uppercase tracking-widest ml-1">
                    {label}
                  </label>

                  <input
                    type="text"
                    value={personalDetails[key]}
                    onChange={(e) =>
                      handlePersonalChange(key, e.target.value)
                    }
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESSES */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-500">
                  <MdOutlineLocationOn size={20} />
                </div>
                Saved Addresses
              </h2>

              <button
                onClick={addNewAddress}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black"
              >
                <MdAdd size={20} />
                New Address
              </button>
            </div>

            <div className="space-y-6">
              <AnimatePresence>
                {addresses.map((addr, index) => (
                  <motion.div
                    key={addr.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative p-6 border border-slate-100 bg-slate-50/50 rounded-3xl"
                  >
                    {addresses.length > 1 && (
                      <button
                        onClick={() => removeAddress(index, addr.id)}
                        className="absolute top-6 right-6 p-2 bg-white rounded-xl"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {Object.keys(addr).map((field) =>
                        field !== "id" ? (
                          <div key={field}>
                            <label className="block text-[9px] font-black mb-1 uppercase">
                              {field}
                            </label>

                            <input
                              type="text"
                              value={String(addr[field])}
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  field,
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-2 rounded-xl border"
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">
          {/* ACTIVITY */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-orange-700 p-8">
            <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <MdOutlineHistory className="text-orange-500" size={20} />
              Activity Log
            </h2>

            <div className="space-y-3">
              {[
                "Recent Bookings",
                "Completed Orders",
                "Cancelled Orders",
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex justify-between items-center p-4 rounded-2xl bg-slate-50"
                >
                  <span className="text-xs font-black">{item}</span>
                  <MdKeyboardArrowRight size={20} />
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-indigo-700 p-8">
            <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <MdOutlineSettings className="text-indigo-600" size={20} />
              Quick Links
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: "Rewards",
                  icon: <MdOutlineEmojiEvents />,
                },
                {
                  title: "Referrals",
                  icon: <MdOutlineCardGiftcard />,
                },
                {
                  title: "Legal Info",
                  icon: <MdOutlineGavel />,
                },
                {
                  title: "Support",
                  icon: <MdOutlineSupportAgent />,
                },
              ].map((link, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-100">
                      {link.icon}
                    </div>
                    <span className="text-xs font-black">
                      {link.title}
                    </span>
                  </div>

                  <MdAdd size={20} />
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
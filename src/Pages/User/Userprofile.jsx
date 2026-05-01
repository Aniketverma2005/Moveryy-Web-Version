// UserProfileDashboard.jsx
import { useEffect, useRef, useState } from "react";
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
  MdEdit,
  MdSave,
  MdClose,
  MdCheckCircle,
  MdErrorOutline,
} from "react-icons/md";

// ── Toast Notification ──────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl text-white text-sm font-semibold ${type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
  >
    {type === "success" ? (
      <MdCheckCircle size={20} />
    ) : (
      <MdErrorOutline size={20} />
    )}
    {message}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
      <MdClose size={16} />
    </button>
  </motion.div>
);

// ── Empty address template ──────────────────────────────────────────────────
const emptyAddress = () => ({
  addressType: "Home",
  addressName: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
});

const UserProfileDashboard = () => {
  const fileInputRef = useRef(null);

  // ── TOAST ──
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

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

  // ── EDIT STATES ──
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  // ── ADDRESSES ──
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  // Track which address is being edited: { [index]: boolean }
  const [editingAddressIdx, setEditingAddressIdx] = useState({});
  // Track saving state per address
  const [savingAddressIdx, setSavingAddressIdx] = useState({});
  // Track deleting state per address
  const [deletingAddressIdx, setDeletingAddressIdx] = useState({});
  // Track adding state
  const [addingAddress, setAddingAddress] = useState(false);

  // ── LOAD ADDRESSES ──
  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const data = await addressService.getAllAddresses();
      if (Array.isArray(data) && data.length > 0) {
        setAddresses(data);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Failed to load addresses", error);
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
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
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  // ── SAVE PERSONAL DETAILS ──
  const savePersonalDetails = async () => {
    try {
      // await userService.updateProfile(personalDetails);
      showToast("Personal details saved successfully!");
      setIsEditingPersonal(false);
    } catch (error) {
      console.error("Failed to save personal details", error);
      showToast("Failed to save personal details.", "error");
    }
  };

  // ── ADDRESS FIELD CHANGE ──
  const handleAddressChange = (index, field, value) => {
    setAddresses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ── TOGGLE EDIT MODE FOR ADDRESS ──
  const toggleEditAddress = (index) => {
    setEditingAddressIdx((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // ── SAVE SINGLE ADDRESS ──
  const saveAddress = async (index) => {
    const addr = addresses[index];
    setSavingAddressIdx((prev) => ({ ...prev, [index]: true }));
    try {
      if (addr.id) {
        // Update existing address via PATCH /api/v1/address/:id
        const { id, ...payload } = addr;
        await addressService.updateAddress(id, payload);
        showToast("Address updated successfully!");
      } else {
        // Create new address via POST /api/v1/address
        const created = await addressService.createAddress(addr);
        // Replace the local temp entry with the server response
        setAddresses((prev) => {
          const updated = [...prev];
          updated[index] = created?.data || created || addr;
          return updated;
        });
        showToast("Address added successfully!");
      }
      setEditingAddressIdx((prev) => ({ ...prev, [index]: false }));
    } catch (error) {
      console.error("Failed to save address", error);
      showToast(error?.message || "Failed to save address.", "error");
    } finally {
      setSavingAddressIdx((prev) => ({ ...prev, [index]: false }));
    }
  };

  // ── ADD NEW ADDRESS ──
  const addNewAddress = () => {
    const newAddr = emptyAddress();
    setAddresses((prev) => [...prev, newAddr]);
    const newIndex = addresses.length;
    setEditingAddressIdx((prev) => ({ ...prev, [newIndex]: true }));
    setAddingAddress(false);
  };

  // ── DELETE ADDRESS ──
  const removeAddress = async (index) => {
    const addr = addresses[index];
    setDeletingAddressIdx((prev) => ({ ...prev, [index]: true }));
    try {
      if (addr.id) {
        // DELETE /api/v1/address/:id
        await addressService.deleteAddress(addr.id);
        showToast("Address deleted.");
      }
      setAddresses((prev) => prev.filter((_, i) => i !== index));
      // Clean up editing state for removed index
      setEditingAddressIdx((prev) => {
        const updated = {};
        Object.keys(prev).forEach((k) => {
          const ki = parseInt(k);
          if (ki < index) updated[ki] = prev[k];
          else if (ki > index) updated[ki - 1] = prev[k];
        });
        return updated;
      });
    } catch (error) {
      console.error("Failed to delete address", error);
      showToast(error?.message || "Failed to delete address.", "error");
    } finally {
      setDeletingAddressIdx((prev) => ({ ...prev, [index]: false }));
    }
  };

  // ── ADDRESS FIELD LABELS ──
  const addressFieldLabels = {
    addressType: "Type",
    addressName: "Label",
    address: "Street Address",
    city: "City",
    state: "State",
    pincode: "Pincode",
    isDefault: "Default",
  };

  const addressDisplayFields = [
    "addressType",
    "addressName",
    "address",
    "city",
    "state",
    "pincode",
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <div className="relative bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 shadow-lg px-6 py-12 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            {...getFloatingAnimation(0)}
            className="absolute w-64 h-64 rounded-full bg-white/20 blur-3xl -top-10 -left-10"
          />
          <motion.div
            {...getFloatingAnimation(3)}
            className="absolute w-80 h-80 rounded-full bg-blue-400/20 blur-3xl top-1/2 -right-20"
          />
          <motion.div
            {...getFloatingAnimation(6)}
            className="absolute w-40 h-40 rounded-full bg-white/15 blur-2xl bottom-5 left-1/3"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* USER INFO */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-blue-50 font-bold uppercase text-[10px] mb-4">
              Verified Premium Account
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white">
              {personalDetails.firstName}{" "}
              <span className="text-yellow-400">{personalDetails.lastName}</span>
            </h1>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 text-blue-50 text-sm font-semibold">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                <MdOutlineEmail className="text-yellow-400" size={18} />
                {personalDetails.email}
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                <MdOutlinePhone className="text-yellow-400" size={18} />
                {personalDetails.phone}
              </span>
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-40 h-40 rounded-[2.8rem] bg-white/20 p-2 border-4 border-white/30 overflow-hidden relative"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-[2.2rem] object-cover"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center rounded-[2.8rem] text-white"
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
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* PERSONAL DETAILS */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-black flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <MdOutlinePerson size={20} />
                </div>
                Personal Information
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                  className={`p-3 rounded-xl transition ${isEditingPersonal
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100 hover:bg-blue-50"
                    }`}
                  title={isEditingPersonal ? "Cancel editing" : "Edit"}
                >
                  {isEditingPersonal ? <MdClose size={20} /> : <MdEdit size={20} />}
                </button>

                {isEditingPersonal && (
                  <button
                    onClick={savePersonalDetails}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-700 transition"
                  >
                    <MdSave size={18} />
                    Save
                  </button>
                )}
              </div>
            </div>

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
                  <label className="block text-[10px] font-black mb-2 uppercase text-slate-500">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={personalDetails[key]}
                    disabled={!isEditingPersonal}
                    onChange={(e) => handlePersonalChange(key, e.target.value)}
                    className={`w-full px-5 py-3 rounded-2xl border font-bold transition ${isEditingPersonal
                      ? "bg-white border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      : "bg-slate-100 border-slate-100 cursor-not-allowed text-slate-600"
                      }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESSES */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-black flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-500">
                  <MdOutlineLocationOn size={20} />
                </div>
                Saved Addresses
                {loadingAddresses && (
                  <span className="text-xs font-normal text-slate-400 ml-2">
                    Loading…
                  </span>
                )}
              </h2>

              <button
                onClick={addNewAddress}
                disabled={addingAddress}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-slate-700 transition disabled:opacity-50"
              >
                <MdAdd size={20} />
                New Address
              </button>
            </div>

            {/* Empty state */}
            {!loadingAddresses && addresses.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <MdOutlineLocationOn size={48} className="mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No addresses saved yet.</p>
                <p className="text-sm mt-1">Click "New Address" to add one.</p>
              </div>
            )}

            <div className="space-y-6">
              <AnimatePresence>
                {addresses.map((addr, index) => {
                  const isEditing = !!editingAddressIdx[index];
                  const isSaving = !!savingAddressIdx[index];
                  const isDeleting = !!deletingAddressIdx[index];

                  return (
                    <motion.div
                      key={addr.id || `new-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`relative p-6 border rounded-3xl transition ${isEditing
                        ? "bg-rose-50 border-rose-200"
                        : "bg-slate-50 border-slate-200"
                        }`}
                    >
                      {/* Address type badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                          <MdOutlineLocationOn size={12} className="text-rose-500" />
                          {addr.addressType || "Address"}{" "}
                          {addr.addressName ? `· ${addr.addressName}` : ""}
                          {addr.isDefault && (
                            <span className="ml-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[9px]">
                              Default
                            </span>
                          )}
                        </span>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveAddress(index)}
                                disabled={isSaving}
                                className="flex items-center gap-1.5 bg-rose-500 text-white px-3 py-1.5 rounded-xl text-xs font-black hover:bg-rose-600 transition disabled:opacity-60"
                              >
                                {isSaving ? (
                                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <MdSave size={14} />
                                )}
                                {isSaving ? "Saving…" : "Save"}
                              </button>
                              <button
                                onClick={() => toggleEditAddress(index)}
                                className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 transition"
                                title="Cancel"
                              >
                                <MdClose size={16} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => toggleEditAddress(index)}
                              className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-yellow-50 transition"
                              title="Edit address"
                            >
                              <MdEdit size={16} />
                            </button>
                          )}

                          <button
                            onClick={() => removeAddress(index)}
                            disabled={isDeleting}
                            className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-red-50 text-red-500 transition disabled:opacity-50"
                            title="Delete address"
                          >
                            {isDeleting ? (
                              <span className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin block" />
                            ) : (
                              <MdDeleteOutline size={16} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Address fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {addressDisplayFields.map((field) => (
                          <div key={field}>
                            <label className="block text-[9px] font-black mb-1 uppercase text-slate-400">
                              {addressFieldLabels[field] || field}
                            </label>
                            <input
                              type="text"
                              value={String(addr[field] ?? "")}
                              disabled={!isEditing}
                              onChange={(e) =>
                                handleAddressChange(index, field, e.target.value)
                              }
                              className={`w-full px-4 py-2 rounded-xl border text-sm font-medium transition ${isEditing
                                ? "bg-white border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                                : "bg-slate-100 border-slate-100 cursor-not-allowed text-slate-600"
                                }`}
                            />
                          </div>
                        ))}

                        {/* isDefault toggle */}
                        <div className="flex items-center gap-3 mt-1">
                          <label className="block text-[9px] font-black uppercase text-slate-400">
                            Set as Default
                          </label>
                          <button
                            type="button"
                            disabled={!isEditing}
                            onClick={() =>
                              handleAddressChange(index, "isDefault", !addr.isDefault)
                            }
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${addr.isDefault ? "bg-green-500" : "bg-slate-300"
                              } ${!isEditing ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <span
                              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${addr.isDefault ? "translate-x-4" : "translate-x-1"
                                }`}
                            />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">
          {/* ACTIVITY */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-orange-700 p-8">
            <h2 className="text-xs font-black uppercase mb-6 flex items-center gap-2">
              <MdOutlineHistory className="text-orange-500" size={20} />
              Activity Log
            </h2>

            <div className="space-y-3">
              {["Recent Bookings", "Completed Orders", "Cancelled Orders"].map(
                (item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 hover:bg-orange-50 cursor-pointer transition"
                  >
                    <span className="text-xs font-black">{item}</span>
                    <MdKeyboardArrowRight size={20} />
                  </div>
                )
              )}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-indigo-700 p-8">
            <h2 className="text-xs font-black uppercase mb-6 flex items-center gap-2">
              <MdOutlineSettings className="text-indigo-600" size={20} />
              Quick Links
            </h2>

            <div className="grid gap-4">
              {[
                { title: "Rewards", icon: <MdOutlineEmojiEvents /> },
                { title: "Referrals", icon: <MdOutlineCardGiftcard /> },
                { title: "Legal Info", icon: <MdOutlineGavel /> },
                { title: "Support", icon: <MdOutlineSupportAgent /> },
              ].map((link, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-100">{link.icon}</div>
                    <span className="text-xs font-black">{link.title}</span>
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

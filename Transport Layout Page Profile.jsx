import React, { useState } from 'react';

const TransportProfile = () => {
  // Driver profile data - easy to modify
  const [driverInfo, setDriverInfo] = useState({
    name: "John Doe",
    phone: "+91 98765 43210",
    email: "john.doe@movery.com",
    vehicleNumber: "MH 01 AB 1234",
    vehicleType: "Mini Truck",
    licenseNumber: "DL123456789",
    experience: "5 years",
    address: "123 Main Street, Mumbai, Maharashtra"
  });

  const [isEditing, setIsEditing] = useState(false);

  // Simple toggle function
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save changes function
  const saveChanges = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  // Profile stats - simple overview
  const profileStats = [
    { title: "Total Trips", value: "245", emoji: "🚛", type: "orders" },
    { title: "Years Active", value: "5", emoji: "📅", type: "earnings" },
    { title: "Rating", value: "4.7", emoji: "⭐", type: "rating" }
  ];

  return (
    <div>
      {/* Page header */}
      <div className="welcome-section">
        <h1 className="welcome-name">Driver Profile</h1>
        <p className="welcome-text">Manage your personal and vehicle information</p>
      </div>

      {/* Profile stats */}
      <div className="stats-grid">
        {profileStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
            <div className={`stat-icon ${stat.type}`}>
              {stat.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Profile form */}
      <div className="orders-section">
        <div className="section-header">
          <h2 className="section-title">Personal Information</h2>
          <button 
            className="btn btn-primary"
            onClick={isEditing ? saveChanges : toggleEdit}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="order-card" style={{ maxWidth: '600px' }}>
          <div className="profile-form">
            {/* Name and Phone */}
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={driverInfo.name}
                    onChange={(e) => setDriverInfo({...driverInfo, name: e.target.value})}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">{driverInfo.name}</p>
                )}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={driverInfo.phone}
                    onChange={(e) => setDriverInfo({...driverInfo, phone: e.target.value})}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">{driverInfo.phone}</p>
                )}
              </div>
            </div>

            {/* Email and Vehicle Number */}
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input 
                    type="email" 
                    value={driverInfo.email}
                    onChange={(e) => setDriverInfo({...driverInfo, email: e.target.value})}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">{driverInfo.email}</p>
                )}
              </div>
              <div className="form-group">
                <label>Vehicle Number</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={driverInfo.vehicleNumber}
                    onChange={(e) => setDriverInfo({...driverInfo, vehicleNumber: e.target.value})}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">{driverInfo.vehicleNumber}</p>
                )}
              </div>
            </div>

            {/* Vehicle Type and License */}
            <div className="form-row">
              <div className="form-group">
                <label>Vehicle Type</label>
                {isEditing ? (
                  <select 
                    value={driverInfo.vehicleType}
                    onChange={(e) => setDriverInfo({...driverInfo, vehicleType: e.target.value})}
                    className="form-input"
                  >
                    <option>Mini Truck</option>
                    <option>Large Truck</option>
                    <option>Pickup Van</option>
                    <option>Tempo</option>
                  </select>
                ) : (
                  <p className="form-value">{driverInfo.vehicleType}</p>
                )}
              </div>
              <div className="form-group">
                <label>License Number</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={driverInfo.licenseNumber}
                    onChange={(e) => setDriverInfo({...driverInfo, licenseNumber: e.target.value})}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">{driverInfo.licenseNumber}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="form-group">
              <label>Address</label>
              {isEditing ? (
                <textarea 
                  value={driverInfo.address}
                  onChange={(e) => setDriverInfo({...driverInfo, address: e.target.value})}
                  className="form-input"
                  rows="3"
                />
              ) : (
                <p className="form-value">{driverInfo.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportProfile;
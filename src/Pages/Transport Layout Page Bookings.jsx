import React from 'react';

const TransportBookings = () => {
  // Past bookings - easy to add more
  const bookings = [
    {
      id: "ORD-2040",
      customer: "Rajesh Kumar",
      from: "Sector 18, Noida",
      to: "Connaught Place, Delhi",
      status: "completed",
      date: "Yesterday",
      amount: "₹1,200"
    },
    {
      id: "ORD-2041",
      customer: "Priya Sharma",
      from: "Bandra West, Mumbai",
      to: "Andheri East, Mumbai",
      status: "in-progress",
      date: "Today",
      amount: "₹800"
    }
  ];

  return (
    <div>
      {/* Page header */}
      <div className="welcome-section">
        <h1 className="welcome-name">My Bookings</h1>
        <p className="welcome-text">Track and manage your completed and ongoing bookings</p>
      </div>

      {/* Bookings list */}
      <div className="orders-section">
        <div className="section-header">
          <h2 className="section-title">Recent Bookings</h2>
          <span className="new-badge">{bookings.length} total</span>
        </div>

        <div className="orders-grid">
          {bookings.map((booking, index) => (
            <div key={index} className="order-card">
              {/* Booking info */}
              <div className="order-header">
                <div>
                  <p className="order-id-label">Booking ID</p>
                  <p className="order-id">{booking.id}</p>
                </div>
                <div>
                  <p className="order-id-label">Customer</p>
                  <p className="order-id">{booking.customer}</p>
                </div>
              </div>

              {/* Route info */}
              <div className="route-section">
                <div className="route-item">
                  <span className="route-icon">📍</span>
                  <div className="route-info">
                    <h4>Pickup</h4>
                    <p>{booking.from}</p>
                  </div>
                </div>
                <div className="route-item">
                  <span className="route-icon">🎯</span>
                  <div className="route-info">
                    <h4>Drop-off</h4>
                    <p>{booking.to}</p>
                  </div>
                </div>
              </div>

              {/* Booking details */}
              <div className="order-details">
                <div className="detail-item">
                  <h4>Status</h4>
                  <p>{booking.status}</p>
                </div>
                <div className="detail-item">
                  <h4>Date</h4>
                  <p>{booking.date}</p>
                </div>
                <div className="detail-item">
                  <h4>Amount</h4>
                  <p>{booking.amount}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="order-actions">
                <button className="btn btn-primary">
                  View Details
                </button>
                <button className="btn btn-outline">
                  Contact Customer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportBookings;
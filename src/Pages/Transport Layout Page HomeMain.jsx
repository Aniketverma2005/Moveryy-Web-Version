import React, { useState } from 'react';

const TransportHome = () => {
  // Sample orders data - easy to understand and modify
  const [orders, setOrders] = useState([
    {
      id: "ORD-2042",
      from: "Omicron 1,Greater Noida",
      to: "Sector 51, Noida",
      service: "Residential Move",
      time: "Today, 10:30 AM",
      size: "2 BHK",
      status: "pending"
    },
    {
      id: "ORD-2043",
      from: "Sector 62, Noida",
      to: "Cyber City, Gurugram",
      service: "Office Relocation",
      time: "Today, 12:00 PM",
      size: "8 Desks",
      status: "pending"
    }
  ]);

  // Simple function to toggle order status
  const toggleOrderStatus = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: order.status === 'pending' ? 'accepted' : 'pending' }
        : order
    ));
  };

  // Dashboard stats - easy to update
  const stats = [
    { title: "Today's Orders", value: "2", emoji: "📦", type: "orders" },
    { title: "Monthly Earnings", value: "₹4500", emoji: "💰", type: "earnings" },
    { title: "Current Rating", value: "4.7", emoji: "⭐", type: "rating" }
  ];

  return (
    <>
      {/* Welcome message */}
      <div className="welcome-section">
        <p className="welcome-text">Welcome back,</p>
        <h1 className="welcome-name">Navi</h1>
      </div>

      {/* Stats cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
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

      {/* Orders section */}
      <div className="orders-section">
        <div className="section-header">
          <h2 className="section-title">New Orders</h2>
          <span className="new-badge">{orders.length} new</span>
        </div>

        <div className="orders-grid">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              {/* Order ID */}
              <div className="order-header">
                <div>
                  <p className="order-id-label">Order ID</p>
                  <p className="order-id">{order.id}</p>
                </div>
              </div>

              {/* Pickup and dropoff locations */}
              <div className="route-section">
                <div className="route-item">
                  <span className="route-icon">📍</span>
                  <div className="route-info">
                    <h4>Pickup</h4>
                    <p>{order.from}</p>
                  </div>
                </div>
                <div className="route-item">
                  <span className="route-icon">🎯</span>
                  <div className="route-info">
                    <h4>Drop-off</h4>
                    <p>{order.to}</p>
                  </div>
                </div>
              </div>

              {/* Order details */}
              <div className="order-details">
                <div className="detail-item">
                  <h4>Service</h4>
                  <p>{order.service}</p>
                </div>
                <div className="detail-item">
                  <h4>Date/Time</h4>
                  <p>{order.time}</p>
                </div>
                <div className="detail-item">
                  <h4>Load Size</h4>
                  <p>{order.size}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="order-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => toggleOrderStatus(order.id)}
                >
                  {order.status === 'pending' ? 'Pending' : 'Accepted'}
                </button>
                <button className="btn btn-outline">
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransportHome;
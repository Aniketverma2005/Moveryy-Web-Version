import React from 'react';

const TransportEarnings = () => {
  // Earnings summary - easy to understand
  const earningsData = [
    { period: "Today", amount: "₹1,200", trips: 3 },
    { period: "This Week", amount: "₹8,400", trips: 18 },
    { period: "This Month", amount: "₹32,500", trips: 67 },
    { period: "Total Earnings", amount: "₹1,25,000", trips: 245 }
  ];

  // Recent payments - simple list
  const recentPayments = [
    { date: "Today", orderId: "ORD-2042", amount: "₹800", status: "paid" },
    { date: "Yesterday", orderId: "ORD-2041", amount: "₹1,200", status: "paid" },
    { date: "2 days ago", orderId: "ORD-2040", amount: "₹650", status: "pending" }
  ];

  return (
    <div>
      {/* Page header */}
      <div className="welcome-section">
        <h1 className="welcome-name">Earnings Dashboard</h1>
        <p className="welcome-text">Track your income and payment history</p>
      </div>

      {/* Earnings stats */}
      <div className="stats-grid">
        {earningsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-info">
              <h3>{stat.period}</h3>
              <p className="stat-value">{stat.amount}</p>
              <p className="welcome-text">{stat.trips} trips</p>
            </div>
            <div className="stat-icon earnings">
              💰
            </div>
          </div>
        ))}
      </div>

      {/* Recent payments */}
      <div className="orders-section">
        <div className="section-header">
          <h2 className="section-title">Recent Payments</h2>
          <span className="new-badge">{recentPayments.length} payments</span>
        </div>

        <div className="orders-grid">
          {recentPayments.map((payment, index) => (
            <div key={index} className="order-card">
              {/* Payment info */}
              <div className="order-header">
                <div>
                  <p className="order-id-label">Order ID</p>
                  <p className="order-id">{payment.orderId}</p>
                </div>
                <div>
                  <p className="order-id-label">Amount</p>
                  <p className="order-id">{payment.amount}</p>
                </div>
              </div>

              {/* Payment details */}
              <div className="order-details">
                <div className="detail-item">
                  <h4>Date</h4>
                  <p>{payment.date}</p>
                </div>
                <div className="detail-item">
                  <h4>Status</h4>
                  <p>{payment.status}</p>
                </div>
                <div className="detail-item">
                  <h4>Payment Method</h4>
                  <p>Digital Wallet</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="order-actions">
                <button className="btn btn-primary">
                  View Receipt
                </button>
                <button className="btn btn-outline">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportEarnings;
import React from 'react';

const TransportRatings = () => {
  // Rating summary - simple stats
  const ratingStats = [
    { title: "Overall Rating", value: "4.7", emoji: "⭐", type: "rating" },
    { title: "Total Reviews", value: "156", emoji: "💬", type: "orders" },
    { title: "5-Star Reviews", value: "89%", emoji: "🌟", type: "earnings" }
  ];

  // Customer reviews - easy to read
  const customerReviews = [
    {
      customer: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent service! Very professional and careful with my belongings.",
      date: "2 days ago",
      orderId: "ORD-2040"
    },
    {
      customer: "Priya Sharma",
      rating: 4,
      comment: "Good service, arrived on time. Could improve communication.",
      date: "1 week ago",
      orderId: "ORD-2038"
    },
    {
      customer: "Amit Singh",
      rating: 5,
      comment: "Amazing driver! Very helpful and friendly. Highly recommended.",
      date: "2 weeks ago",
      orderId: "ORD-2035"
    }
  ];

  return (
    <div>
      {/* Page header */}
      <div className="welcome-section">
        <h1 className="welcome-name">Ratings & Reviews</h1>
        <p className="welcome-text">See what customers are saying about your service</p>
      </div>

      {/* Rating stats */}
      <div className="stats-grid">
        {ratingStats.map((stat, index) => (
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

      {/* Customer reviews */}
      <div className="orders-section">
        <div className="section-header">
          <h2 className="section-title">Recent Reviews</h2>
          <span className="new-badge">{customerReviews.length} reviews</span>
        </div>

        <div className="orders-grid">
          {customerReviews.map((review, index) => (
            <div key={index} className="order-card">
              {/* Review header */}
              <div className="order-header">
                <div>
                  <p className="order-id-label">Customer</p>
                  <p className="order-id">{review.customer}</p>
                </div>
                <div>
                  <p className="order-id-label">Rating</p>
                  <p className="order-id">{"⭐".repeat(review.rating)} ({review.rating}/5)</p>
                </div>
              </div>

              {/* Review comment */}
              <div className="route-section">
                <div className="route-item">
                  <span className="route-icon">💬</span>
                  <div className="route-info">
                    <h4>Review</h4>
                    <p>{review.comment}</p>
                  </div>
                </div>
              </div>

              {/* Review details */}
              <div className="order-details">
                <div className="detail-item">
                  <h4>Order ID</h4>
                  <p>{review.orderId}</p>
                </div>
                <div className="detail-item">
                  <h4>Date</h4>
                  <p>{review.date}</p>
                </div>
                <div className="detail-item">
                  <h4>Response</h4>
                  <p>Not replied</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="order-actions">
                <button className="btn btn-primary">
                  Reply to Review
                </button>
                <button className="btn btn-outline">
                  View Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportRatings;
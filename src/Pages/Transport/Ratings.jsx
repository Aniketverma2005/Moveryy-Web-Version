import React, { useState, useEffect } from 'react';

const Ratings = () => {
  // State for pending customer ratings
  const [customerRatings, setCustomerRatings] = useState({
    'Priya Sharma': {
      rating: 0,
      comment: '',
      orderId: 'ORD-2046',
      location: 'Sector 15, Gurugram → DLF Phase 2',
      isSubmitted: false,
      submittedAt: null
    },
    'Rohit Gupta': {
      rating: 0,
      comment: '',
      orderId: 'ORD-2047',
      location: 'Connaught Place → Karol Bagh, Delhi',
      isSubmitted: false,
      submittedAt: null
    }
  });

  const [filterDate, setFilterDate] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const [hoveredStar, setHoveredStar] = useState({ customer: '', star: -1 });

  // More realistic and diverse rating history
  const ratingHistory = [
    {
      orderId: 'ORD-2045',
      customerName: 'Arjun Mehta',
      date: '15/01/2025',
      rating: 5,
      comment: 'Bhai sahab, ekdum perfect service! Saman bilkul safe pahuncha diya. Driver bhi bahut polite tha. 👍',
      location: 'Dwarka → Vasant Kunj'
    },
    {
      orderId: 'ORD-2044',
      customerName: 'Kavya Singh',
      date: '12/01/2025',
      rating: 4,
      comment: 'Good service overall. Driver was on time and handled everything professionally. Just wish the truck was a bit cleaner.',
      location: 'Gurgaon → Noida'
    },
    {
      orderId: 'ORD-2043',
      customerName: 'Vikash Kumar',
      date: '08/01/2025',
      rating: 5,
      comment: 'Excellent work! Helped me move my entire 3BHK without any damage. Very careful with fragile items. Highly recommend! 🌟',
      location: 'Lajpat Nagar → Greater Kailash'
    },
    {
      orderId: 'ORD-2042',
      customerName: 'Sneha Joshi',
      date: '05/01/2025',
      rating: 3,
      comment: 'Service was okay but took longer than expected. Driver was helpful though.',
      location: 'Rohini → Pitampura'
    },
    {
      orderId: 'ORD-2041',
      customerName: 'Rajesh Agarwal',
      date: '02/01/2025',
      rating: 5,
      comment: 'Outstanding! Made my office relocation so smooth. Team was very professional and efficient. Will definitely use again.',
      location: 'CP → Cyber City'
    }
  ];

  // Star rating descriptions for better UX
  const ratingDescriptions = {
    1: 'Poor - Not satisfied',
    2: 'Fair - Below expectations',
    3: 'Good - Met expectations',
    4: 'Very Good - Above expectations',
    5: 'Excellent - Outstanding service!'
  };

  // Handle star click with better feedback
  const handleStarClick = (customer, starIndex) => {
    const newRating = starIndex + 1;
    setCustomerRatings(prev => ({
      ...prev,
      [customer]: {
        ...prev[customer],
        rating: newRating
      }
    }));

    // Show brief feedback
    setShowSuccessMessage(`${newRating} star${newRating > 1 ? 's' : ''} selected for ${customer.split(' ')[0]}`);
    setTimeout(() => setShowSuccessMessage(''), 2000);
  };

  // Handle comment changes with character count
  const handleCommentChange = (customer, comment) => {
    if (comment.length <= 500) { // Limit comment length
      setCustomerRatings(prev => ({
        ...prev,
        [customer]: {
          ...prev[customer],
          comment: comment
        }
      }));
    }
  };

  // Submit rating with validation and feedback
  const handleSubmitRating = (customer) => {
    const customerData = customerRatings[customer];

    if (customerData.rating === 0) {
      alert('Please select a star rating before submitting!');
      return;
    }

    setCustomerRatings(prev => ({
      ...prev,
      [customer]: {
        ...prev[customer],
        isSubmitted: true,
        submittedAt: new Date().toLocaleString()
      }
    }));

    setShowSuccessMessage(`Thank you! Your rating for ${customer.split(' ')[0]} has been submitted successfully! 🎉`);
    setTimeout(() => setShowSuccessMessage(''), 4000);
  };

  // Interactive star rendering with hover effects
  const renderInteractiveStars = (customer, currentRating) => {
    const customerData = customerRatings[customer];

    return (
      <div className="flex flex-col items-end">
        <div className="flex space-x-1 mb-2">
          {[0, 1, 2, 3, 4].map((starIndex) => {
            const isActive = starIndex < currentRating;
            const isHovered = hoveredStar.customer === customer && starIndex <= hoveredStar.star;

            return (
              <button
                key={starIndex}
                onClick={() => !customerData.isSubmitted && handleStarClick(customer, starIndex)}
                onMouseEnter={() => !customerData.isSubmitted && setHoveredStar({ customer, star: starIndex })}
                onMouseLeave={() => setHoveredStar({ customer: '', star: -1 })}
                className={`text-2xl transition-all duration-200 ${customerData.isSubmitted
                    ? 'cursor-default'
                    : 'cursor-pointer hover:scale-125 active:scale-110'
                  } ${isActive || isHovered ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                disabled={customerData.isSubmitted}
                title={ratingDescriptions[starIndex + 1]}
              >
                ★
              </button>
            );
          })}
        </div>

        {/* Rating description */}
        {(currentRating > 0 || hoveredStar.customer === customer) && (
          <p className="text-xs text-gray-500 text-right">
            {ratingDescriptions[hoveredStar.customer === customer ? hoveredStar.star + 1 : currentRating]}
          </p>
        )}
      </div>
    );
  };

  // History stars with better visual feedback
  const renderHistoryStars = (rating) => {
    return (
      <div className="flex space-x-1 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  // Format date for better readability
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(year, month - 1, day);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return dateStr;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {showSuccessMessage}
        </div>
      )}

      {/* Header with more personality */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              Driver Rating
              <div className="ml-4 flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                <span className="text-yellow-500 text-2xl mr-2">★</span>
                <span className="text-2xl font-bold text-gray-900">4.7</span>
                <span className="text-sm text-gray-600 ml-2">(248 reviews)</span>
              </div>
            </h1>
            <p className="text-gray-600 mt-2"></p>
          </div>
        </div>
      </div>

      {/* Rate Recent Customers Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Rate Recent Customers</h2>
          <span className="text-sm text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
            2 pending ratings
          </span>
        </div>

        <div className="space-y-8">
          {Object.entries(customerRatings).map(([customerName, data], index) => (
            <div key={customerName} className={`${index === 0 ? 'border-b border-gray-100 pb-6' : ''}`}>
              {/* Customer Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{customerName}</h3>
                    {data.isSubmitted && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✓ Submitted
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Order:</span> {data.orderId}</p>
                    <p><span className="font-medium">Route:</span> {data.location}</p>
                    {data.submittedAt && (
                      <p><span className="font-medium">Submitted:</span> {data.submittedAt}</p>
                    )}
                  </div>
                </div>
                {renderInteractiveStars(customerName, data.rating)}
              </div>

              {/* Comment Section */}
              <div className="mb-4">
                <textarea
                  placeholder={`Share your experience with ${customerName.split(' ')[0]}... (optional)`}
                  value={data.comment}
                  onChange={(e) => handleCommentChange(customerName, e.target.value)}
                  disabled={data.isSubmitted}
                  className={`w-full p-4 border border-gray-300 rounded-lg resize-none h-24 text-sm transition-colors ${data.isSubmitted
                      ? 'bg-gray-50 cursor-not-allowed'
                      : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {data.comment.length}/500 characters
                  </span>
                  {data.comment.length > 400 && (
                    <span className="text-xs text-orange-500">
                      {500 - data.comment.length} characters remaining
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                {data.isSubmitted ? (
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span className="font-medium">Rating Submitted</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubmitRating(customerName)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${data.rating > 0
                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    disabled={data.rating === 0}
                  >
                    Submit Rating {data.rating > 0 && `(${data.rating} ★)`}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating History Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Rating History</h2>
            <p className="text-sm text-gray-600"></p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by date (dd/mm/yyyy)"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {ratingHistory
            .filter(item => !filterDate || item.date.includes(filterDate))
            .map((item, index) => (
              <div key={index} className="flex justify-between items-start p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all hover:shadow-md">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {item.orderId}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 font-medium">{formatDate(item.date)}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
                      {item.location}
                    </span>
                  </div>

                  <p className="text-lg font-medium text-gray-800 mb-2">{item.customerName}</p>

                  {item.comment && (
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-200">
                      <p className="text-sm text-gray-700 italic">"{item.comment}"</p>
                    </div>
                  )}
                </div>

                <div className="ml-6 text-right">
                  {renderHistoryStars(item.rating)}
                  <p className="text-xs text-gray-500 mt-1">
                    {item.rating >= 4 ? 'Great job! 👏' : item.rating >= 3 ? 'Good work 👍' : 'Room for improvement'}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {ratingHistory.filter(item => !filterDate || item.date.includes(filterDate)).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <p className="text-gray-500">No ratings found for the selected date</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ratings;
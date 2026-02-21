/**
 * Driver Dashboard Home Page
 * 
 * This is the main dashboard that drivers see when they log in.
 * It shows:
 * - A personalized welcome message
 * - Key performance stats (orders, earnings, ratings)
 * - Available orders they can accept
 * 
 * Think of this as the "command center" for drivers to manage their day.
 */

import React, { useState, useCallback } from 'react';
import { MdInfo, MdTrendingUp, MdStar, MdLocationOn, MdSchedule, MdHome, MdBusiness } from 'react-icons/md';

/**
 * Driver Performance Data
 * 
 * In a real application, this would come from an API call to get the driver's
 * current statistics. For now, we're using sample data to show what it would look like.
 * 
 * Future improvements:
 * - Add loading states while fetching data
 * - Handle API errors gracefully
 * - Cache data to improve performance
 * - Add real-time updates for live stats
 */
const DRIVER_STATS = {
  driverName: "John Doe", // Would come from user authentication
  todaysOrders: 2, // Orders completed today
  monthlyEarnings: "₹4500", // Total earnings this month
  currentRating: 4.7, // Average customer rating
  // Additional stats we might want to show:
  // completionRate: 98.5, // Percentage of orders completed successfully
  // totalTrips: 1247, // Lifetime trips completed
  // responseTime: "2.3 min" // Average time to accept orders
};

/**
 * Available Orders Data
 * 
 * This represents new orders that drivers can choose to accept.
 * In a real app, this would be fetched from a backend service and updated in real-time.
 * 
 * Each order contains:
 * - Basic info (ID, status)
 * - Location details (pickup and dropoff)
 * - Job specifics (load type, timing, size)
 */
const NEW_ORDERS = [
  {
    id: "ORD-2042",
    priority: "normal", // Could be "urgent", "normal", "low"
    estimatedDuration: "2-3 hours", // How long the job might take
    estimatedEarnings: "₹800", // What the driver would earn
    pickup: {
      location: "Sandra Kurla Complex, Mumbai",
      type: "pickup",
      contactName: "Priya Sharma", // Customer contact
      contactPhone: "+91 98765 43210"
    },
    dropoff: {
      location: "Andheri West, Mumbai", 
      type: "dropoff",
      distance: "12.5 km" // Distance from pickup
    },
    details: {
      loadType: "Residential Move",
      time: "Today, 10:30 AM",
      load: "2 BHK",
      specialInstructions: "Fragile items included" // Any special notes
    },
    status: "pending"
  },
  {
    id: "ORD-2043",
    priority: "urgent", // This order needs immediate attention
    estimatedDuration: "1-2 hours",
    estimatedEarnings: "₹600",
    pickup: {
      location: "MG Road, Bengaluru",
      type: "pickup",
      contactName: "Rajesh Kumar",
      contactPhone: "+91 87654 32109"
    },
    dropoff: {
      location: "Koramangala, Bengaluru",
      type: "dropoff",
      distance: "8.2 km"
    },
    details: {
      loadType: "Office Relocation", 
      time: "Today, 12:00 PM",
      load: "8 Desks",
      specialInstructions: "Ground floor pickup and delivery"
    },
    status: "pending"
  }
];

/**
 * Statistics Card Component
 * 
 * This creates those nice-looking cards that show driver performance metrics.
 * Each card has an icon, title, and the actual stat value.
 * 
 * @param {string} title - What this stat represents (e.g., "Today's Orders")
 * @param {string|number} value - The actual statistic to display
 * @param {ReactElement} icon - The icon to show (from react-icons)
 * @param {string} iconBgColor - Background color for the icon circle
 * @param {string} iconColor - Color of the icon itself
 * @param {boolean} isLoading - Whether we're still fetching this data
 * @param {Function} onClick - Optional click handler for interactive stats
 */
const StatCard = ({ 
  title, 
  value, 
  icon, 
  iconBgColor, 
  iconColor, 
  isLoading = false, 
  onClick,
  trend = null // Could show if stat is going up/down
}) => {
  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
    );
  }

  const cardClasses = `bg-white rounded-lg p-6 shadow-sm border border-gray-200 transition-all duration-200 ${
    onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : ''
  }`;

  return (
    <div className={cardClasses} onClick={onClick} role={onClick ? "button" : undefined}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-8 h-8 ${iconBgColor} rounded-full flex items-center justify-center`}>
          {React.cloneElement(icon, { 
            className: `${iconColor} text-lg`,
            'aria-hidden': true 
          })}
        </div>
      </div>
      
      <div className="flex items-end gap-2">
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Welcome Header Component
 * 
 * This creates a personalized greeting for the driver when they open the app.
 * It's the first thing they see, so we want it to feel warm and welcoming.
 * 
 * @param {string} driverName - The driver's name from their profile
 * @param {string} timeOfDay - Optional time-based greeting (morning, afternoon, evening)
 */
const WelcomeHeader = ({ driverName, timeOfDay }) => {
  // Create a time-appropriate greeting
  const getGreeting = () => {
    if (timeOfDay) {
      return `Good ${timeOfDay}`;
    }
    
    // If no time provided, use a generic but friendly greeting
    return "Welcome back";
  };

  // Safety check - make sure we have a driver name
  if (!driverName) {
    return (
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">Welcome back</p>
        <h1 className="text-2xl font-bold text-gray-800">Driver</h1>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <p className="text-sm text-gray-500 mb-1">{getGreeting()}</p>
      <h1 className="text-2xl font-bold text-gray-800">{driverName}</h1>
      {/* Could add additional info like weather, traffic alerts, etc. */}
    </div>
  );
};

/**
 * Location Point Component
 * 
 * This shows a pickup or dropoff location with a colored dot indicator.
 * Orange dots = pickup locations, Blue dots = dropoff locations.
 * This visual pattern helps drivers quickly scan order details.
 * 
 * @param {string} type - Either "pickup" or "dropoff"
 * @param {string} location - The address or location name
 * @param {string} contactInfo - Optional contact details for this location
 */
const LocationPoint = ({ type, location, contactInfo }) => {
  const isPickup = type === "pickup";
  
  // Visual styling based on location type
  const dotColor = isPickup ? "bg-orange-500" : "bg-blue-500";
  const label = isPickup ? "Pickup" : "Drop-off";
  const icon = isPickup ? "📍" : "🏁"; // Fun emoji indicators
  
  // Safety check - make sure we have required data
  if (!location) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="font-medium text-gray-500 italic">Location not specified</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start gap-3">
      <div className={`w-2 h-2 ${dotColor} rounded-full mt-2 flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <span>{label}</span>
          <span className="text-xs">{icon}</span>
        </p>
        <p className="font-medium text-gray-800 truncate" title={location}>
          {location}
        </p>
        {contactInfo && (
          <p className="text-xs text-gray-500 mt-1">{contactInfo}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Order Card Component
 * 
 * This displays a single order that a driver can choose to accept.
 * It shows all the important details at a glance:
 * - Where to pick up and drop off
 * - What kind of job it is
 * - When it needs to be done
 * - How much stuff needs to be moved
 * 
 * @param {Object} order - The order data from the backend
 * @param {Function} onAccept - Called when driver accepts the order
 * @param {Function} onViewDetails - Called when driver wants more info
 * @param {boolean} isAccepting - Whether we're currently processing an accept action
 */
const OrderCard = ({ 
  order, 
  onAccept, 
  onViewDetails, 
  isAccepting = false 
}) => {
  // Safety check - make sure we have valid order data
  if (!order || !order.id) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <p className="text-gray-500 text-center">Order data unavailable</p>
      </div>
    );
  }

  // Handle accepting an order
  const handleAcceptOrder = useCallback(async () => {
    if (isAccepting) return; // Prevent double-clicks
    
    try {
      // In a real app, this would call an API to accept the order
      console.log(`🚚 Driver accepting order ${order.id}`);
      console.log(`📍 Pickup: ${order.pickup?.location}`);
      console.log(`🏁 Dropoff: ${order.dropoff?.location}`);
      console.log(`💰 Estimated earnings: ${order.estimatedEarnings}`);
      
      // Call the parent component's accept handler if provided
      if (onAccept) {
        await onAccept(order);
      }
    } catch (error) {
      console.error('Failed to accept order:', error);
      // In a real app, show user-friendly error message
    }
  }, [order, onAccept, isAccepting]);

  // Handle viewing order details
  const handleViewDetails = useCallback(() => {
    try {
      console.log(`👀 Viewing details for order ${order.id}`);
      
      // In a real app, this would navigate to order details page
      if (onViewDetails) {
        onViewDetails(order);
      }
    } catch (error) {
      console.error('Failed to view order details:', error);
    }
  }, [order, onViewDetails]);

  // Determine priority styling
  const getPriorityStyles = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'border-red-200 bg-red-50';
      case 'high':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  // Get priority indicator
  const getPriorityIndicator = (priority) => {
    if (priority?.toLowerCase() === 'urgent') {
      return <span className="text-red-600 text-xs font-medium">🔥 URGENT</span>;
    }
    return null;
  };

  const cardClasses = `border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${getPriorityStyles(order.priority)}`;

  return (
    <div className={cardClasses}>
      {/* Order header with ID and priority */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs text-gray-500">Order ID</span>
          <p className="font-semibold text-gray-800">{order.id}</p>
        </div>
        {getPriorityIndicator(order.priority)}
      </div>

      {/* Pickup and dropoff locations with contact info */}
      <div className="space-y-3 mb-4">
        <LocationPoint 
          type="pickup" 
          location={order.pickup?.location} 
          contactInfo={order.pickup?.contactName}
        />
        <LocationPoint 
          type="dropoff" 
          location={order.dropoff?.location}
          contactInfo={order.dropoff?.distance && `${order.dropoff.distance} away`}
        />
      </div>

      {/* Job details in an easy-to-scan grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Load Type</p>
          <p className="font-medium text-gray-800" title={order.details?.loadType}>
            {order.details?.loadType || 'Not specified'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Time</p>
          <p className="font-medium text-gray-800" title={order.details?.time}>
            {order.details?.time || 'TBD'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Load</p>
          <p className="font-medium text-gray-800" title={order.details?.load}>
            {order.details?.load || 'Not specified'}
          </p>
        </div>
      </div>

      {/* Earnings and duration info */}
      {(order.estimatedEarnings || order.estimatedDuration) && (
        <div className="flex justify-between items-center mb-4 p-2 bg-green-50 rounded-lg">
          {order.estimatedEarnings && (
            <span className="text-green-700 font-medium text-sm">
              💰 {order.estimatedEarnings}
            </span>
          )}
          {order.estimatedDuration && (
            <span className="text-gray-600 text-sm">
              ⏱️ {order.estimatedDuration}
            </span>
          )}
        </div>
      )}

      {/* Special instructions if any */}
      {order.details?.specialInstructions && (
        <div className="mb-4 p-2 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-xs text-gray-600 mb-1">Special Instructions:</p>
          <p className="text-sm text-gray-800">{order.details.specialInstructions}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button 
          onClick={handleAcceptOrder}
          disabled={isAccepting}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            isAccepting 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
          aria-label={`Accept order ${order.id}`}
        >
          {isAccepting ? 'Accepting...' : 'Accept Order'}
        </button>
        <button 
          onClick={handleViewDetails}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          aria-label={`View details for order ${order.id}`}
        >
          More Details
        </button>
      </div>
    </div>
  );
};

/**
 * Main Home Dashboard Component
 * 
 * This is where everything comes together to create the driver's main dashboard.
 * It manages the state for loading, errors, and user interactions.
 */
const Home = () => {
  // State management for the dashboard
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [acceptingOrderId, setAcceptingOrderId] = useState(null);
  const [error, setError] = useState(null);

  // Get current time of day for personalized greeting
  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  // Handle accepting an order - this would integrate with your backend
  const handleAcceptOrder = useCallback(async (order) => {
    setAcceptingOrderId(order.id);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you'd call your backend API here
      console.log(`✅ Successfully accepted order ${order.id}`);
      console.log(`🎉 Driver will earn ${order.estimatedEarnings} for this job`);
      
      // Show success message to user (in a real app, you'd use a toast notification)
      alert(`Great! You've accepted order ${order.id}. Check your bookings for next steps.`);
      
    } catch (error) {
      console.error('❌ Failed to accept order:', error);
      setError(`Failed to accept order ${order.id}. Please try again.`);
    } finally {
      setAcceptingOrderId(null);
    }
  }, []);

  // Handle viewing order details - this would navigate to a details page
  const handleViewOrderDetails = useCallback((order) => {
    console.log(`📋 Opening detailed view for order ${order.id}`);
    // In a real app, you'd navigate to a detailed order page
    // Example: navigate(`/transport/orders/${order.id}`);
  }, []);

  // Handle clicking on stat cards - could show detailed analytics
  const handleStatClick = useCallback((statTitle) => {
    console.log(`📊 User clicked on ${statTitle} stat`);
    // In a real app, you might navigate to detailed analytics
    // Example: navigate(`/transport/analytics?focus=${statTitle.toLowerCase()}`);
  }, []);

  // Dashboard stats configuration - makes it easy to modify or add new stats
  const dashboardStats = [
    {
      title: "Today's Orders",
      value: DRIVER_STATS.todaysOrders,
      icon: <MdInfo />,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      onClick: () => handleStatClick("Today's Orders")
    },
    {
      title: "Monthly Earnings", 
      value: DRIVER_STATS.monthlyEarnings,
      icon: <MdTrendingUp />,
      iconBgColor: "bg-green-100", 
      iconColor: "text-green-600",
      onClick: () => handleStatClick("Monthly Earnings")
    },
    {
      title: "Current Rating",
      value: DRIVER_STATS.currentRating,
      icon: <MdStar />,
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      onClick: () => handleStatClick("Current Rating")
    }
  ];

  // Show error message if something went wrong
  const ErrorMessage = ({ message, onDismiss }) => (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-red-800 text-sm">{message}</p>
        <button 
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Dismiss
        </button>
      </div>
    </div>
  );

  // Show message when no orders are available
  const NoOrdersMessage = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">📦</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">No New Orders</h3>
      <p className="text-gray-600 mb-4">
        All caught up! New orders will appear here when they become available.
      </p>
      <button 
        className="text-blue-600 hover:text-blue-700 font-medium"
        onClick={() => window.location.reload()}
      >
        Refresh to check for new orders
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Show error message if there's an issue */}
      {error && (
        <ErrorMessage 
          message={error} 
          onDismiss={() => setError(null)} 
        />
      )}

      {/* Personalized welcome message with time-based greeting */}
      <WelcomeHeader 
        driverName={DRIVER_STATS.driverName} 
        timeOfDay={getCurrentTimeOfDay()}
      />

      {/* Dashboard statistics cards - clickable for detailed views */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <StatCard 
            key={`stat-${index}`} 
            {...stat} 
            isLoading={isLoadingStats}
          />
        ))}
      </div>

      {/* Available orders section - the heart of the driver experience */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">New Orders</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-blue-600 font-medium">
                {NEW_ORDERS.length} new
              </span>
              {isLoadingOrders && (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {NEW_ORDERS.length === 0 ? (
            <NoOrdersMessage />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Render each order using the enhanced OrderCard component */}
              {NEW_ORDERS.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  onAccept={handleAcceptOrder}
                  onViewDetails={handleViewOrderDetails}
                  isAccepting={acceptingOrderId === order.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Future enhancement: Could add a floating action button for quick actions */}
      {/* Future enhancement: Could add real-time order notifications */}
      {/* Future enhancement: Could add driver location toggle */}
    </div>
  );
};

export default Home;
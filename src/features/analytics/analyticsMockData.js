// Synthetic analytics data (can be replaced with real API response)

export const analyticsMockData = {
  stats: {
    revenue: "₹2,56,800",
    bookings: 142,
    avgBookingValue: "₹1,809",
    rating: "4.3/5.0",
  },

  monthlyRevenue: [
    { month: "Jan", revenue: 40000 },
    { month: "Feb", revenue: 32000 },
    { month: "Mar", revenue: 40000 },
    { month: "Apr", revenue: 38000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 71000 },
  ],

  bookingStatus: [
    { status: "Completed", count: 69, color: "bg-blue-600" },
    { status: "Confirmed", count: 25, color: "bg-green-600" },
    { status: "In Progress", count: 18, color: "bg-yellow-600" },
    { status: "Pending", count: 10, color: "bg-red-600" },
  ],

  topRoutes: [
    { route: "Delhi - Mumbai", bookings: 23, revenue: "₹1,56,000" },
    { route: "Bangalore - Chennai", bookings: 18, revenue: "₹1,26,000" },
    { route: "Pune - Hyderabad", bookings: 15, revenue: "₹1,05,000" },
    { route: "Mumbai - Pune", bookings: 12, revenue: "₹72,000" },
    { route: "Chennai - Bangalore", bookings: 10, revenue: "₹58,000" },
  ],

  customerInsights: {
    newCustomers: 45,
    returningCustomers: 28,
    customerRetention: 38.4,
    avgRating: 4.3,
  },
};

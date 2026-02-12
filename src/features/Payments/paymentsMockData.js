export const paymentsMockData = {
  integration: {
    provider: "Razorpay",
    status: "Not Connected",
  },

  payments: [
    { id: "pay_1MnR2KjS72A", customerName: "Rajesh Kumar", amount: 8500, date: "25/01/2024 10:45 AM", status: "Success", mode: "UPI", bookingId: "BK001" },
    { id: "pay_1MnR3KjS72B", customerName: "Priya Sharma", amount: 5200, date: "25/01/2024 11:45 AM", status: "Success", mode: "CARD", bookingId: "BK002" },
    { id: "pay_1MnR4KjS72C", customerName: "Amit Patel", amount: 7800, date: "25/01/2024 02:30 PM", status: "Failed", mode: "NETBANKING", bookingId: "BK003" },
    { id: "pay_1MnR5KjS72D", customerName: "Sunita Gupta", amount: 4500, date: "25/01/2024 04:15 PM", status: "Success", mode: "WALLET", bookingId: "BK004" },
    { id: "pay_1MnR6KjS72E", customerName: "Ravi Singh", amount: 3200, date: "25/01/2024 07:30 PM", status: "Refunded", mode: "UPI", bookingId: "BK005" },
    { id: "pay_1MnR7KjS72F", customerName: "Meera Joshi", amount: 9800, date: "26/01/2024 10:15 AM", status: "Success", mode: "CARD", bookingId: "BK006" },
    { id: "pay_1MnR8KjS72G", customerName: "Deepak Verma", amount: 5600, date: "19/01/2024 02:20 PM", status: "Pending", mode: "NETBANKING", bookingId: "BK007" },
  ],
};

// import React from 'react';
// import {
//   MdOutlineCloud, MdOutlineInfo, MdOutlineDownload, MdOutlineCreditCard,
//   MdOutlineAccountBalanceWallet, MdOutlineLocalPhone, MdOutlineCalendarToday,
//   MdOutlineSearch, MdOutlineBusinessCenter// Make sure MdOutlineSearch is included here
// } from 'react-icons/md';
// import { HiOutlineLink } from 'react-icons/hi';
// // ... rest of your imports
// // Helper for the summary cards
// const PaymentStatCard = ({ title, value, color }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm flex-1 flex flex-col justify-between items-center text-center">
//     <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
//     <p className="text-sm text-gray-500">{title}</p>
//   </div>
// );

// // Helper for table rows
// const PaymentTableRow = ({ transaction }) => {
//   const statusStyles = {
//     Success: 'bg-green-100 text-green-600',
//     Failed: 'bg-red-100 text-red-600',
//     Refunded: 'bg-indigo-100 text-indigo-600',
//     Pending: 'bg-yellow-100 text-yellow-600',
//   };

//   const modeIcons = {
//     UPI: <MdOutlineLocalPhone size={16} className="text-gray-500" />,
//     CARD: <MdOutlineCreditCard size={16} className="text-gray-500" />,
//     NETBANKING: <MdOutlineBusinessCenter size={16} className="text-gray-500" />,
//     WALLET: <MdOutlineAccountBalanceWallet size={16} className="text-gray-500" />,
//   };
  
//   return (
//     <tr className="border-b border-gray-100 last:border-b-0">
//       <td className="py-4 px-2 text-sm font-semibold text-gray-700">{transaction.id}</td>
//       <td className="py-4 px-2 text-sm text-gray-600">{transaction.customerName}</td>
//       <td className="py-4 px-2 text-sm font-semibold text-gray-800">{transaction.amount}</td>
//       <td className="py-4 px-2 text-sm text-gray-600">{transaction.date}</td>
//       <td className="py-4 px-2">
//         <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[transaction.status]}`}>
//           {transaction.status}
//         </span>
//       </td>
//       <td className="py-4 px-2">
//         <div className="flex items-center gap-1 text-sm text-gray-600">
//           {modeIcons[transaction.mode]}
//           <span>{transaction.mode}</span>
//         </div>
//       </td>
//       <td className="py-4 px-2">
//         <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
//           {transaction.bookingId}
//         </a>
//       </td>
//     </tr>
//   );
// };

// const paymentHistory = [
//   { id: 'pay_1MnR2KjS72A', customerName: 'Rajesh Kumar', amount: '₹8,500', date: '25/1/2024 10:45 am', status: 'Success', mode: 'UPI', bookingId: 'BK001' },
//   { id: 'pay_1MnR3KjS72B', customerName: 'Priya Sharma', amount: '₹5,200', date: '25/1/2024 11:45 am', status: 'Success', mode: 'CARD', bookingId: 'BK002' },
//   { id: 'pay_1MnR4KjS72C', customerName: 'Amit Patel', amount: '₹7,800', date: '25/1/2024 02:30 pm', status: 'Failed', mode: 'NETBANKING', bookingId: 'BK003' },
//   { id: 'pay_1MnR5KjS72D', customerName: 'Sunita Gupta', amount: '₹4,500', date: '25/1/2024 04:15 pm', status: 'Success', mode: 'WALLET', bookingId: 'BK004' },
//   { id: 'pay_1MnR6KjS72E', customerName: 'Ravi Singh', amount: '₹3,200', date: '25/1/2024 07:30 pm', status: 'Refunded', mode: 'UPI', bookingId: 'BK005' },
//   { id: 'pay_1MnR7KjS72F', customerName: 'Meera Joshi', amount: '₹9,800', date: '26/1/2024 10:15 am', status: 'Success', mode: 'CARD', bookingId: 'BK006' },
//   { id: 'pay_1MnR8KjS72G', customerName: 'Deepak Verma', amount: '₹5,600', date: '19/1/2024 02:20 pm', status: 'Pending', mode: 'NETBANKING', bookingId: 'BK007' },
// ];

// const PaymentIntegrationPage = () => {
//   const totalCollected = paymentHistory.filter(p => p.status === 'Success').reduce((sum, p) => sum + parseFloat(p.amount.replace('₹', '').replace(',', '')), 0);
//   const successfulPayments = paymentHistory.filter(p => p.status === 'Success').length;
//   const failedPayments = paymentHistory.filter(p => p.status === 'Failed').length;
//   const totalRefunded = paymentHistory.filter(p => p.status === 'Refunded').reduce((sum, p) => sum + parseFloat(p.amount.replace('₹', '').replace(',', '')), 0);

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 font-inter">
//       {/* Header and Integration Status */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Payment Integration</h1>
//           <p className="text-gray-500 text-sm">Connect your Razorpay account to accept online payments</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-red-500"></div>
//           <span className="text-sm font-medium text-gray-500">Not Connected</span>
//         </div>
//       </div>

//       {/* Razorpay Integration Card */}
//       <div className="flex bg-white p-8 rounded-xl shadow-sm mb-6 border border-gray-100">
//         <div className="w-1/4">
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-xl font-bold">Razorpay Integration</span>
//             <span className="text-xs text-blue-600 px-2 py-1 rounded-full bg-blue-100">PRO</span>
//           </div>
//           <p className="text-sm text-gray-500">Connect your Razorpay account to accept online payments</p>
//         </div>
//         <div className="flex-1 ml-8">
//           <div className="flex gap-6 mb-4">
//             <div className="flex-1">
//               <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
//                 <span>API Key</span>
//                 <MdOutlineInfo size={16} className="text-gray-400" />
//               </label>
//               <input type="text" placeholder="Enter your Razorpay API Key" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//             </div>
//             <div className="flex-1">
//               <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
//                 <span>Secret Key</span>
//                 <MdOutlineInfo size={16} className="text-gray-400" />
//               </label>
//               <input type="text" placeholder="Enter your Razorpay Secret Key" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//             </div>
//           </div>
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-1/2 mr-4">
//               <label className="text-sm font-medium text-gray-700 mb-1 block">Webhook URL</label>
//               <div className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
//                 <a href="#" className="text-blue-600 hover:underline">https://swiftmovers.com/webhook/razorpay</a>
//               </div>
//             </div>
//             <button className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-4">
//               <HiOutlineLink size={16} />
//               <span>Connect Razorpay</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <PaymentStatCard title="Total Collected" value={`₹${totalCollected.toLocaleString()}`} color="text-gray-800" />
//         <PaymentStatCard title="Successful Payments" value={successfulPayments} color="text-green-600" />
//         <PaymentStatCard title="Failed Payments" value={failedPayments} color="text-red-600" />
//         <PaymentStatCard title="Total Refunded" value={`₹${totalRefunded.toLocaleString()}`} color="text-blue-600" />
//       </div>

//       {/* Payment History Table */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
//           <div className="flex items-center gap-2">
//             <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
//               <MdOutlineDownload size={20} />
//               <span>Export CSV</span>
//             </button>
//           </div>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <div className="relative flex-grow mr-4">
//             <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search by transaction ID, customer, or booking ID..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//               <option>All Status</option>
//               <option>Success</option>
//               <option>Failed</option>
//               <option>Refunded</option>
//               <option>Pending</option>
//             </select>
//             <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//               <option>All Modes</option>
//               <option>UPI</option>
//               <option>CARD</option>
//               <option>NETBANKING</option>
//               <option>WALLET</option>
//             </select>
//             <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//               <option>All Time</option>
//               <option>Today</option>
//               <option>Last 7 Days</option>
//               <option>Last 30 Days</option>
//             </select>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-100">
//             <thead>
//               <tr className="text-left text-xs font-medium text-gray-400">
//                 <th className="py-3 px-2">Transaction ID</th>
//                 <th className="py-3 px-2">Customer Name</th>
//                 <th className="py-3 px-2">Amount</th>
//                 <th className="py-3 px-2">Date</th>
//                 <th className="py-3 px-2">Status</th>
//                 <th className="py-3 px-2">Mode</th>
//                 <th className="py-3 px-2">Booking</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paymentHistory.map(transaction => (
//                 <PaymentTableRow key={transaction.id} transaction={transaction} />
//               ))}
//             </tbody>
//           </table>
//           <div className="flex justify-between items-center text-sm text-gray-500 mt-4 px-2">
//             <span>Showing 1 of 7 transactions</span>
//             <span>Total: ₹{totalCollected.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentIntegrationPage;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineInfo,
//   MdOutlineDownload,
//   MdOutlineCreditCard,
//   MdOutlineAccountBalanceWallet,
//   MdOutlineLocalPhone,
//   MdOutlineSearch,
//   MdOutlineBusinessCenter,
// } from "react-icons/md";
// import { HiOutlineLink } from "react-icons/hi";
// import { fetchPayments } from "../../features/payments/paymentsSlice";

// /* ---------- UI HELPERS ---------- */

// const StatCard = ({ title, value, color }) => (
//   <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
//     <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
//     <p className="text-sm text-gray-500">{title}</p>
//   </div>
// );

// const PaymentRow = ({ p }) => {
//   const statusMap = {
//     Success: "bg-green-100 text-green-600",
//     Failed: "bg-red-100 text-red-600",
//     Refunded: "bg-indigo-100 text-indigo-600",
//     Pending: "bg-yellow-100 text-yellow-600",
//   };

//   const modeIcons = {
//     UPI: <MdOutlineLocalPhone />,
//     CARD: <MdOutlineCreditCard />,
//     NETBANKING: <MdOutlineBusinessCenter />,
//     WALLET: <MdOutlineAccountBalanceWallet />,
//   };

//   return (
//     <tr className="border-b border-gray-200">
//       <td className="py-4 text-sm font-semibold text-gray-700">{p.id}</td>
//       <td className="text-sm text-gray-600">{p.customerName}</td>
//       <td className="text-sm font-semibold">₹{p.amount.toLocaleString()}</td>
//       <td className="text-sm text-gray-600">{p.date}</td>
//       <td>
//         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusMap[p.status]}`}>
//           {p.status}
//         </span>
//       </td>
//       <td className="flex items-center gap-1 text-sm text-gray-600">
//         {modeIcons[p.mode]} {p.mode}
//       </td>
//       <td>
//         <a href="#" className="text-blue-600 text-sm">{p.bookingId}</a>
//       </td>
//     </tr>
//   );
// };

// /* ---------- PAGE ---------- */

// const PaymentIntegrationPage = () => {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.payments);

//   useEffect(() => {
//     dispatch(fetchPayments());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="p-6 space-y-6 animate-pulse">
//         <div className="h-7 w-56 bg-gray-200 rounded" />
//         <div className="h-40 bg-gray-200 rounded-xl" />
//         <div className="grid grid-cols-4 gap-4">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="h-24 bg-gray-200 rounded-xl" />
//           ))}
//         </div>
//         <div className="h-64 bg-gray-200 rounded-xl" />
//       </div>
//     );
//   }

//   if (!data) return null;

//   const totalCollected = data.payments
//     .filter((p) => p.status === "Success")
//     .reduce((sum, p) => sum + p.amount, 0);

//   const failed = data.payments.filter((p) => p.status === "Failed").length;
//   const success = data.payments.filter((p) => p.status === "Success").length;
//   const refunded = data.payments
//     .filter((p) => p.status === "Refunded")
//     .reduce((sum, p) => sum + p.amount, 0);

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 space-y-8">

//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Payment Integration</h1>
//           <p className="text-sm text-gray-500">
//             Connect your Razorpay account to accept payments
//           </p>
//         </div>
//         <div className="flex items-center gap-2 text-sm">
//           <span className="w-2 h-2 rounded-full bg-red-500" />
//           {data.integration.status}
//         </div>
//       </div>

//       {/* Integration Card */}
//       <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex gap-8">
//         <div className="w-1/4">
//           <h2 className="font-semibold text-lg mb-1">Razorpay Integration</h2>
//           <p className="text-sm text-gray-500">
//             Connect your Razorpay account
//           </p>
//         </div>

//         <div className="flex-1 space-y-4">
//           <div className="grid grid-cols-2 gap-6">
//             <input className="border border-gray-200 rounded-lg px-4 py-2" placeholder="API Key" />
//             <input className="border border-gray-200 rounded-lg px-4 py-2" placeholder="Secret Key" />
//           </div>

//           <div className="flex justify-between items-center">
//             <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
//               https://swiftmovers.com/webhook/razorpay
//             </div>
//             <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg">
//               <HiOutlineLink /> Connect Razorpay
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Total Collected" value={`₹${totalCollected.toLocaleString()}`} color="text-gray-800" />
//         <StatCard title="Successful Payments" value={success} color="text-green-600" />
//         <StatCard title="Failed Payments" value={failed} color="text-red-600" />
//         <StatCard title="Total Refunded" value={`₹${refunded.toLocaleString()}`} color="text-blue-600" />
//       </div>

//       {/* Table */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//         <div className="flex justify-between mb-4">
//           <h2 className="font-semibold">Payment History</h2>
//           <button className="flex items-center gap-1 text-blue-600 text-sm">
//             <MdOutlineDownload /> Export CSV
//           </button>
//         </div>

//         <div className="relative mb-4">
//           <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input className="w-full pl-10 py-2 border border-gray-200 rounded-lg" placeholder="Search payments..." />
//         </div>

//         <table className="min-w-full text-sm">
//           <thead className="text-gray-400">
//             <tr>
//               <th className="text-left py-3">Transaction ID</th>
//               <th>Customer</th>
//               <th>Amount</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Mode</th>
//               <th>Booking</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.payments.map((p) => (
//               <PaymentRow key={p.id} p={p} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentIntegrationPage;




import React from "react";
import { MdOutlineInfo } from "react-icons/md";
import { HiOutlineLink } from "react-icons/hi";

const PaymentIntegrationCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">
            Payment Integration
          </span>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 w-fit">
          Not Connected
        </span>
      </div>

      {/* Integration Box */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Info */}
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">R</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Razorpay Integration
              </h3>
              <p className="text-sm text-gray-500">
                Connect your Razorpay account to accept online payments
              </p>
            </div>
          </div>

          {/* API + Secret */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2">
            {/* API Key */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                API Key
                <MdOutlineInfo className="text-gray-400" />
              </label>
              <input
                type="text"
                placeholder="Enter your Razorpay API Key"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Webhook URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Webhook URL
              </label>
              <input
                type="text"
                readOnly
                value="https://swiftmovers.com/webhook/razorpay"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600"
              />
            </div>

            {/* Secret Key */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                Secret Key
                <MdOutlineInfo className="text-gray-400" />
              </label>
              <input
                type="password"
                placeholder="Enter your Razorpay Secret Key"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Connect Button */}
            <div className="flex items-end">
              <button
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white
                           bg-gradient-to-r from-blue-400 to-blue-600
                           hover:from-blue-500 hover:to-blue-700
                           transition"
              >
                <HiOutlineLink />
                Connect Razorpay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentIntegrationCard;

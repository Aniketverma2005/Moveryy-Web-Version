// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineAttachMoney,
//   MdOutlineAnalytics,
//   MdOutlineStar,
//   MdOutlineFileDownload,
//   MdOutlineDateRange,
//   MdAccessTime,
// } from "react-icons/md";
// import { fetchAnalytics } from "../../features/analytics/analyticsSlice.js";

// /* ---------- Reusable Components (UNCHANGED UI) ---------- */

// const StatCard = ({ title, value, change, icon, iconBg, iconColor }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//     <div className="flex justify-between">
//       <div>
//         <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
//         <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
//         <p className="text-xs text-gray-500">{change}</p>
//       </div>
//       <div className={`p-2 rounded-full ${iconBg} ${iconColor}`}>
//         {icon}
//       </div>
//     </div>
//   </div>
// );

// /* ---------- Page ---------- */

// const AnalyticsPage = () => {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.analytics);

//   useEffect(() => {
//     dispatch(fetchAnalytics());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!data) return null;

//   const totalBookings = data.bookingStatus.reduce(
//     (sum, i) => sum + i.count,
//     0
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 font-inter">
//       {/* Header */}
//       <div className="flex justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Analytics Dashboard
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Track your business performance and insights.
//           </p>
//         </div>
//         <div className="flex items-center bg-white border px-3 py-2 rounded-lg text-gray-600">
//           <MdOutlineDateRange className="mr-2" />
//           Last 30 days
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           title="Total Revenue"
//           value={data.stats.revenue}
//           change="+8.5% from last month"
//           icon={<MdOutlineAttachMoney />}
//           iconBg="bg-green-100"
//           iconColor="text-green-600"
//         />
//         <StatCard
//           title="Total Bookings"
//           value={data.stats.bookings}
//           change="+1.2% from last month"
//           icon={<MdOutlineAnalytics />}
//           iconBg="bg-blue-100"
//           iconColor="text-blue-600"
//         />
//         <StatCard
//           title="Avg. Booking Value"
//           value={data.stats.avgBookingValue}
//           change="+1.2% from last month"
//           icon={<MdOutlineAttachMoney />}
//           iconBg="bg-purple-100"
//           iconColor="text-purple-600"
//         />
//         <StatCard
//           title="Customer Rating"
//           value={data.stats.rating}
//           change="+0.1 from last month"
//           icon={<MdOutlineStar />}
//           iconBg="bg-yellow-100"
//           iconColor="text-yellow-600"
//         />
//       </div>

//       {/* Footer Actions */}
//       <div className="flex justify-between bg-white p-4 rounded-xl border">
//         <div className="flex gap-4">
//           <button className="flex items-center gap-2 text-blue-600 text-sm font-medium">
//             <MdOutlineFileDownload />
//             Export Analytics
//           </button>
//           <button className="flex items-center gap-2 text-blue-600 text-sm font-medium">
//             <MdOutlineAnalytics />
//             View Charts
//           </button>
//         </div>
//         <button className="flex items-center gap-2 text-gray-600 text-sm">
//           <MdAccessTime />
//           Schedule Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPage;



// import React from 'react';
// import {
//   MdOutlineAttachMoney, MdOutlineAnalytics, MdOutlineStar, MdOutlinePerson,
//   MdOutlineFileDownload, MdOutlineDateRange, MdAccessTime, MdPeople
// } from 'react-icons/md';

// // Helper component for the primary stat cards
// const StatCard = ({ title, value, change, icon, color, iconBg, iconColor }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col justify-between">
//     <div className="flex items-start justify-between mb-4">
//       <div>
//         <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
//         <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
//         <p className="text-xs text-gray-500">{change}</p>
//       </div>
//       <div className={`p-2 rounded-full ${iconBg} ${iconColor}`}>
//         {React.cloneElement(icon, { size: 20 })}
//       </div>
//     </div>
//   </div>
// );

// // Helper component for the bar charts
// const BarChartItem = ({ label, value, color, count, total }) => {
//   const percentage = (count / total) * 100;
//   return (
//     <div className="mb-2">
//       <div className="flex justify-between items-center text-sm text-gray-700">
//         <p>{label}</p>
//         <p>{count}</p>
//       </div>
//       <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
//         <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
//       </div>
//     </div>
//   );
// };

// // Helper for the Top Performing Routes table
// const TopRoutesTableRow = ({ route, bookings, revenue }) => (
//   <div className="flex justify-between items-center py-3 px-2 border-b border-gray-100 last:border-b-0">
//     <span className="text-sm text-gray-600">{route}</span>
//     <span className="text-sm text-gray-600">{bookings}</span>
//     <span className="text-sm font-semibold text-gray-800">{revenue}</span>
//   </div>
// );

// const analyticsData = {
//   monthlyRevenue: [
//     { month: 'Jan', revenue: 40000 },
//     { month: 'Feb', revenue: 32000 },
//     { month: 'Mar', revenue: 40000 },
//     { month: 'Apr', revenue: 38000 },
//     { month: 'May', revenue: 55000 },
//     { month: 'Jun', revenue: 71000 },
//   ],
//   bookingStatus: [
//     { status: 'Completed', count: 69, color: 'bg-blue-600' },
//     { status: 'Confirmed', count: 25, color: 'bg-green-600' },
//     { status: 'In Progress', count: 18, color: 'bg-yellow-600' },
//     { status: 'Pending', count: 10, color: 'bg-red-600' },
//   ],
//   topRoutes: [
//     { route: 'Delhi - Mumbai', bookings: 23, revenue: '₹1,56,000' },
//     { route: 'Bangalore - Chennai', bookings: 18, revenue: '₹1,26,000' },
//     { route: 'Pune - Hyderabad', bookings: 15, revenue: '₹1,05,000' },
//     { route: 'Mumbai - Pune', bookings: 12, revenue: '₹72,000' },
//     { route: 'Chennai - Bangalore', bookings: 10, revenue: '₹58,000' },
//   ],
//   customerInsights: {
//     newCustomers: 45,
//     returningCustomers: 28,
//     customerRetention: 38.4,
//     avgRating: 4.3,
//   }
// };

// const AnalyticsPage = () => {
//   const totalBookings = analyticsData.bookingStatus.reduce((sum, item) => sum + item.count, 0);

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 font-inter w-full">
//       {/* Header and Date Range */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
//           <p className="text-gray-500 text-sm">Track your business performance and insights.</p>
//         </div>
//         <div className="flex items-center p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//           <MdOutlineDateRange size={20} className="mr-2" />
//           <span>Last 30 days</span>
//         </div>
//       </div>

//       {/* Primary Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           title="Total Revenue"
//           value="₹2,56,800"
//           change="+8.5% from last month"
//           icon={<MdOutlineAttachMoney />}
//           iconBg="bg-green-100"
//           iconColor="text-green-600"
//         />
//         <StatCard
//           title="Total Bookings"
//           value="142"
//           change="+1.2% from last month"
//           icon={<MdOutlineAnalytics />}
//           iconBg="bg-blue-100"
//           iconColor="text-blue-600"
//         />
//         <StatCard
//           title="Avg. Booking Value"
//           value="₹1,809"
//           change="+1.2% from last month"
//           icon={<MdOutlineAttachMoney />}
//           iconBg="bg-purple-100"
//           iconColor="text-purple-600"
//         />
//         <StatCard
//           title="Customer Rating"
//           value="4.3/5.0"
//           change="+0.1 from last month"
//           icon={<MdOutlineStar />}
//           iconBg="bg-yellow-100"
//           iconColor="text-yellow-600"
//         />
//       </div>

//       {/* Middle Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Monthly Revenue Trend */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h2>
//           <div>
//             {analyticsData.monthlyRevenue.map((item, index) => (
//               <div key={index} className="flex items-center mb-3">
//                 <span className="text-sm text-gray-500 w-12">{item.month}</span>
//                 <div className="w-full bg-blue-100 h-3 rounded-full overflow-hidden">
//                   <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${(item.revenue / 71000) * 100}%` }}></div>
//                 </div>
//                 <span className="text-sm text-gray-700 ml-4 w-16 text-right">₹{item.revenue.toLocaleString()}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Booking Status Distribution */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking Status Distribution</h2>
//           <div>
//             {analyticsData.bookingStatus.map((item, index) => (
//               <BarChartItem
//                 key={index}
//                 label={item.status}
//                 count={item.count}
//                 total={totalBookings}
//                 color={item.color}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Cards Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Top Performing Routes */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Routes</h2>
//           <div className="flex justify-between items-center text-xs font-medium text-gray-400 mb-2 px-2">
//             <span>ROUTE</span>
//             <span>BOOKINGS</span>
//             <span>REVENUE</span>
//           </div>
//           <div>
//             {analyticsData.topRoutes.map((route, index) => (
//               <TopRoutesTableRow
//                 key={index}
//                 route={route.route}
//                 bookings={route.bookings}
//                 revenue={route.revenue}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Customer Insights */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Insights</h2>
//           <div className="flex items-center justify-between gap-4 mb-4">
//             <div className="bg-blue-50 p-4 rounded-xl flex-1 text-center">
//               <span className="text-2xl font-bold text-blue-600 block">{analyticsData.customerInsights.newCustomers}</span>
//               <p className="text-sm text-gray-500">New Customers</p>
//             </div>
//             <div className="bg-green-50 p-4 rounded-xl flex-1 text-center">
//               <span className="text-2xl font-bold text-green-600 block">{analyticsData.customerInsights.returningCustomers}</span>
//               <p className="text-sm text-gray-500">Returning Customers</p>
//             </div>
//           </div>
//           <div className="mb-4">
//             <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
//               <span>Customer Retention Rate</span>
//               <span>{analyticsData.customerInsights.customerRetention}%</span>
//             </div>
//             <div className="w-full bg-blue-100 h-2 rounded-full">
//               <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analyticsData.customerInsights.customerRetention}%` }}></div>
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center text-sm text-gray-600 mb-1">
//               <MdOutlineStar size={16} className="text-yellow-500 mr-2" />
//               <span>Average Rating</span>
//               <span className="ml-auto font-semibold text-gray-800">{analyticsData.customerInsights.avgRating}/5.0</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions Footer */}
//       <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex gap-4">
//           <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800">
//             <MdOutlineFileDownload size={20} />
//             <span>Export Analytics Report</span>
//           </button>
//           <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800">
//             <MdOutlineAnalytics size={20} />
//             <span>View Detailed Charts</span>
//           </button>
//         </div>
//         <button className="flex items-center gap-2 text-gray-600 text-sm font-medium hover:text-gray-800">
//           <MdAccessTime size={20} />
//           <span>Schedule Report</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPage;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineAttachMoney,
//   MdOutlineAnalytics,
//   MdOutlineStar,
//   MdOutlineFileDownload,
//   MdOutlineDateRange,
//   MdAccessTime,
// } from "react-icons/md";
// import { fetchAnalytics } from "../../features/analytics/analyticsSlice";

// /* ---------- Reusable Components ---------- */

// const Card = ({ children }) => (
//   <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//     {children}
//   </div>
// );

// const StatCard = ({ title, value, change, icon, bg, color }) => (
//   <Card>
//     <div className="flex justify-between">
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
//         <span className="text-xs text-gray-400">{change}</span>
//       </div>
//       <div className={`p-2 rounded-full ${bg} ${color}`}>
//         {icon}
//       </div>
//     </div>
//   </Card>
// );

// const ProgressRow = ({ label, count, total, color }) => (
//   <div className="space-y-1">
//     <div className="flex justify-between text-sm text-gray-600">
//       <span>{label}</span>
//       <span>{count}</span>
//     </div>
//     <div className="w-full bg-gray-100 h-2 rounded-full">
//       <div
//         className={`h-2 rounded-full ${color}`}
//         style={{ width: `${(count / total) * 100}%` }}
//       />
//     </div>
//   </div>
// );

// /* ---------- Page ---------- */

// const AnalyticsPage = () => {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.analytics);

//   useEffect(() => {
//     dispatch(fetchAnalytics());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!data) return null;

//   const totalBookings = data.bookingStatus.reduce(
//     (sum, i) => sum + i.count,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 space-y-8">

//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Analytics Dashboard
//           </h1>
//           <p className="text-sm text-gray-500">
//             Business performance overview
//           </p>
//         </div>
//         <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
//           <MdOutlineDateRange />
//           Last 30 days
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Revenue" value={data.stats.revenue} change="+8.5%" icon={<MdOutlineAttachMoney />} bg="bg-green-100" color="text-green-600" />
//         <StatCard title="Bookings" value={data.stats.bookings} change="+1.2%" icon={<MdOutlineAnalytics />} bg="bg-blue-100" color="text-blue-600" />
//         <StatCard title="Avg Value" value={data.stats.avgBookingValue} change="+1.2%" icon={<MdOutlineAttachMoney />} bg="bg-purple-100" color="text-purple-600" />
//         <StatCard title="Rating" value={data.stats.rating} change="+0.1" icon={<MdOutlineStar />} bg="bg-yellow-100" color="text-yellow-600" />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <h2 className="font-semibold mb-4">Monthly Revenue</h2>
//           {data.monthlyRevenue.map((m) => (
//             <div key={m.month} className="flex items-center gap-3 mb-3">
//               <span className="w-10 text-sm text-gray-500">{m.month}</span>
//               <div className="flex-1 bg-gray-100 h-3 rounded-full">
//                 <div
//                   className="bg-blue-600 h-3 rounded-full"
//                   style={{ width: `${(m.revenue / 71000) * 100}%` }}
//                 />
//               </div>
//               <span className="text-sm text-gray-600">
//                 ₹{m.revenue.toLocaleString()}
//               </span>
//             </div>
//           ))}
//         </Card>

//         <Card>
//           <h2 className="font-semibold mb-4">Booking Status</h2>
//           <div className="space-y-4">
//             {data.bookingStatus.map((b) => (
//               <ProgressRow key={b.label} {...b} total={totalBookings} />
//             ))}
//           </div>
//         </Card>
//       </div>

//       {/* Footer Actions */}
//       <Card>
//         <div className="flex justify-between">
//           <button className="flex items-center gap-2 text-blue-600 text-sm">
//             <MdOutlineFileDownload />
//             Export Report
//           </button>
//           <button className="flex items-center gap-2 text-gray-600 text-sm">
//             <MdAccessTime />
//             Schedule
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default AnalyticsPage;






// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineAttachMoney,
//   MdOutlineAnalytics,
//   MdOutlineStar,
//   MdOutlineFileDownload,
//   MdOutlineDateRange,
//   MdAccessTime,
// } from "react-icons/md";
// import { fetchAnalytics } from "../../features/analytics/analyticsSlice";

// /* ---------- UI Helpers ---------- */

// const Card = ({ children }) => (
//   <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//     {children}
//   </div>
// );

// const StatCard = ({ title, value, change, icon, iconBg, iconColor }) => (
//   <Card>
//     <div className="flex justify-between items-start">
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
//         <p className="text-xs text-gray-500">{change}</p>
//       </div>
//       <div className={`p-2 rounded-full ${iconBg} ${iconColor}`}>
//         {icon}
//       </div>
//     </div>
//   </Card>
// );

// const ProgressBar = ({ label, count, total, color }) => (
//   <div className="space-y-1">
//     <div className="flex justify-between text-sm text-gray-600">
//       <span>{label}</span>
//       <span>{count}</span>
//     </div>
//     <div className="h-2 bg-gray-200 rounded-full">
//       <div
//         className={`h-2 rounded-full ${color}`}
//         style={{ width: `${(count / total) * 100}%` }}
//       />
//     </div>
//   </div>
// );

// /* ---------- PAGE ---------- */

// const AnalyticsPage = () => {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.analytics);

//   useEffect(() => {
//     dispatch(fetchAnalytics());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!data) return null;

//   const totalBookings = data.bookingStatus.reduce(
//     (sum, i) => sum + i.count,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 space-y-8">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Analytics Dashboard
//           </h1>
//           <p className="text-sm text-gray-500">
//             Track your business performance and insights
//           </p>
//         </div>
//         <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm">
//           <MdOutlineDateRange />
//           Last 30 days
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Total Revenue" value={data.stats.revenue} change="+8.5%" icon={<MdOutlineAttachMoney />} iconBg="bg-green-100" iconColor="text-green-600" />
//         <StatCard title="Total Bookings" value={data.stats.bookings} change="+1.2%" icon={<MdOutlineAnalytics />} iconBg="bg-blue-100" iconColor="text-blue-600" />
//         <StatCard title="Avg Booking Value" value={data.stats.avgBookingValue} change="+1.2%" icon={<MdOutlineAttachMoney />} iconBg="bg-purple-100" iconColor="text-purple-600" />
//         <StatCard title="Customer Rating" value={data.stats.rating} change="+0.1" icon={<MdOutlineStar />} iconBg="bg-yellow-100" iconColor="text-yellow-600" />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <h2 className="font-semibold mb-4">Monthly Revenue Trend</h2>
//           {data.monthlyRevenue.map((m) => (
//             <div key={m.month} className="flex items-center gap-3 mb-3">
//               <span className="w-10 text-sm text-gray-500">{m.month}</span>
//               <div className="flex-1 bg-gray-200 h-3 rounded-full">
//                 <div
//                   className="bg-blue-600 h-3 rounded-full"
//                   style={{ width: `${(m.revenue / 71000) * 100}%` }}
//                 />
//               </div>
//               <span className="text-sm text-gray-600">
//                 ₹{m.revenue.toLocaleString()}
//               </span>
//             </div>
//           ))}
//         </Card>

//         <Card>
//           <h2 className="font-semibold mb-4">Booking Status</h2>
//           <div className="space-y-4">
//             {data.bookingStatus.map((b) => (
//               <ProgressBar key={b.label} {...b} total={totalBookings} />
//             ))}
//           </div>
//         </Card>
//       </div>

//       {/* Footer */}
//       <Card>
//         <div className="flex justify-between">
//           <button className="flex items-center gap-2 text-blue-600 text-sm font-medium">
//             <MdOutlineFileDownload />
//             Export Analytics Report
//           </button>
//           <button className="flex items-center gap-2 text-gray-600 text-sm font-medium">
//             <MdAccessTime />
//             Schedule Report
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default AnalyticsPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineAttachMoney,
  MdOutlineAnalytics,
  MdOutlineStar,
  MdOutlineFileDownload,
  MdOutlineDateRange,
  MdAccessTime,
} from "react-icons/md";
import { fetchAnalytics } from "../../features/analytics/analyticsSlice";

/* ================= UI HELPERS ================= */

const Card = ({ children }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    {children}
  </div>
);

const StatCard = ({ title, value, icon, bg, color }) => (
  <Card>
    <div className="p-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-2 rounded-full ${bg} ${color}`}>
        {icon}
      </div>
    </div>
  </Card>
);

/* ================= PAGE ================= */

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const totalBookings = data.bookingStatus.reduce(
    (sum, i) => sum + i.count,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500">
            Track your business performance and insights
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm">
          <MdOutlineDateRange /> Last 30 days
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenue" value={data.stats.revenue} icon={<MdOutlineAttachMoney />} bg="bg-green-100" color="text-green-600" />
        <StatCard title="Bookings" value={data.stats.bookings} icon={<MdOutlineAnalytics />} bg="bg-blue-100" color="text-blue-600" />
        <StatCard title="Avg Value" value={data.stats.avgBookingValue} icon={<MdOutlineAttachMoney />} bg="bg-purple-100" color="text-purple-600" />
        <StatCard title="Rating" value={data.stats.rating} icon={<MdOutlineStar />} bg="bg-yellow-100" color="text-yellow-600" />
      </div>

      {/* LOWER SECTION (AS IN SCREENSHOT) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* TOP ROUTES */}
        <Card className="lg:col-span-2">
          <div className="p-6 border-b border-gray-200 font-semibold">
            Top Performing Routes
          </div>

          <div className="px-6">
            {data.topRoutes.map((r, i) => (
              <div key={r.route} className="flex justify-between py-4 border-b border-gray-200 text-sm">
                <span className="text-gray-700">{i + 1}. {r.route}</span>
                <span className="text-gray-600">{r.bookings}</span>
                <span className="font-semibold">{r.revenue}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CUSTOMER INSIGHTS */}
        <Card>
          <div className="p-6 space-y-6">
            <h2 className="font-semibold text-gray-800">Customer Insights</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center border border-gray-200">
                <p className="text-2xl font-bold text-blue-600">
                  {data.customerInsights.newCustomers}
                </p>
                <p className="text-sm text-gray-500">New Customers</p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl text-center border border-gray-200">
                <p className="text-2xl font-bold text-green-600">
                  {data.customerInsights.returningCustomers}
                </p>
                <p className="text-sm text-gray-500">Returning</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Customer Retention</span>
                <span className="font-semibold">
                  {data.customerInsights.retention}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${data.customerInsights.retention}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4 text-sm">
              <span className="flex items-center gap-2">
                <MdOutlineStar className="text-yellow-500" /> Average Rating
              </span>
              <span className="font-semibold">
                {data.customerInsights.rating}/5.0
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <Card>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 text-sm">
            <MdOutlineFileDownload /> Export Analytics Report
          </button>
          <button className="border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 text-sm">
            <MdOutlineAnalytics /> View Detailed Charts
          </button>
          <button className="border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 text-sm">
            <MdAccessTime /> Schedule Report
          </button>
        </div>
      </Card>
      
    </div>
  );
};

export default AnalyticsPage;

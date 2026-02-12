// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineSearch,
//   MdOutlineAdd,
//   MdOutlineLocationOn,
//   MdOutlineAccessTime,
// } from "react-icons/md";
// import { getBookings } from "../../features/bookings/bookingsSlice";

// /* ================= SUMMARY CARD ================= */
// const BookingSummaryCard = ({ title, count }) => (
//   <div className="bg-white border rounded-md py-4 text-center">
//     <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//       {count}
//     </h2>
//     <p className="text-xs text-gray-500">{title}</p>
//   </div>
// );

// /* ================= TABLE ROW ================= */
// const BookingTableRow = ({ booking }) => {
//   const statusMap = {
//     Confirmed: "bg-blue-100 text-blue-700",
//     Pending: "bg-yellow-100 text-yellow-700",
//     "In progress": "bg-green-100 text-green-700",
//     Completed: "bg-gray-100 text-gray-700",
//     Cancelled: "bg-red-100 text-red-700",
//   };

//   return (
//     <tr className="border-b text-sm hover:bg-gray-50">
//       <td className="px-4 py-3 font-medium whitespace-nowrap">
//         {booking.id}
//       </td>

//       <td className="px-4 py-3">
//         <div className="font-medium text-gray-800">
//           {booking.customer.name}
//         </div>
//         <div className="text-xs text-gray-400">
//           {booking.customer.phone}
//         </div>
//       </td>

//       <td className="px-4 py-3 hidden sm:table-cell text-gray-600">
//         <div className="flex items-center gap-1">
//           <MdOutlineLocationOn className="text-blue-500" />
//           <span className="truncate max-w-[160px]">
//             {booking.pickupLocation}
//           </span>
//         </div>
//       </td>

//       <td className="px-4 py-3 hidden md:table-cell text-gray-600">
//         <div className="flex items-center gap-1">
//           <MdOutlineLocationOn className="text-red-500" />
//           <span className="truncate max-w-[160px]">
//             {booking.dropLocation}
//           </span>
//         </div>
//       </td>

//       <td className="px-4 py-3 hidden lg:table-cell text-gray-600 whitespace-nowrap">
//         <div className="flex items-center gap-1">
//           <MdOutlineAccessTime />
//           {booking.date}
//         </div>
//       </td>

//       <td className="px-4 py-3">
//         <span
//           className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[booking.status]}`}
//         >
//           {booking.status}
//         </span>
//       </td>

//       <td className="px-4 py-3 font-medium whitespace-nowrap">
//         {booking.amount}
//       </td>

//       <td className="px-4 py-3">
//         <div className="flex gap-2">
//           <button className="px-3 py-1 text-xs border rounded-md hover:bg-gray-100">
//             View
//           </button>
//           <button className="px-3 py-1 text-xs border rounded-md hover:bg-gray-100">
//             Update
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// /* ================= BOOKINGS PAGE ================= */
// const BookingsPage = () => {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector(
//     (state) => state.bookings
//   );

//   useEffect(() => {
//     dispatch(getBookings());
//   }, [dispatch]);

//   const summary = {
//     Pending: data.filter(b => b.status === "Pending").length,
//     Confirmed: data.filter(b => b.status === "Confirmed").length,
//     "In progress": data.filter(b => b.status === "In progress").length,
//     Completed: data.filter(b => b.status === "Completed").length,
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
//         Loading bookings…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-sm text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
//       {/* ===== Header ===== */}
//       <div className="mb-4">
//         <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
//           Bookings Management
//         </h1>
//         <p className="text-sm text-gray-500">
//           Manage all your customer bookings and their status.
//         </p>
//       </div>

//       {/* ===== Search & Filters ===== */}
//       <div className="flex flex-col lg:flex-row gap-3 mb-4">
//         <div className="relative flex-1">
//           <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//             placeholder="Search by booking ID, customer name, or location..."
//           />
//         </div>

//         <select className="border rounded-md px-3 py-2 text-sm text-gray-600">
//           <option>All Status</option>
//           <option>Pending</option>
//           <option>Confirmed</option>
//           <option>In progress</option>
//           <option>Completed</option>
//           <option>Cancelled</option>
//         </select>

//         <button className="px-4 py-2 text-sm border rounded-md text-blue-600 hover:bg-blue-50">
//           Date Range
//         </button>
//       </div>

//       {/* ===== Table ===== */}
//       <div className="bg-white border rounded-md overflow-hidden">
//         <div className="flex justify-between items-center px-4 py-3 border-b">
//           <h2 className="text-sm font-medium text-gray-700">
//             All Bookings ({data.length})
//           </h2>
//           <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             <MdOutlineAdd />
//             Add Booking
//           </button>
//         </div>

//         {/* Horizontal scroll on mobile */}
//         <div className="overflow-x-auto">
//           <table className="min-w-[1100px] w-full">
//             <thead className="bg-gray-50 text-xs text-gray-500">
//               <tr>
//                 <th className="px-4 py-3 text-left">Booking ID</th>
//                 <th className="px-4 py-3 text-left">Customer</th>
//                 <th className="px-4 py-3 text-left hidden sm:table-cell">
//                   Pickup Location
//                 </th>
//                 <th className="px-4 py-3 text-left hidden md:table-cell">
//                   Drop Location
//                 </th>
//                 <th className="px-4 py-3 text-left hidden lg:table-cell">
//                   Date & Time
//                 </th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-left">Amount</th>
//                 <th className="px-4 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map(b => (
//                 <BookingTableRow key={b.id} booking={b} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ===== Summary Cards ===== */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
//         <BookingSummaryCard
//           title="Pending Bookings"
//           count={summary.Pending}
//         />
//         <BookingSummaryCard
//           title="Confirmed Bookings"
//           count={summary.Confirmed}
//         />
//         <BookingSummaryCard
//           title="In Progress"
//           count={summary["In progress"]}
//         />
//         <BookingSummaryCard
//           title="Completed"
//           count={summary.Completed}
//         />
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineSearch,
  MdOutlineAdd,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
} from "react-icons/md";
import { getBookings } from "../../features/bookings/bookingsSlice";

/* ================= SUMMARY CARD ================= */
const BookingSummaryCard = ({ title, count }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 text-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
      {count}
    </h2>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

/* ================= TABLE ROW ================= */
const BookingTableRow = ({ booking }) => {
  const statusMap = {
    Confirmed: "bg-blue-100 text-blue-600",
    Pending: "bg-yellow-100 text-yellow-600",
    "In progress": "bg-green-100 text-green-600",
    Completed: "bg-gray-200 text-gray-700",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <tr className="shadow-sm border border-gray-100 last:border-0">
      <td className="py-3 px-2 text-sm font-semibold">{booking.id}</td>

      <td className="py-3 px-2">
        <p className="font-semibold text-sm">{booking.customer.name}</p>
        <p className="text-xs text-gray-500">{booking.customer.phone}</p>
      </td>

      <td className="py-3 px-2 hidden sm:table-cell">
        <div className="flex items-center gap-1 text-sm">
          <MdOutlineLocationOn />
          {booking.pickupLocation}
        </div>
      </td>

      <td className="py-3 px-2 hidden md:table-cell">
        <div className="flex items-center gap-1 text-sm">
          <MdOutlineLocationOn />
          {booking.dropLocation}
        </div>
      </td>

      <td className="py-3 px-2 hidden lg:table-cell">
        <div className="flex items-center gap-1 text-sm">
          <MdOutlineAccessTime />
          {booking.date}
        </div>
      </td>

      <td className="py-3 px-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${statusMap[booking.status]}`}
        >
          {booking.status}
        </span>
      </td>

      <td className="py-3 px-2 font-semibold">{booking.amount}</td>

      <td className="py-3 px-2">
        <div className="flex gap-2 text-xs sm:text-sm">
          <button className="text-blue-600">View</button>
          <button className="text-blue-600">Update</button>
        </div>
      </td>
    </tr>
  );
};

/* ================= BOOKINGS PAGE ================= */
const BookingsPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const summary = {
    Pending: data.filter(b => b.status === "Pending").length,
    Confirmed: data.filter(b => b.status === "Confirmed").length,
    "In progress": data.filter(b => b.status === "In progress").length,
    Completed: data.filter(b => b.status === "Completed").length,
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Bookings Management</h1>
        <p className="text-sm text-gray-500">
          Manage all your customer bookings
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
        
            className="w-full pl-10 pr-3 py-2 rounded-lg shadow-sm  border-gray-200  focus:outline-none focus:ring-2 focus:ring-blue-500" 
          
            placeholder="Search bookings..."
          />
          
        </div>
        <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg">
          <MdOutlineAdd /> Add Booking
        </button>
      </div>

      

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-2 py-3">ID</th>
              <th className="px-2 py-3">Customer</th>
              <th className="px-2 py-3 hidden sm:table-cell">Pickup</th>
              <th className="px-2 py-3 hidden md:table-cell">Drop</th>
              <th className="px-2 py-3 hidden lg:table-cell">Date</th>
              <th className="px-2 py-3">Status</th>
              <th className="px-2 py-3">Amount</th>
              <th className="px-2 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(b => (
              <BookingTableRow key={b.id} booking={b} />
            ))}
          </tbody>
        </table>
      </div>


      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 overflow-x-auto">
        <BookingSummaryCard title="Pending" count={summary.Pending} />
        <BookingSummaryCard title="Confirmed" count={summary.Confirmed} />
        <BookingSummaryCard title="In Progress" count={summary["In progress"]} />
        <BookingSummaryCard title="Completed" count={summary.Completed} />
      </div>
    </div>
  );
};

export default BookingsPage;




// import React from 'react';
// import {
//   MdOutlineSearch, MdOutlineFilterList, MdOutlineAdd, MdOutlineLocationOn,
//   MdOutlineAccessTime, MdOutlinePerson, MdOutlineCheckCircle,
//   MdOutlineHourglassEmpty, MdOutlineSync, MdOutlineDone, MdOutlineCancel
// } from 'react-icons/md';

// // Helper component for the summary cards
// const BookingSummaryCard = ({ title, count, color }) => (
//   <div className={`bg-white p-6 rounded-xl  flex-1 flex flex-col justify-between items-center text-center `}>
//     {/* <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600 mb-2`}>
      
//     </div> */}
//     <div className="flex flex-col">
//       <h2 className={`text-3xl font-bold text-${color}-800 mb-1`}>{count}</h2>
//       <p className="text-sm text-gray-500">{title}</p>
//     </div>
//   </div>
// );

// // Helper component for a single row in the bookings table
// const BookingTableRow = ({ booking }) => {
//   const statusStyles = {
//     Confirmed: 'bg-blue-100 text-blue-600',
//     Pending: 'bg-yellow-100 text-yellow-600',
//     'In progress': 'bg-green-100 text-green-600',
//     Completed: 'bg-gray-200 text-gray-700',
//     Cancelled: 'bg-red-100 text-red-600',
//   };

//   return (
//     <tr className="border-b border-gray-100 last:border-b-0">
//       <td className="py-4 px-2 text-sm font-semibold text-gray-700">{booking.id}</td>
//       <td className="py-4 px-2">
//         <div className="flex flex-col">
//           <span className="text-sm font-semibold text-gray-800">{booking.customer.name}</span>
//           <span className="text-xs text-gray-500">{booking.customer.phone}</span>
//         </div>
//       </td>
//       <td className="py-4 px-2">
//         <div className="flex items-center text-sm text-gray-600">
//           <MdOutlineLocationOn size={16} className="text-gray-400 mr-1" />
//           <span>{booking.pickupLocation}</span>
//         </div>
//       </td>
//       <td className="py-4 px-2">
//         <div className="flex items-center text-sm text-gray-600">
//           <MdOutlineLocationOn size={16} className="text-gray-400 mr-1" />
//           <span>{booking.dropLocation}</span>
//         </div>
//       </td>
//       <td className="py-4 px-2">
//         <div className="flex items-center text-sm text-gray-600">
//           <MdOutlineAccessTime size={16} className="text-gray-400 mr-1" />
//           <span>{booking.date}</span>
//         </div>
//       </td>
//       <td className="py-4 px-2">
//         <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[booking.status]}`}>
//           {booking.status}
//         </span>
//       </td>
//       <td className="py-4 px-2 text-sm font-semibold text-gray-800">{booking.amount}</td>
//       <td className="py-4 px-2">
//         <div className="flex gap-2 text-sm">
//           <button className="text-blue-600 hover:text-blue-800">View</button>
//           <button className="text-blue-600 hover:text-blue-800">Update</button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// const bookings = [
//   { id: 'BK001', customer: { name: 'Rajesh Kumar', phone: '+91 98765 43210' }, pickupLocation: 'Connaught Pl...', dropLocation: 'Rohini West...', date: '2024-01-25', status: 'Confirmed', amount: '₹8,500' },
//   { id: 'BK002', customer: { name: 'Priya Sharma', phone: '+91 87654 32109' }, pickupLocation: 'Koramangala...', dropLocation: '1, Nagori, Chennai', date: '2024-01-26', status: 'Pending', amount: '₹5,200' },
//   { id: 'BK003', customer: { name: 'Amit Patel', phone: '+91 76543 21098' }, pickupLocation: 'Shivaji Nagar Pu...', dropLocation: 'Hitec City, Hyder...', date: '2024-01-27', status: 'In progress', amount: '₹7,800' },
//   { id: 'BK004', customer: { name: 'Sunita Gupta', phone: '+91 65432 10987' }, pickupLocation: 'Fort Street, Kolka...', dropLocation: 'Khandagiri, Bhube...', date: '2024-01-28', status: 'Completed', amount: '₹4,500' },
//   { id: 'BK005', customer: { name: 'Ravi Singh', phone: '+91 34562 21076' }, pickupLocation: 'Sector 62, Noida', dropLocation: 'Golf Course Roa...', date: '2024-01-29', status: 'Pending', amount: '₹2,200' },
//   { id: 'BK006', customer: { name: 'Meera Joshi', phone: '+91 43210 98765' }, pickupLocation: 'Andheri East, Mu...', dropLocation: 'Whitefield, Beng...', date: '2024-01-30', status: 'Confirmed', amount: '₹9,800' },
//   { id: 'BK007', customer: { name: 'Deepak Verma', phone: '+91 56789 01234' }, pickupLocation: 'Civil Lines, Jaip...', dropLocation: 'Satellite, Ahmed...', date: '2024-01-31', status: 'Cancelled', amount: '₹5,500' },
// ];

// const BookingsPage = () => {
//   const pendingCount = bookings.filter(b => b.status === 'Pending').length;
//   const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
//   const inProgressCount = bookings.filter(b => b.status === 'In progress').length;
//   const completedCount = bookings.filter(b => b.status === 'Completed').length;

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 font-inter w-full">
//       {/* Header and Search/Filter Section */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Bookings Management</h1>
//         <p className="text-gray-500 text-sm">Manage all your customer bookings and their status.</p>
//       </div>
//       <div className="flex items-center justify-between mb-8">
//         <div className="relative flex-grow mr-4">
//           <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by Booking ID, customer name, or location..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex items-center gap-2">
          
//           <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//             <option>All Status</option>
//             <option>Pending</option>
//             <option>Confirmed</option>
//             <option>Inprogress</option>
//             <option>Completed</option>
//             <option>Cancelled</option>
//           </select>
//           <button className="flex items-center p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//             <span>Date Range</span>
//           </button>
//         </div>
//       </div>

     

//       {/* Bookings Table Section */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">All Bookings ({bookings.length})</h2>
//           <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
//             <MdOutlineAdd size={20} />
//             <span>Add Booking</span>
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-100">
//             <thead>
//               <tr className="text-left text-xs font-medium text-gray-400">
//                 <th className="py-3 px-2">Booking ID</th>
//                 <th className="py-3 px-2">Customer</th>
//                 <th className="py-3 px-2">Pickup Location</th>
//                 <th className="py-3 px-2">Drop Location</th>
//                 <th className="py-3 px-2">Date & Time</th>
//                 <th className="py-3 px-2">Status</th>
//                 <th className="py-3 px-2">Amount</th>
//                 <th className="py-3 px-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map(booking => (
//                 <BookingTableRow key={booking.id} booking={booking} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//        {/* Summary Cards Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
//         <BookingSummaryCard title="Pending Bookings" count={pendingCount} icon={<MdOutlineHourglassEmpty />} color="yellow" />
//         <BookingSummaryCard title="Confirmed Bookings" count={confirmedCount} icon={<MdOutlineCheckCircle />} color="blue" />
//         <BookingSummaryCard title="In Progress" count={inProgressCount} icon={<MdOutlineSync />} color="green" />
//         <BookingSummaryCard title="Completed" count={completedCount} icon={<MdOutlineDone />} color="gray" />
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;
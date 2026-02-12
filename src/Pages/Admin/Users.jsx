// import React from 'react';
// import {
//   MdOutlinePerson, MdOutlineSearch, MdOutlineFilterList, MdOutlineAdd,
//   MdOutlineDriveEta, MdOutlineAdminPanelSettings, MdOutlineBusinessCenter,
//   MdOutlineModeEdit, MdOutlineDelete, MdOutlineMoreHoriz, MdOutlineDone,
//   MdOutlineClose
// } from 'react-icons/md';

// // Helper component for the summary cards
// const UserStatCard = ({ title, count, icon, color }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
//       <div className={`p-2 rounded-full bg-${color}-100 text-${color}-600`}>
//         {React.cloneElement(icon, { size: 20 })}
//       </div>
//     </div>
//     <div className="flex flex-col">
//       <h2 className="text-2xl font-bold text-gray-800 mb-1">{count}</h2>
//     </div>
//   </div>
// );

// // Helper component for user table rows
// const UserTableRow = ({ user }) => {
//   const roleStyles = {
//     Admin: 'bg-indigo-100 text-indigo-600',
//     Staff: 'bg-blue-100 text-blue-600',
//     Driver: 'bg-green-100 text-green-600',
//   };
  
//   const statusStyles = {
//     Active: 'text-green-600',
//     Inactive: 'text-red-600',
//   };

//   return (
//     <tr className="border-b border-gray-100 last:border-b-0">
//       <td className="py-4 px-2">
//         <div className="flex items-center">
//           <MdOutlinePerson size={24} className="text-blue-600 mr-2" />
//           <div className="flex flex-col">
//             <span className="text-sm font-semibold text-gray-800">{user.name}</span>
//             <span className="text-xs text-gray-500">{user.id}</span>
//           </div>
//         </div>
//       </td>
//       <td className="py-4 px-2">
//         <span className={`text-xs font-semibold px-3 py-1 rounded-full ${roleStyles[user.role]}`}>
//           {user.role}
//         </span>
//       </td>
//       <td className="py-4 px-2">
//         <div className="flex flex-col">
//           <span className="text-sm text-gray-600">{user.contact.email}</span>
//           <span className="text-xs text-gray-500">{user.contact.phone}</span>
//         </div>
//       </td>
//       <td className="py-4 px-2">
//         <div className="flex items-center text-sm">
//           <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
//           <span className={statusStyles[user.status]}>{user.status}</span>
//         </div>
//       </td>
//       <td className="py-4 px-2 text-sm text-gray-600">
//         <div className="flex flex-col">
//           <span>{user.lastLogin.date}</span>
//           <span className="text-xs text-gray-500">Joined: {user.lastLogin.joined}</span>
//         </div>
//       </td>
//       <td className="py-4 px-2">
//         <div className="flex gap-5 text-sm">
//           <button className="text-gray-600 hover:text-blue-800 rounded-lg border px-3 py-1.5 text-sm   hover:bg-gray-50">Edit</button>
//           <button className="text-gray-600 hover:text-blue-800 rounded-lg border px-3 py-1.5 text-sm  hover:bg-gray-50">
//             {user.status === 'Active' ? 'Deactivate' : 'Activate'}
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// const users = [
//   { id: 'USR001', name: 'Rajesh Kumar', role: 'Admin', contact: { email: 'rajesh@swiftmovers.com', phone: '+91 98765 43210' }, status: 'Active', lastLogin: { date: '2024-01-25 09:30 AM', joined: '10/06/2023' } },
//   { id: 'USR002', name: 'Priya Sharma', role: 'Staff', contact: { email: 'priya@swiftmovers.com', phone: '+91 87654 32109' }, status: 'Active', lastLogin: { date: '2024-01-25 08:45 AM', joined: '24/01/2023' } },
//   { id: 'USR003', name: 'Amit Patel', role: 'Driver', contact: { email: 'amit@swiftmovers.com', phone: '+91 76543 21098' }, status: 'Active', lastLogin: { date: '2024-01-24 09:20 PM', joined: '10/05/2023' } },
//   { id: 'USR004', name: 'Sunita Gupta', role: 'Staff', contact: { email: 'sunita@swiftmovers.com', phone: '+91 65432 10987' }, status: 'Inactive', lastLogin: { date: '2024-01-20 03:15 PM', joined: '01/07/2023' } },
//   { id: 'USR005', name: 'Ravi Singh', role: 'Driver', contact: { email: 'ravi@swiftmovers.com', phone: '+91 54321 09876' }, status: 'Active', lastLogin: { date: '2024-01-25 07:30 AM', joined: '16/08/2023' } },
//   { id: 'USR006', name: 'Meera Joshi', role: 'Staff', contact: { email: 'meera@swiftmovers.com', phone: '+91 43210 98765' }, status: 'Active', lastLogin: { date: '2024-01-24 11:30 AM', joined: '22/09/2023' } },
// ];

// const UserManagementPage = () => {
//   const totalUsers = users.length;
//   const activeUsers = users.filter(user => user.status === 'Active').length;
//   const staffCount = users.filter(user => user.role === 'Staff' || user.role === 'Admin').length;
//   const driverCount = users.filter(user => user.role === 'Driver').length;

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 font-inter w-full">
//       {/* Header and Add User Button */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//           <p className="text-gray-500 text-sm">Manage your team members and their access permissions.</p>
//         </div>
//         <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
//           <MdOutlineAdd size={20} />
//           <span>Add User</span>
//         </button>
//       </div>

//       {/* Summary Cards Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <UserStatCard title="Total Users" count={totalUsers} icon={<MdOutlinePerson />} color="gray" />
//         <UserStatCard title="Active Users" count={activeUsers} icon={<MdOutlineDone />} color="green" />
//         <UserStatCard title="Staff Members" count={staffCount} icon={<MdOutlineBusinessCenter />} color="blue" />
//         <UserStatCard title="Drivers" count={driverCount} icon={<MdOutlineDriveEta />} color="green" />
//       </div>

      // {/* Search and Filter Section */}
      // <div className="flex items-center justify-between mb-6">
      //   <div className="relative flex-grow mr-4">
      //     <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      //     <input
      //       type="text"
      //       placeholder="Search by name, email, or phone..."
      //       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      //     />
      //   </div>
      //   <div className="flex items-center gap-2">
      //     <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
      //       <option>All Roles</option>
      //       <option>Admin</option>
      //       <option>Staff</option>
      //       <option>Driver</option>
      //     </select>
      //     <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
      //       <option>All Status</option>
      //       <option>Active</option>
      //       <option>Inactive</option>
      //     </select>
      //   </div>
      // </div>
      
//       {/* Users Table Section */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Team Members ({users.length})</h2>
//           <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-100">
//             <thead>
//               <tr className="text-left text-xs font-medium text-gray-400">
//                 <th className="py-3 px-2">Name</th>
//                 <th className="py-3 px-2">Role</th>
//                 <th className="py-3 px-2">Contact</th>
//                 <th className="py-3 px-2">Status</th>
//                 <th className="py-3 px-2">Last Login</th>
//                 <th className="py-3 px-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <UserTableRow key={user.id} user={user} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagementPage;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlinePerson,
//   MdOutlineSearch,
//   MdOutlineAdd,
//   MdOutlineDriveEta,
//   MdOutlineBusinessCenter,
//   MdOutlineDone,
// } from "react-icons/md";
// import { fetchUsers } from "../../features/users/usersSlice";

// /* ---------- UI Helpers ---------- */

// const StatCard = ({ title, count, icon, bg, color }) => (
//   <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//     <div className="flex justify-between mb-3">
//       <p className="text-sm text-gray-500">{title}</p>
//       <div className={`p-2 rounded-full ${bg} ${color}`}>
//         {icon}
//       </div>
//     </div>
//     <h2 className="text-2xl font-bold text-gray-800">{count}</h2>
//   </div>
// );

// const UserRow = ({ user }) => {
//   const roleStyles = {
//     Admin: "bg-indigo-100 text-indigo-600",
//     Staff: "bg-blue-100 text-blue-600",
//     Driver: "bg-green-100 text-green-600",
//   };

//   return (
//     <tr className="border-b border-gray-200">
//       <td className="py-4">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
//             <MdOutlinePerson className="text-white" />
//           </div>
//           <div>
//             <p className="font-semibold text-gray-800">{user.name}</p>
//             <p className="text-xs text-gray-500">{user.id}</p>
//           </div>
//         </div>
//       </td>

//       <td>
//         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleStyles[user.role]}`}>
//           {user.role}
//         </span>
//       </td>

//       <td className="text-sm text-gray-600">
//         <p>{user.contact.email}</p>
//         <p className="text-xs text-gray-500">{user.contact.phone}</p>
//       </td>

//       <td className="text-sm">
//         <span className={user.status === "Active" ? "text-green-600" : "text-red-600"}>
//           {user.status}
//         </span>
//       </td>

//       <td className="text-sm text-gray-600">
//         <p>{user.lastLogin.date}</p>
//         <p className="text-xs text-gray-500">Joined: {user.lastLogin.joined}</p>
//       </td>

//       <td>
//         <div className="flex gap-3">
//           <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
//             Edit
//           </button>
//           <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
//             {user.status === "Active" ? "Deactivate" : "Activate"}
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// /* ---------- PAGE ---------- */

// const UserManagementPage = () => {
//   const dispatch = useDispatch();
//   const { list, loading } = useSelector((state) => state.users);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="p-6 space-y-6 animate-pulse">
//         <div className="h-7 w-56 bg-gray-200 rounded" />
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="h-24 bg-gray-200 rounded-xl" />
//           ))}
//         </div>
//         <div className="h-64 bg-gray-200 rounded-xl" />
//       </div>
//     );
//   }

//   const totalUsers = list.length;
//   const activeUsers = list.filter((u) => u.status === "Active").length;
//   const staffCount = list.filter((u) => u.role !== "Driver").length;
//   const driverCount = list.filter((u) => u.role === "Driver").length;

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//           <p className="text-sm text-gray-500">
//             Manage your team members and permissions
//           </p>
//         </div>
//         <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg">
//           <MdOutlineAdd /> Add User
//         </button>
//       </div>

//             {/* Search and Filter Section */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="relative flex-grow mr-4">
//           <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by name, email, or phone..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//             <option>All Roles</option>
//             <option>Admin</option>
//             <option>Staff</option>
//             <option>Driver</option>
//           </select>
//           <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
//             <option>All Status</option>
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Total Users" count={totalUsers} icon={<MdOutlinePerson />} bg="bg-gray-100" color="text-gray-600" />
//         <StatCard title="Active Users" count={activeUsers} icon={<MdOutlineDone />} bg="bg-green-100" color="text-green-600" />
//         <StatCard title="Staff Members" count={staffCount} icon={<MdOutlineBusinessCenter />} bg="bg-blue-100" color="text-blue-600" />
//         <StatCard title="Drivers" count={driverCount} icon={<MdOutlineDriveEta />} bg="bg-green-100" color="text-green-600" />
//       </div>

//       {/* Table */}
//       <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">
//           Team Members ({list.length})
//         </h2>
//         <table className="min-w-full text-sm">
//           <thead className="text-gray-400">
//             <tr>
//               <th className="py-3 text-left">Name</th>
//               <th>Role</th>
//               <th>Contact</th>
//               <th>Status</th>
//               <th>Last Login</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((user) => (
//               <UserRow key={user.id} user={user} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagementPage;




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlinePerson,
  MdOutlineSearch,
  MdOutlineAdd,
  MdOutlineDriveEta,
  MdOutlineBusinessCenter,
  MdOutlineDone,
} from "react-icons/md";
import { fetchUsers } from "../../features/users/usersSlice";

/* ---------- UI Helpers ---------- */

const StatCard = ({ title, count, icon, bg, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex justify-between mb-3">
      <p className="text-sm text-gray-500">{title}</p>
      <div className={`p-2 rounded-full ${bg} ${color}`}>
        {icon}
      </div>
    </div>
    <h2 className="text-2xl font-bold text-gray-800">{count}</h2>
  </div>
);

const UserRow = ({ user }) => {
  const roleStyles = {
    Admin: "bg-indigo-100 text-indigo-600",
    Staff: "bg-blue-100 text-blue-600",
    Driver: "bg-green-100 text-green-600",
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
            <MdOutlinePerson className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.id}</p>
          </div>
        </div>
      </td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${roleStyles[user.role]}`}
        >
          {user.role}
        </span>
      </td>

      <td className="text-sm text-gray-600">
        <p>{user.contact.email}</p>
        <p className="text-xs text-gray-500">{user.contact.phone}</p>
      </td>

      <td className="text-sm">
        <span
          className={
            user.status === "Active" ? "text-green-600" : "text-red-600"
          }
        >
          {user.status}
        </span>
      </td>

      <td className="text-sm text-gray-600">
        <p>{user.lastLogin.date}</p>
        <p className="text-xs text-gray-500">
          Joined: {user.lastLogin.joined}
        </p>
      </td>

      <td>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
            Edit
          </button>
          <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
            {user.status === "Active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      </td>
    </tr>
  );
};

/* ---------- PAGE ---------- */

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-7 w-56 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  const totalUsers = list.length;
  const activeUsers = list.filter((u) => u.status === "Active").length;
  const staffCount = list.filter((u) => u.role !== "Driver").length;
  const driverCount = list.filter((u) => u.role === "Driver").length;

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            User Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage your team members and permissions
          </p>
        </div>
        <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg w-fit">
          <MdOutlineAdd /> Add User
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <MdOutlineSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Staff</option>
            <option>Driver</option>
          </select>
          <select className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" count={totalUsers} icon={<MdOutlinePerson />} bg="bg-gray-100" color="text-gray-600" />
        <StatCard title="Active Users" count={activeUsers} icon={<MdOutlineDone />} bg="bg-green-100" color="text-green-600" />
        <StatCard title="Staff Members" count={staffCount} icon={<MdOutlineBusinessCenter />} bg="bg-blue-100" color="text-blue-600" />
        <StatCard title="Drivers" count={driverCount} icon={<MdOutlineDriveEta />} bg="bg-green-100" color="text-green-600" />
      </div>

      {/* Table */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">
          Team Members ({list.length})
        </h2>

        <table className="min-w-[900px] text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="py-3 text-left">Name</th>
              <th>Role</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;

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




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlinePerson,
  MdOutlineSearch,
  MdOutlineAdd,
  MdOutlineDriveEta,
  MdOutlineBusinessCenter,
  MdOutlineDone,
  MdOutlineModeEdit,
  MdOutlineClose,
  MdOutlineDelete,
} from "react-icons/md";
import { fetchUsers } from "../../features/users/usersSlice";
import { addUser } from "../../features/users/usersSlice";
import { createEmployee } from "../../features/users/usersSlice";
import { updateEmployee } from "../../features/users/usersSlice";
import { deleteEmployee } from "../../features/users/usersSlice";

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

const UserRow = ({ user, onEdit, onDelete }) => {
  const roleStyles = {
    transport: "bg-green-100 text-green-600",
    staff:     "bg-blue-100 text-blue-600",
    crew:      "bg-yellow-100 text-yellow-700",
    driver:    "bg-indigo-100 text-indigo-600",
  };

  const isActive = user.isActive;
  const joined   = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB")
    : "—";

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Name */}
      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <MdOutlinePerson className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user.employeeName ?? "—"}</p>
            <p className="text-xs text-gray-500">#{user.employeeId ?? "—"}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="pr-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${roleStyles[user.role] ?? "bg-gray-100 text-gray-600"}`}>
          {user.role ?? "—"}
        </span>
      </td>

      {/* Contact */}
      <td className="text-sm text-gray-600 pr-4">
        <p>{user.email ?? "—"}</p>
        <p className="text-xs text-gray-500">{user.phone ? `+${user.phone}` : "—"}</p>
      </td>

      {/* Status */}
      <td className="pr-4 text-sm">
        <div className="flex flex-col gap-0.5">
          <span className={isActive ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
            {isActive ? "Active" : "Inactive"}
          </span>
          {user.status && (
            <span className="text-xs text-gray-400 capitalize">{user.status}</span>
          )}
        </div>
      </td>

      {/* Joined */}
      <td className="text-sm text-gray-500 pr-4">
        <p className="text-xs">Joined: {joined}</p>
      </td>

      {/* Actions — Edit + Delete only */}
      <td>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onEdit(user)}
            className="inline-flex items-center gap-1 border border-gray-200 rounded-lg p-1.5 sm:px-3 sm:py-1.5 text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
            title="Edit"
          >
            <MdOutlineModeEdit size={15} />
            <span className="hidden sm:inline">Edit</span>
          </button>

          <button
            onClick={() => onDelete(user)}
            className="inline-flex items-center gap-1 border border-red-200 rounded-lg p-1.5 sm:px-3 sm:py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <MdOutlineDelete size={15} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

/* ---------- PAGE ---------- */

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { list, loading, creating, createError } = useSelector((state) => state.users);

  const [showModal, setShowModal] = useState(false);

  // ── Edit state ────────────────────────────────────────────────────────────
  const [editUser, setEditUser]     = useState(null);
  const [editForm, setEditForm]     = useState({});
  const [editError, setEditError]   = useState(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editCountryCode, setEditCountryCode] = useState("+91");

  // ── Delete confirm modal state ────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState(null); // user to delete
  const [deleting, setDeleting]         = useState(false);

  const handleOpenEdit = (user) => {
    setEditUser(user);
    // Try to detect country code from stored phone e.g. "918773523452" → "+91"
    const rawPhone = user.phone ?? "";
    // Common country codes to detect (longest match first)
    const codes = ["+971", "+966", "+855", "+852", "+61", "+44", "+91", "+1", "+7"];
    const stripped = rawPhone.replace(/^\+/, ""); // remove leading + if any
    let detectedCode = "+91";
    let detectedNumber = stripped;
    for (const code of codes) {
      const digits = code.replace("+", "");
      if (stripped.startsWith(digits)) {
        detectedCode = code;
        detectedNumber = stripped.slice(digits.length);
        break;
      }
    }
    setEditCountryCode(detectedCode);
    setEditForm({
      employeeName: user.employeeName ?? "",
      email:        user.email ?? "",
      phone:        detectedNumber,
      gender:       user.gender ?? "",
      address:      user.address ?? "",
    });
    setEditError(null);
  };

  const handleEditFormChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setEditSaving(true);
    setEditError(null);
    const payload = {
      employeeName: editForm.employeeName.trim(),
      email:        editForm.email.trim().toLowerCase(),
      phone:        `+${(editCountryCode + editForm.phone).replace(/\+|\s/g, "")}`, // "+918773523452"
      role:         editUser.role,                        // read-only — send existing value
      gender:       editForm.gender,
      address:      editForm.address.trim(),
      aadharNumber: editUser.aadharNumber,
      panNumber:    editUser.panNumber,
      status:       editUser.status ?? "busy",
    };
    const result = await dispatch(updateEmployee({ employeeId: editUser.employeeId, payload }));
    setEditSaving(false);
    if (updateEmployee.fulfilled.match(result)) {
      // Re-fetch to get fresh data from backend
      dispatch(fetchUsers());
      setEditUser(null);
    } else {
      setEditError(result.payload ?? "Failed to update");
    }
  };

  // ── Toggle active status ──────────────────────────────────────────────────
  const handleToggleStatus = async (user) => {
    const payload = {
      employeeName: user.employeeName,
      email:        user.email,
      phone:        user.phone,
      role:         user.role,
      gender:       user.gender,
      address:      user.address,
      aadharNumber: user.aadharNumber,
      panNumber:    user.panNumber,
      status:       user.status ?? "busy",
      isActive:     !user.isActive,
    };
    const result = await dispatch(updateEmployee({ employeeId: user.employeeId, payload }));
    if (updateEmployee.fulfilled.match(result)) {
      // Re-fetch to reflect real backend state
      dispatch(fetchUsers());
    }
  };

  // ── Delete employee ───────────────────────────────────────────────────────
  const handleDelete = (user) => {
    setDeleteTarget(user); // opens confirm modal
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const result = await dispatch(deleteEmployee(deleteTarget.employeeId));
    setDeleting(false);
    setDeleteTarget(null);
    if (deleteEmployee.rejected.match(result)) {
      alert(`Delete failed: ${result.payload}`);
    }
  };
  const COUNTRY_CODES = [
    { code: "+91", label: "🇮🇳 +91" },
    { code: "+1",  label: "🇺🇸 +1"  },
    { code: "+44", label: "🇬🇧 +44" },
    { code: "+61", label: "🇦🇺 +61" },
    { code: "+971", label: "🇦🇪 +971" },
    { code: "+966", label: "🇸🇦 +966" },
    { code: "+65", label: "🇸🇬 +65" },
    { code: "+60", label: "🇲🇾 +60" },
    { code: "+49", label: "🇩🇪 +49" },
    { code: "+33", label: "🇫🇷 +33" },
    { code: "+81", label: "🇯🇵 +81" },
    { code: "+86", label: "🇨🇳 +86" },
    { code: "+7",  label: "🇷🇺 +7"  },
    { code: "+55", label: "🇧🇷 +55" },
    { code: "+27", label: "🇿🇦 +27" },
  ];

  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    countryCode: "+91", 
    phone: "", 
    role: "crew",
    gender: "male", 
    password: "", 
    address: "", 
    aadharNumber: "", 
    panNumber: "",
    vehicle: ""
  });

  const VEHICLES = [
    { id: "VH001", name: "Tata Ace",                number: "DL 01 AB 1234" },
    { id: "VH002", name: "Mahindra Bolero Pickup",  number: "DL 01 CD 5678" },
    { id: "VH003", name: "Ashok Leyland Dost",      number: "DL 01 EF 9012" },
    { id: "VH004", name: "Eicher Truck",             number: "DL 01 GH 3456" },
    { id: "VH005", name: "Force Traveller",          number: "DL 01 JK 7890" },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    let processed = value;

    if (name === "panNumber") {
      processed = value.toUpperCase();
    }

    if (name === "aadharNumber") {
      // Strip everything except digits, then insert space after every 4 digits
      const digits = value.replace(/\D/g, "").slice(0, 12);
      processed = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    setFormData((prev) => ({ ...prev, [name]: processed }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Build payload exactly as API expects
    const payload = {
      employeeName: formData.name.trim(),
      email:        formData.email.trim().toLowerCase(),
      password:     formData.password,
      role:         formData.role,               // "crew" or "driver"
      gender:       formData.gender,             // "male" or "female"
      address:      formData.address.trim(),
      phone:        `+${(formData.countryCode + formData.phone).replace(/\+|\s/g, '')}`,
      aadharNumber: formData.aadharNumber.replace(/\s/g, ""),
      panNumber:    formData.panNumber.trim(),
      ...(formData.role === "driver" && { vehicleId: formData.vehicle }),
    };

    const result = await dispatch(createEmployee(payload));

    if (createEmployee.fulfilled.match(result)) {
      setShowModal(false);
      setFormData({ name: "", email: "", countryCode: "+91", phone: "", role: "crew", gender: "male", password: "", address: "", aadharNumber: "", panNumber: "", vehicle: "" });
    }
    // On rejection, createError from Redux state will show the error in UI
  };

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

  const totalUsers   = list.length;
  const activeUsers  = list.filter((u) => u.isActive).length;
  const staffCount   = list.filter((u) => u.role !== "transport").length;
  const driverCount  = list.filter((u) => u.role === "transport").length;

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
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg w-fit">
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
            <option>Crew</option>
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
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Team Members ({list.length})
        </h2>

        {/* Desktop table — hidden on mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="py-3 text-left">Name</th>
                {/* <th className="py-3 text-left">Role</th> */}
                <th className="py-3 text-left">Contact</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Last Login</th>
                <th className="py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((user) => (
                <UserRow
                  key={user.employeeId}
                  user={user}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards — shown only below md */}
        <div className="flex flex-col gap-3 md:hidden">
          {list.map((user) => {
            const roleStyles = {
              transport: "bg-green-100 text-green-600",
              staff:     "bg-blue-100 text-blue-600",
              crew:      "bg-yellow-100 text-yellow-700",
              Driver:     "bg-indigo-100 text-indigo-600",
            };
            const isActive = user.isActive;
            const joined   = user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-GB")
              : "—";
            return (
              <div key={user.employeeId} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                {/* Top row: avatar + name + role badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <MdOutlinePerson className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{user.employeeName ?? "—"}</p>
                      <p className="text-xs text-gray-400">#{user.employeeId ?? "—"}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${roleStyles[user.role] ?? "bg-gray-100 text-gray-600"}`}>
                    {user.role ?? "—"}
                  </span>
                </div>

                {/* Contact */}
                <div className="text-sm text-gray-600 space-y-0.5">
                  <p>{user.email ?? "—"}</p>
                  <p className="text-xs text-gray-400">{user.phone ? `+${user.phone}` : "—"}</p>
                </div>

                {/* Status + Joined */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className={`font-medium ${isActive ? "text-green-600" : "text-red-500"}`}>
                      {isActive ? "Active" : "Inactive"}
                    </span>
                    {user.status && (
                      <span className="text-gray-400 capitalize">{user.status}</span>
                    )}
                  </div>
                  <span className="text-gray-400">Joined: {joined}</span>
                </div>

                {/* Actions — Edit + Delete only */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleOpenEdit(user)}
                    className="flex-1 inline-flex items-center justify-center gap-1 border border-gray-200 rounded-lg py-2 text-sm hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors">
                    <MdOutlineModeEdit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="flex-1 inline-flex items-center justify-center gap-1 border border-red-200 rounded-lg py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <MdOutlineDelete size={14} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Red top bar */}
            <div className="h-1.5 bg-gradient-to-r from-red-500 to-blue-600 w-full" />

            <div className="p-6">
              {/* Icon + title */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <MdOutlineDelete size={22} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Delete Team Member</h2>
                  <p className="text-sm text-gray-500 mt-0.5">This action is permanent and cannot be undone.</p>
                </div>
              </div>

              {/* Employee info card */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <MdOutlinePerson size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{deleteTarget.employeeName}</p>
                  <p className="text-xs text-gray-400 truncate">{deleteTarget.email} · #{deleteTarget.employeeId}</p>
                </div>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 capitalize shrink-0">
                  {deleteTarget.role}
                </span>
              </div>

              {/* Warning */}
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-6">
                <span className="text-red-500 text-base">⚠</span>
                <p className="text-xs text-red-600">
                  Deleting <span className="font-semibold">{deleteTarget.employeeName}</span> will remove all their data from the system.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="flex-1 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-600 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-red-700 active:bg-red-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {deleting
                    ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Deleting...</>
                    : <><MdOutlineDelete size={16} /> Delete Member</>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Employee Modal ── */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Edit Employee</h2>
                <p className="text-xs text-gray-400 mt-0.5">#{editUser.employeeId} · {editUser.employeeName}</p>
              </div>
              <button onClick={() => setEditUser(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <MdOutlineClose size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-6 py-4 flex-1">
              <form id="editUserForm" onSubmit={handleEditSave} className="space-y-4">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input required name="employeeName" value={editForm.employeeName} onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email <span className="text-red-500">*</span></label>
                    <input required type="email" name="email" value={editForm.email} onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="email@example.com" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Phone <span className="text-red-500">*</span></label>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <select
                      value={editCountryCode}
                      onChange={(e) => setEditCountryCode(e.target.value)}
                      className="bg-gray-50 border-r border-gray-300 px-2 py-2 text-sm text-gray-700 focus:outline-none"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditFormChange}
                      className="flex-1 px-3 py-2 text-sm focus:outline-none"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>

                {/* Role (read-only) + Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                    <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500 capitalize cursor-not-allowed">
                      {editUser.role ?? "—"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gender <span className="text-red-500">*</span></label>
                    <select name="gender" value={editForm.gender} onChange={handleEditFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Address*/}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                  <input name="address" value={editForm.address} onChange={handleEditFormChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full address" />
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              {editError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
                  <span className="text-red-500 text-xs">⚠</span>
                  <p className="text-xs text-red-600">{editError}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button type="button" onClick={() => setEditUser(null)}
                  className="flex-1 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="editUserForm" disabled={editSaving}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2 transition-colors">
                  {editSaving
                    ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                    : "Save Changes"
                  }
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Add New User</h2>
            </div>

            {/* Scrollable Form Body */}
            <div className="overflow-y-auto px-6 py-4 flex-1">
              <form id="addUserForm" onSubmit={handleAddUser} className="space-y-4">

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input required name="name" value={formData.name} onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email <span className="text-red-500">*</span></label>
                    <input required type="email" name="email" value={formData.email} onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com" />
                  </div>
                </div>

                {/* Row 2: Phone */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone <span className="text-red-500">*</span></label>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <select name="countryCode" value={formData.countryCode} onChange={handleFormChange}
                      className="bg-gray-50 border-r border-gray-300 px-2 py-2 text-sm text-gray-700 focus:outline-none">
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input required type="text" inputMode="numeric" name="phone" value={formData.phone} onChange={handleFormChange}
                      className="flex-1 px-3 py-2 text-sm focus:outline-none"
                      placeholder="98765 43210" maxLength={10}/>
                  </div>
                </div>

                {/* Row 3: Password */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Password <span className="text-red-500">*</span></label>
                  <input required type="password" name="password" value={formData.password} onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set a password" />
                </div>

                {/* Row 4: Role + Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Role <span className="text-red-500">*</span></label>
                    <select name="role" value={formData.role} onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="crew">Crew</option>
                      <option value="driver">Driver</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Gender <span className="text-red-500">*</span></label>
                    <select name="gender" value={formData.gender} onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Row 4b: Vehicle — only for Driver */}
                {formData.role === "driver" && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Vehicle <span className="text-red-500">*</span></label>
                    <select
                      required={formData.role === "driver"}
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a vehicle</option>
                      {VEHICLES.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.number})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Row 5: Address */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Address <span className="text-red-500">*</span></label>
                  <input required name="address" value={formData.address} onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full address" />
                </div>

                {/* Row 6: Aadhar + PAN */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Aadhar Number <span className="text-red-500">*</span></label>
                    <input required name="aadharNumber" value={formData.aadharNumber} onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="xxxx xxxx xxxx"
                      maxLength={14} />
                  </div>
                  <div>
  <label className="block text-sm text-gray-600 mb-1">
    PAN Number <span className="text-red-500">*</span>
  </label>

  <input
    required
    name="panNumber"
    value={formData.panNumber}
    onChange={handleFormChange}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="ABCDE1234F"
    maxLength={10}
  />
</div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              {/* API error message */}
              {createError && (
                <p className="text-sm text-red-600 mb-3">{createError}</p>
              )}
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" form="addUserForm" disabled={creating}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
                  {creating && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {creating ? "Saving..." : "Save User"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;

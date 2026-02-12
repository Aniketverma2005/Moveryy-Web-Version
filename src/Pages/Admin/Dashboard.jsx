import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineInsights,
  MdOutlineAttachMoney,
  MdOutlinePerson,
  MdOutlineAccessTime,
  MdAdd,
  MdPeople,
} from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbChartArcs } from "react-icons/tb";
import { Link } from "react-router-dom";
import { getDashboardData } from "../../features/dashboard/dashboardSlice";

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2 sm:mb-3">
      <h3 className="text-gray-500 font-medium text-xs sm:text-sm">
        {title}
      </h3>
      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
        {React.cloneElement(icon, { size: 18 })}
      </div>
    </div>

    <div>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
        {value}
      </h2>
      <p className="text-[11px] sm:text-xs text-gray-500">{change}</p>
    </div>
  </div>
);

/* ================= TABLE ROW ================= */
const TableRow = ({ bookingId, customer, route, date, status, amount }) => {
  const statusColors = {
    confirmed: "bg-blue-100 text-blue-600",
    pending: "bg-yellow-100 text-yellow-600",
    "in-progress": "bg-green-100 text-green-600",
    completed: "bg-gray-200 text-gray-700",
  };

  return (
    <tr className="border-b-gray-100 border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-3 text-xs sm:text-sm font-medium">
        {bookingId}
      </td>

      <td className="py-3 px-3">
        <p className="text-sm font-semibold">{customer?.name}</p>
        <p className="text-xs text-gray-500">{customer?.phone}</p>
      </td>

      <td className="py-3 px-3 text-sm hidden sm:table-cell">
        {route}
      </td>

      <td className="py-3 px-3 text-sm hidden md:table-cell">
        <div className="flex items-center gap-1">
          <MdOutlineAccessTime size={14} />
          {date}
        </div>
      </td>

      <td className="py-3 px-3">
        <span
          className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[status]}`}
        >
          {status}
        </span>
      </td>

      <td className="py-3 px-3 text-sm font-semibold">
        {amount}
      </td>

      <td className="py-3 px-3">
        <div className="flex flex-wrap gap-2">
          <button className="px-2 py-1 text-xs sm:text-sm rounded-md text-blue-600 hover:bg-blue-50">
            View
          </button>
          <button className="px-2 py-1 text-xs sm:text-sm rounded-md text-blue-600 hover:bg-blue-50">
            Update
          </button>
        </div>
      </td>
    </tr>
  );
};

/* ================= DASHBOARD PAGE ================= */
const DashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, bookings, company, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  const statIcons = [
    <HiOutlineDocumentText />,
    <TbChartArcs />,
    <MdOutlineAttachMoney />,
    <MdOutlinePerson />,
  ];

  if (loading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="h-8 w-48 bg-gray-200 rounded" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-xl" />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-64 bg-gray-200 rounded-xl" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    </div>

    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((item, index) => (
          <StatCard
            key={index}
            {...item}
            icon={statIcons[index] || <MdOutlineInsights />}
          />
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-4 sm:p-6 flex justify-between items-center border-b">
          <h2 className="text-base sm:text-lg font-semibold">
            Recent Bookings
          </h2>
          <button className="text-xs sm:text-sm font-bold text-blue-600">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead className="bg-gray-50 text-[11px] uppercase">
              <tr>
                <th className="px-3 py-3">Booking</th>
                <th className="px-3 py-3">Customer</th>
                <th className="px-3 py-3 hidden sm:table-cell">Route</th>
                <th className="px-3 py-3 hidden md:table-cell">Date</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Amount</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <TableRow key={b.bookingId} {...b} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-gray-200">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Link
          to="/admin/bookings"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
        >
          <MdAdd size={20} className="text-blue-600" />
          <span>Add New Booking</span>
        </Link>
            </li>
            <li className="flex items-center gap-3">
              <Link
          to="/admin/analytics"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
        >
          <MdOutlineInsights size={20} className="text-blue-600" />
          <span>View Analytics</span>
        </Link>
            </li>
            <li className="flex items-center gap-3">
              <Link
          to="/admin/users"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
        >
          <MdPeople size={20} className="text-blue-600" />
          <span>Manage Team</span>
        </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-gray-200">
          <h2 className="font-semibold mb-4">Company Overview</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
              {company?.name?.[0]}
            </div>
            <div>
              <h3 className="font-bold">{company?.name}</h3>
              <p className="text-xs text-gray-500">
                Established since {company?.since}
              </p>
            </div>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>{company?.email}</li>
            <li>{company?.phone}</li>
            <li>{company?.cities}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;








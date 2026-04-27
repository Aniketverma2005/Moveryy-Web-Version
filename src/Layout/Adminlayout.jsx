import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MdOutlineSearch, MdOutlineNotifications, MdOutlineSettings } from 'react-icons/md';
import Sidebar from '../Pages/Admin/AdminSidebar';

const routeTitles = {
  '/admin': 'Dashboard',
  '/admin/bookings': 'Bookings',
  '/admin/users': 'Users',
  '/admin/payment': 'Payments',
  '/admin/analytics': 'Analytics',
  '/admin/offers': 'Offers',
  '/admin/profile': 'Profile',
  '/admin/reviews': 'Reviews',
  '/admin/settings': 'Settings',
};

const AdminLayout = () => {
  const { pathname } = useLocation();
  const title = routeTitles[pathname] || 'Admin';

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  })();
  const initials = storedUser?.firstName?.charAt(0)?.toUpperCase() || 'A';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Glassmorphism sticky header ── */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
          <div className="flex items-center justify-between px-6 h-14">
            {/* Page title */}
            <h1 className="text-lg font-bold text-gray-900 hidden sm:block">{title}</h1>

            {/* Search */}
            <div className="flex-1 max-w-sm mx-4 relative">
              <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <MdOutlineNotifications size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <MdOutlineSettings size={20} className="text-gray-600" />
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-blue-700 transition-colors">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

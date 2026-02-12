// import React, { useState } from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import {
//   MdOutlineDashboard, MdOutlineBook, MdOutlinePeople, MdOutlinePayment,
//   MdOutlineInsights, MdOutlineLocalOffer, MdOutlinePerson,
//   MdOutlineSettings, MdOutlineStar, MdOutlineLogout, MdMenu, MdClose
// } from 'react-icons/md';

// const navItems = [
//   { name: 'Dashboard', icon: <MdOutlineDashboard />, path: '/admin' },
//   { name: 'Bookings', icon: <MdOutlineBook />, path: '/admin/bookings' },
//   { name: 'Users', icon: <MdOutlinePeople />, path: '/admin/users' },
//   { name: 'Payment', icon: <MdOutlinePayment />, path: '/admin/payment' },
//   { name: 'Analytics', icon: <MdOutlineInsights />, path: '/admin/analytics' },
//   { name: 'Offers', icon: <MdOutlineLocalOffer />, path: '/admin/offers' },
//   { name: 'Profile', icon: <MdOutlinePerson />, path: '/admin/profile' },
//   { name: 'Reviews', icon: <MdOutlineStar />, path: '/admin/reviews' },
// ];

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Reusable NavLink component to keep code clean
//   const SidebarItem = ({ item, isEnd = false }) => (
//     <NavLink
//       to={item.path}
//       end={isEnd}
//       onClick={() => setIsOpen(false)} // Close sidebar on mobile after clicking
//       className={({ isActive }) =>
//         `flex items-center gap-3 py-2 px-3 mb-2 rounded-lg transition-all duration-200
//          ${isActive
//           ? 'bg-blue-600 text-white shadow-md'
//           : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
//         }`
//       }
//     >
//       {React.cloneElement(item.icon, { className: 'text-2xl' })}
//       <span className="text-base">{item.name}</span>
//     </NavLink>
//   );

//   return (
//     <>
//       {/* --- MOBILE OVERLAY --- */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* --- MOBILE HEADER/TOGGLE --- */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-40 justify-between">
//         <div className="flex items-center gap-2">
//           <img src="https://cdn.builder.io/api/v1/image/assets%2Fedfca2118e984450847883734a84c956%2F6c93f3a4f0d042dea632ae436c11d7b1?format=webp&width=800" alt="Logo" className="w-8 h-8" />
//           <span className="font-bold text-xl">Moverryy</span>
//         </div>
//         <button 
//           onClick={toggleSidebar}
//           className="p-2 rounded-md hover:bg-gray-100 text-2xl"
//         >
//           {isOpen ? <MdClose /> : <MdMenu />}
//         </button>
//       </div>

//       {/* --- SIDEBAR --- */}
//       <aside className={`
//         fixed top-0 left-0 z-50 h-screen bg-white shadow-2xl transition-transform duration-300 ease-in-out
//         w-[260px] flex flex-col
//         lg:sticky lg:translate-x-0 
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
        
//         {/* Sidebar Header */}
//         <div className="flex items-center gap-2 pt-6 pb-4 pl-6 border-b border-gray-100">
//           <Link to="/admin" className="flex items-center gap-2">
//             <img
//               src="https://cdn.builder.io/api/v1/image/assets%2Fedfca2118e984450847883734a84c956%2F6c93f3a4f0d042dea632ae436c11d7b1?format=webp&width=800"
//               alt="Logo"
//               className="w-8 h-8 object-contain"
//             />
//             <span className="text-xl font-bold text-gray-900">Moverryy</span>
//           </Link>
//         </div>

//         {/* Scrollable Navigation Area */}
//         <div className="flex-grow overflow-y-auto px-4 py-4 scrollbar-hide">
//           <div className="space-y-1">
//             {navItems.map((item, index) => (
//               <SidebarItem key={index} item={item} isEnd={item.path === '/admin'} />
//             ))}
//           </div>

//           <div className="mt-8 pt-4 border-t border-gray-100">
//              <span className="text-[10px] uppercase text-gray-400 font-bold px-3 mb-4 block">System</span>
//              <SidebarItem item={{ name: 'Settings', icon: <MdOutlineSettings />, path: '/admin/settings' }} />
//           </div>
//         </div>

//         {/* Sidebar Footer */}
//         <div className="p-4 border-t border-gray-100 bg-gray-50/50">
//           <div className="flex flex-col p-3 rounded-xl bg-white border border-gray-200 mb-3">
//             <span className="text-sm font-bold text-gray-800">Swift Movers Ltd</span>
//             <span className="text-[11px] text-gray-500 truncate">admin@swiftmovers.com</span>
//           </div>
//           <button
//             className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-blue-700 hover:bg-blue-200 transition-colors font-semibold"
//           >
//             <MdOutlineLogout className="text-2xl" />
//             <span className="text-base">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;



import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  MdOutlineDashboard, MdOutlineBook, MdOutlinePeople, MdOutlinePayment,
  MdOutlineInsights, MdOutlineLocalOffer, MdOutlinePerson,
  MdOutlineSettings, MdOutlineStar, MdOutlineLogout, MdMenu, MdClose
} from "react-icons/md";

const navItems = [
  { name: "Dashboard", icon: <MdOutlineDashboard />, path: "/admin" },
  { name: "Bookings", icon: <MdOutlineBook />, path: "/admin/bookings" },
  { name: "Users", icon: <MdOutlinePeople />, path: "/admin/users" },
  { name: "Payment", icon: <MdOutlinePayment />, path: "/admin/payment" },
  { name: "Analytics", icon: <MdOutlineInsights />, path: "/admin/analytics" },
  { name: "Offers", icon: <MdOutlineLocalOffer />, path: "/admin/offers" },
  { name: "Profile", icon: <MdOutlinePerson />, path: "/admin/profile" },
  { name: "Reviews", icon: <MdOutlineStar />, path: "/admin/reviews" },
];

const SidebarItem = ({ item, isEnd = false, onNavigate }) => (
  <NavLink
    to={item.path}
    end={isEnd}
    onClick={onNavigate}
    className={({ isActive }) =>
      `flex items-center gap-3 py-2 px-3 mb-2 rounded-lg transition-all duration-200
       ${isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
       }`
    }
  >
    {React.cloneElement(item.icon, { className: "text-2xl shrink-0" })}
    <span className="text-base truncate">{item.name}</span>
  </NavLink>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Close sidebar on route change (covers clicks, programmatic nav, back/forward)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]); // pattern recommended with useLocation updates [web:6]

  const toggleSidebar = () => setIsOpen(v => !v);

  const logoUrl =
    "https://cdn.builder.io/api/v1/image/assets%2Fedfca2118e984450847883734a84c956%2F6c93f3a4f0d042dea632ae436c11d7b1?format=webp&width=800";

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-40 justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <img src={logoUrl} alt="Logo" className="w-8 h-8 shrink-0" />
          <span className="font-bold text-xl truncate">Moverryy</span>
        </div>

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 text-2xl"
          aria-label="Toggle sidebar"
          aria-expanded={isOpen}
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          // shared
          "bg-white shadow-2xl flex flex-col",
          // mobile: slide-in drawer
          "fixed top-0 left-0 z-50 h-[100dvh] w-[260px] transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // desktop: pinned column
          "lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen",
        ].join(" ")}
        aria-label="Sidebar"
      >
        {/* Header */}
        <div className="flex items-center gap-2 pt-6 pb-4 pl-6 border-b border-gray-100">
          <Link to="/admin" className="flex items-center gap-2 min-w-0">
            <img src={logoUrl} alt="Logo" className="w-8 h-8 object-contain shrink-0" />
            <span className="text-xl font-bold text-gray-900 truncate">Moverryy</span>
          </Link>
        </div>

        {/* Nav (scrollable) */}
        <div className="flex-grow overflow-y-auto px-4 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                item={item}
                isEnd={item.path === "/admin"}
                onNavigate={() => setIsOpen(false)}
              />
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100">
            <span className="text-[10px] uppercase text-gray-400 font-bold px-3 mb-4 block">
              System
            </span>
            <SidebarItem
              item={{ name: "Settings", icon: <MdOutlineSettings />, path: "/admin/settings" }}
              onNavigate={() => setIsOpen(false)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex flex-col p-3 rounded-xl bg-white border border-gray-200 mb-3 min-w-0">
            <span className="text-sm font-bold text-gray-800 truncate">Swift Movers Ltd</span>
            <span className="text-[11px] text-gray-500 truncate">admin@swiftmovers.com</span>
          </div>

          <button className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-blue-700 hover:bg-blue-200 transition-colors font-semibold">
            <MdOutlineLogout className="text-2xl shrink-0" />
            <span className="text-base">Logout</span>
          </button>
        </div>
      </aside>

      {/* Spacer for mobile header so content doesn't hide behind it */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Sidebar;

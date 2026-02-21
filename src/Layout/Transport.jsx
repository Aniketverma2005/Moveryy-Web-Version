/**
 * Transport Layout Component
 * 
 * This is the main layout for the driver dashboard. It provides:
 * - A responsive sidebar with navigation
 * - Mobile-friendly hamburger menu
 * - Driver branding and status
 * - Notification system
 * 
 * Think of this as the "shell" that wraps around all driver pages.
 */

import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
    MdHome, MdBook, MdAttachMoney, MdPerson, MdStar,
    MdMenu, MdClose, MdNotifications
} from "react-icons/md";

/**
 * Navigation Configuration
 * 
 * This defines all the main sections a driver needs access to.
 * Each item includes an icon, path, and helpful description for tooltips.
 * 
 * To add a new section: just add it here and create the corresponding page component!
 */
const DRIVER_NAV_ITEMS = [
    {
        name: "Home",
        icon: <MdHome />,
        path: "/transport",
        description: "Dashboard overview and new orders",
        isMainPage: true // This helps us identify the home page for routing
    },
    {
        name: "Bookings",
        icon: <MdBook />,
        path: "/transport/bookings",
        description: "Manage your booking requests",
        badge: null // Could show pending bookings count
    },
    {
        name: "Earnings",
        icon: <MdAttachMoney />,
        path: "/transport/earnings",
        description: "Track your income and payments",
        badge: null // Could show unpaid earnings
    },
    {
        name: "Ratings",
        icon: <MdStar />,
        path: "/transport/ratings",
        description: "View customer feedback",
        badge: null // Could show new reviews count
    },
    {
        name: "Profile",
        icon: <MdPerson />,
        path: "/transport/profile",
        description: "Update your driver information",
        badge: null // Could show profile completion status
    },
];

/**
 * Driver App Configuration
 * 
 * This contains all the branding and status info for the current driver.
 * In a real app, this would come from user authentication/profile data.
 */
const DRIVER_INFO = {
    appName: "Movery Driver",
    status: "On Duty", // Could be "Off Duty", "Busy", "Available"
    statusColor: "blue", // Matches the status - blue for on duty, gray for off duty
    notificationCount: 3, // New orders, messages, etc.
    driverInitial: "M" // First letter of driver name or company
};

/**
 * Individual Navigation Item Component
 * 
 * This creates each clickable item in the sidebar navigation.
 * It automatically highlights the current page and provides smooth hover effects.
 * 
 * @param {Object} item - The navigation item data (name, icon, path, etc.)
 * @param {boolean} isHomePage - Whether this is the main dashboard page
 * @param {Function} onNavigate - Called when user clicks (used to close mobile menu)
 */
const SidebarItem = ({ item, isHomePage = false, onNavigate }) => {
    // Handle click events - defined before any early returns
    const handleClick = useCallback(() => {
        // Close mobile sidebar when navigating
        if (onNavigate) {
            onNavigate();
        }
    }, [onNavigate]);

    // Safety check - make sure we have the required data
    if (!item || !item.path || !item.name) {
        console.warn('SidebarItem: Missing required item data', item);
        return null;
    }

    return (
        <NavLink
            to={item.path}
            end={isHomePage}
            onClick={handleClick}
            className={({ isActive }) => {
                // Build CSS classes based on whether this page is currently active
                const baseStyles = "flex items-center gap-3 py-3 px-4 mb-1 rounded-lg transition-all duration-200 relative";
                const activeStyles = "bg-blue-100 text-blue-600 border-r-4 border-blue-600 shadow-sm";
                const inactiveStyles = "text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:shadow-sm";

                return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
            }}
            title={item.description} // Shows helpful tooltip when user hovers
            aria-label={`Navigate to ${item.name} - ${item.description}`}
        >
            {/* Render the icon with consistent styling */}
            {React.cloneElement(item.icon, {
                className: "text-xl shrink-0",
                'aria-hidden': true // Icons are decorative, screen readers should ignore them
            })}

            {/* Navigation item name */}
            <span className="text-sm font-medium truncate">{item.name}</span>

            {/* Optional badge for notifications/counts (future feature) */}
            {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {item.badge}
                </span>
            )}
        </NavLink>
    );
};

/**
 * Notification Badge Component
 * 
 * Shows a bell icon with a red badge indicating how many notifications the driver has.
 * This could include new orders, messages from customers, system alerts, etc.
 * 
 * @param {number} count - Number of unread notifications
 * @param {Function} onClick - Optional click handler for opening notifications
 */
const NotificationBadge = ({ count = 0, onClick }) => {
    const hasNotifications = count > 0;

    return (
        <button
            className="relative p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClick}
            aria-label={`${count} unread notifications`}
            title={hasNotifications ? `You have ${count} new notifications` : "No new notifications"}
        >
            <MdNotifications className="text-xl text-gray-600" />
            {hasNotifications && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </button>
    );
};

/**
 * Driver Branding Component
 * 
 * Shows the app logo, name, and current driver status.
 * This helps drivers know they're in the right app and see their current status at a glance.
 * 
 * @param {string} size - "small" for mobile header, "large" for sidebar
 * @param {Function} onStatusClick - Optional handler for changing driver status
 */
const DriverBranding = ({ size = "small", onStatusClick }) => {
    const isLarge = size === "large";

    // Different status colors based on driver availability
    const getStatusStyles = (status) => {
        switch (status.toLowerCase()) {
            case 'on duty':
                return "bg-green-100 text-green-700 border-green-200";
            case 'off duty':
                return "bg-gray-100 text-gray-700 border-gray-200";
            case 'busy':
                return "bg-orange-100 text-orange-700 border-orange-200";
            default:
                return "bg-blue-100 text-blue-600 border-blue-200";
        }
    };

    return (
        <div className="flex items-center gap-3">
            {/* App logo - using the driver's initial for now */}
            <div className={`bg-blue-600 rounded-full flex items-center justify-center ${isLarge ? "w-10 h-10" : "w-8 h-8"}`}>
                <span className={`text-white font-bold ${isLarge ? "text-base" : "text-sm"}`}>
                    {DRIVER_INFO.driverInitial}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                {/* App name */}
                <h2 className={`font-semibold text-gray-800 truncate ${isLarge ? "text-base" : "text-sm"}`}>
                    {DRIVER_INFO.appName}
                </h2>

                {/* Driver status badge - clickable to change status */}
                <button
                    className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors ${getStatusStyles(DRIVER_INFO.status)} ${onStatusClick ? 'hover:opacity-80' : ''}`}
                    onClick={onStatusClick}
                    disabled={!onStatusClick}
                    title={onStatusClick ? "Click to change status" : `Current status: ${DRIVER_INFO.status}`}
                >
                    {DRIVER_INFO.status}
                </button>
            </div>
        </div>
    );
};

const Transport = () => {
    // State for mobile sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    // Automatically close sidebar when user navigates to a different page
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // Toggle sidebar visibility (mainly for mobile)
    const handleSidebarToggle = () => {
        setIsSidebarOpen(currentState => !currentState);
    };

    // Close sidebar when user clicks outside (mobile)
    const handleOverlayClick = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex flex-col xl:flex-row min-h-screen bg-gray-50">
            {/* Mobile Header - Only visible on small screens */}
            <div className="xl:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-40 justify-between shadow-sm">
                <DriverBranding size="small" />

                <div className="flex items-center gap-3">
                    <NotificationBadge count={DRIVER_INFO.notificationCount} />
                    <button
                        onClick={handleSidebarToggle}
                        className="p-2 rounded-md hover:bg-gray-100 text-xl"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isSidebarOpen}
                    >
                        {isSidebarOpen ? <MdClose /> : <MdMenu />}
                    </button>
                </div>
            </div>

            {/* Dark overlay when sidebar is open on mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 xl:hidden"
                    onClick={handleOverlayClick}
                    aria-label="Close navigation menu"
                />
            )}

            {/* Main Navigation Sidebar */}
            <aside
                className={[
                    // Base styles for the sidebar
                    "bg-white shadow-lg flex flex-col border-r border-gray-200",
                    // Mobile: slide-in drawer behavior
                    "fixed top-0 left-0 z-50 h-[100dvh] w-[260px] transition-transform duration-300 ease-in-out",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    // Desktop: always visible, pinned to the side
                    "xl:translate-x-0 xl:sticky xl:top-0 xl:h-screen xl:w-64",
                ].join(" ")}
                aria-label="Driver navigation"
            >
                {/* Sidebar Header with branding */}
                <div className="p-6 border-b border-gray-100">
                    <DriverBranding size="large" />
                    {/* Desktop notification badge - positioned in top right */}
                    <div className="hidden xl:flex items-center justify-end mt-2">
                        <NotificationBadge count={DRIVER_INFO.notificationCount} />
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="flex-grow overflow-y-auto py-4">
                    <nav className="px-3" role="navigation" aria-label="Driver dashboard sections">
                        {DRIVER_NAV_ITEMS.map((navItem) => (
                            <SidebarItem
                                key={navItem.path}
                                item={navItem}
                                isHomePage={navItem.path === "/transport"}
                                onNavigate={() => setIsSidebarOpen(false)}
                            />
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area - Where the actual page content loads */}
            <main className="flex-1 xl:mt-0 bg-gray-50 min-h-screen" role="main">
                {/* Add top padding on mobile to account for fixed header */}
                <div className="pt-16 xl:pt-0">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Transport;
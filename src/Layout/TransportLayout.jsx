import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './TransportLayout.css';

const TransportLayout = () => {
    const currentPage = useLocation();

    // Simple menu - easy to add or remove items
    const menuItems = [
        { icon: 'home', name: 'Home', link: '/transport' },
        { icon: 'calendar_month', name: 'Bookings', link: '/transport/bookings' },
        { icon: 'attach_money', name: 'Earnings', link: '/transport/earnings' },
        { icon: 'star_outline', name: 'Ratings', link: '/transport/ratings' },
        { icon: 'person_outline', name: 'Profile', link: '/transport/profile' }
    ];

    return (
        <div className="driver-app">
            {/* Top bar with logo and notifications */}
            <header className="top-bar">
                <div className="left-side">
                    <div className="logo">
                        <span className="truck-emoji">🚛</span>
                        <span className="app-title">Movery Driver</span>
                    </div>
                    <span className="status">On Duty</span>
                </div>

                <div className="right-side">
                    <div className="notifications">
                        <span className="bell">🔔</span>
                        <span className="count">3</span>
                    </div>
                </div>
            </header>

            <div className="app-body">
                {/* Side menu */}
                <nav className="side-menu">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className={`menu-link ${currentPage.pathname === item.link ? 'active' : ''}`}
                        >
                            <span className="material-icons">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Main content */}
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default TransportLayout;
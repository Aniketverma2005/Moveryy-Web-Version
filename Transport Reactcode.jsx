import React from 'react';

// Simple header component
const Header = ({ driverName, notifications }) => (
    <header className="top-nav">
        <div className="nav-left">
            <div className="logo-icon">
                <i className="fa-solid fa-plus"></i>
            </div>
            <span className="logo-text">Movery Driver</span>
            <span className="status-badge">On Duty</span>
        </div>
        <div className="nav-right">
            <div className="notification">
                <i className="fa-regular fa-bell"></i>
                <span className="badge">{notifications}</span>
            </div>
        </div>
    </header>
);

// Navigation menu component
const Sidebar = () => {
    const menuItems = [
        { icon: 'fa-house', label: 'Home', active: true },
        { icon: 'fa-book-open', label: 'Bookings' },
        { icon: 'fa-dollar-sign', label: 'Earnings' },
        { icon: 'fa-star', label: 'Ratings' },
        { icon: 'fa-user', label: 'Profile' }
    ];

    return (
        <aside className="sidebar">
            <nav className="side-menu">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className={`menu-item ${item.active ? 'active' : ''}`}
                    >
                        <i className={`fa-solid ${item.icon}`}></i> {item.label}
                    </a>
                ))}
            </nav>
        </aside>
    );
};

// Stats card component
const StatCard = ({ title, value, icon }) => (
    <div className="stat-card">
        <div className="stat-info">
            <p>{title}</p>
            <h2>{value}</h2>
        </div>
        <div className="stat-icon">
            <i className={`fa-solid ${icon}`}></i>
        </div>
    </div>
);

// Order card component
const OrderCard = ({ order }) => (
    <div className="order-card">
        <div className="order-header">
            <span className="label">Order ID</span>
            <span className="value bold">{order.id}</span>
        </div>

        <div className="route-info">
            <div className="route-point">
                <i className="fa-solid fa-location-dot text-blue"></i>
                <div>
                    <p className="label">Pickup</p>
                    <p className="value">{order.pickup}</p>
                </div>
            </div>
            <div className="route-point">
                <i className="fa-solid fa-location-crosshairs text-blue"></i>
                <div>
                    <p className="label">Drop-off</p>
                    <p className="value">{order.dropoff}</p>
                </div>
            </div>
        </div>

        <div className="order-details-grid">
            <div>
                <p className="label">Service</p>
                <p className="value">{order.service}</p>
            </div>
            <div>
                <p className="label">Date/Time</p>
                <p className="value">{order.datetime}</p>
            </div>
            <div>
                <p className="label">Load Size</p>
                <p className="value">{order.loadSize}</p>
            </div>
        </div>

        <div className="card-actions">
            <button className="btn btn-primary">Pending</button>
            <button className="btn btn-outline">More Details</button>
        </div>
    </div>
);

const Transport = () => {
    // Driver data - could come from props or API
    const driverName = "Navi";
    const notifications = 3;

    // Stats data
    const stats = [
        { title: "Today's Orders", value: "2", icon: "fa-cube" },
        { title: "Monthly Earnings", value: "₹4500", icon: "fa-truck" },
        { title: "Current Rating", value: "4.7", icon: "fa-star" }
    ];

    // Orders data
    const orders = [
        {
            id: "ORD-2042",
            pickup: "Omicron 1, Greater Noida",
            dropoff: "Sector 51 , Noida",
            service: "Residential Move",
            datetime: "Today, 10:30 AM",
            loadSize: "2 BHK"
        },
        {
            id: "ORD-2043",
            pickup: "Noida Sector 62 ,Noida",
            dropoff: "Cyber City ,Gurugram",
            service: "Office Relocation",
            datetime: "Today, 12:00 PM",
            loadSize: "8 Desks"
        }
    ];

    return (
        <div className="transport-dashboard">
            <Header driverName={driverName} notifications={notifications} />

            <div className="app-container">
                <Sidebar />

                <main className="main-content">
                    <div className="welcome-section">
                        <p>Welcome back,</p>
                        <h1>{driverName}</h1>
                    </div>

                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <StatCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                            />
                        ))}
                    </div>

                    <div className="section-header">
                        <h2>New Orders</h2>
                        <span className="new-badge">{orders.length} new</span>
                    </div>

                    <div className="orders-grid">
                        {orders.map((order, index) => (
                            <OrderCard key={index} order={order} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Transport;s
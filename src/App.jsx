import './App.css'

import { Route, Routes, Navigate } from 'react-router-dom';
import UserLayout from './Layout/UserLayout.jsx';
import AdminLayout from './Layout/Adminlayout.jsx';
import Transport from './Layout/Transport.jsx';
import Home from './Pages/User/Home.jsx';
import ServiceDetail from './Pages/User/ServiceDetails.jsx';
import Dashboard from './Pages/Admin/Dashboard.jsx';
import Users from './Pages/Admin/Users.jsx';
import Payments from './Pages/Admin/Payments.jsx';
import Offers from './Pages/Admin/Offers.jsx';
import Bookings from './Pages/Admin/Bookings.jsx';
import Analytics from './Pages/Admin/Analytics.jsx';
import Profile from './Pages/Admin/Profile.jsx';
import Review from './Pages/Admin/Review.jsx';
import Settings from './Pages/Admin/Settings.jsx';
import BookingsPage from './Pages/User/Booking.jsx';
import ComparePage from './Pages/User/Compare.jsx';
import MoverSearchPage from './Pages/User/House_Moving.jsx';
import CarTransportSearchPage from './Pages/User/CarTransportsearch.jsx';
import OfficeRelocationSearchPage from './Pages/User/OfficeShift.jsx';

// Transport/Driver Pages
import TransportHome from './Pages/Transport/Home.jsx';
import TransportBookings from './Pages/Transport/Bookings.jsx';
import TransportEarnings from './Pages/Transport/Earnings.jsx';
import TransportRatings from './Pages/Transport/Ratings.jsx';
import TransportProfile from './Pages/Transport/Profile.jsx';
import Login from './Pages/Auth/Login.jsx';
import Signup from './Pages/Auth/Signup.jsx';
import BusinessSignup from './Pages/Auth/BusinessSignup.jsx';
import AdminSignup from './Pages/Auth/AdminSignup.jsx';
import VerifyOtp from './Pages/Auth/VerifyOtp.jsx';
import RidePooling from "./Pages/ridePooling/ridePooling.jsx";
import DriverRegistration from "./Pages/ridePooling/driverregistration.jsx";
import VehicleRegistration from "./Pages/ridePooling/vehicleregistration.jsx";
import CompleteRegistration from "./Pages/ridePooling/completeregistration.jsx";
import OrgRegistration from './Pages/Admin/OrgRegistration.jsx';
function App() {

	return (
		<>

			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signup/business" element={<BusinessSignup />} />
				<Route path="/signup/admin" element={<AdminSignup />} />
				<Route path="/verify-otp" element={<VerifyOtp />} />
				<Route path="/admin/register-organization" element={<OrgRegistration />} />
				<Route path="/ride-pooling" element={<RidePooling />} />
				<Route path="/ride-pooling/register" element={<DriverRegistration />} />
				<Route path="/ride-pooling/vehicle" element={<VehicleRegistration />} />
				<Route path="/ride-pooling/complete" element={<CompleteRegistration />} />

				<Route path="/" element={<UserLayout />}>
					<Route index element={<Home />} />
					<Route path="compare" element={<ComparePage />} />
					<Route path="service/:id" element={<ServiceDetail />} />
					<Route path="bookings" element={<BookingsPage />} />
					<Route path="house-moving" element={<MoverSearchPage />} />
					<Route path="car-moving" element={<CarTransportSearchPage />} />
					<Route path="office-shifting" element={<OfficeRelocationSearchPage />} />
				</Route>

				<Route path="/admin/" element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					{/* <Route path='Dashboard' element={<Dashboard />} /> */}
					<Route path="bookings" element={<Bookings />} />
					<Route path="Users" element={<Users />} />
					<Route path="payment" element={<Payments />} />
					<Route path="offers" element={<Offers />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="profile" element={<Profile />} />
					<Route path="reviews" element={<Review />} />
					<Route path="settings" element={<Settings />} />
				</Route>

				{/* Transport/Driver Dashboard Routes */}
				<Route path="/transport/" element={<Transport />}>
					<Route index element={<TransportHome />} />
					<Route path="bookings" element={<TransportBookings />} />
					<Route path="earnings" element={<TransportEarnings />} />
					<Route path="ratings" element={<TransportRatings />} />
					<Route path="profile" element={<TransportProfile />} />
				</Route>

				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>

		</>
	)
}

export default App

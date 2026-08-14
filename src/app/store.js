import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/dashboardSlice.js";
import bookingsReducer from "../features/bookings/bookingsSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import usersReducer from "../features/users/usersSlice";
import paymentsReducer from "../features/payments/paymentsSlice";
import offersReducer from "../features/offers/offersSlice";
import vehicleOffersReducer from "../features/vehicleOffers/vehicleOffersSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    bookings:  bookingsReducer,
    analytics: analyticsReducer,
    reviews:   reviewsReducer,
    users:     usersReducer,
    payments:  paymentsReducer,
    offers:         offersReducer,
    vehicleOffers:  vehicleOffersReducer,
  },
});

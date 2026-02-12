import mockBookingsData from "./mockBookingsData";

export const fetchBookings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBookingsData);
    }, 800); // simulate network delay
  });
};

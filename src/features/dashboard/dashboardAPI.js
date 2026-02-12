import mockDashboardData from "./mockDashboardData";

export const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardData);
    }, 800); // simulate network delay
  });
};



// export const fetchDashboardData = async () => {
//   const response = await fetch("https://api.example.com/dashboard");
//   if (!response.ok) throw new Error("Failed to fetch dashboard data");
//   return response.json();
// };

import { analyticsMockData } from "./analyticsMockData";

export const fetchAnalyticsAPI = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(analyticsMockData);
    }, 1000); // simulate network delay
  });



import { reviewsMockData } from "./reviewsMockData";

export const fetchReviewsAPI = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(reviewsMockData);
    }, 900);
  });

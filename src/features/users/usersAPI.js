import { usersMockData } from "./usersMockData";

export const fetchUsersAPI = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersMockData);
    }, 800);
  });

import { paymentsMockData } from "./paymentsMockData";

export const fetchPaymentsAPI = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(paymentsMockData);
    }, 900);
  });

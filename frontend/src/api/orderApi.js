import API from '../utils/axios';

export const placeOrder = async (orderData) => {
  const { data } = await API.post('/orders', orderData);
  return data;
};

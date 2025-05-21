import API from '../utils/axios';

export const loginUser = async (email, password) => {
  const { data } = await API.post('/users/login', { email, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await API.post('/users/register', { name, email, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

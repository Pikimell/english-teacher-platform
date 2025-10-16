import axios from './axiosInstance.js';

export const getUserHomework = async useremail => {
  const params = {};
  const res = await axios.get('/homework', { params });
  return res.data;
};

export const addHomework = async homework => {
  const res = await axios.post('/homework', homework);
  return res.data;
};

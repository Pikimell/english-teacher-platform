import axios from './axiosInstance.js';

export const getUsers = async (page = 1, limit = 1000) => {
  const res = await axios.get('/user');
  return res.data;
  /* 
  items - це масив з студентами. У кожного студента є властивість email
  */
};

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

export const getUserHomeworkLessons = async userEmail => {
  const params = {};
  if (userEmail) {
    params.userEmail = userEmail;
    params.email = userEmail;
  }
  const res = await axios.get('/homework/lessons', { params });
  const { data } = res;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.lessons)) return data.lessons;
  return [];
};

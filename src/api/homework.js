import axios from './axiosInstance.js';

export const getUserHomework = async data => {
  const res = await axios.post('/homework/list', data);
  return res.data;
};

export const addHomework = async homework => {
  const res = await axios.post('/homework', homework);
  return res.data;
};

export const getUserHomeworkLessons = async userEmail => {
  const params = {
    page: 1,
    limit: 100,
    userEmail,
  };

  const res = await axios.post('/homework/lessons', params);
  const { data } = res;

  return data.items;
};

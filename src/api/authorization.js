import axios from './axiosInstance.js';

export const loginUser = async ({
  name,
  givenName,
  familyName,
  email,
  picture,
}) => {
  const data = { name, givenName, familyName, email, picture };
  const res = await axios.post('/user', data);
  return res.data;
};

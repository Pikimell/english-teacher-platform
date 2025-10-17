import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://8m3289exx6.execute-api.us-east-2.amazonaws.com',
  baseURL: 'http://localhost:3003',
});

export default instance;

import axios from 'axios';

export const API = () => {
  const instance = axios.create({
    baseURL: 'https://eai6n89wqc.execute-api.ap-southeast-1.amazonaws.com/dev',
    //   process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:1337'
    //     : 'https://eai6n89wqc.execute-api.ap-southeast-1.amazonaws.com/dev',
  });
  return instance;
};

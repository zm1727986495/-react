import axios from 'axios'
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // timeout: 9500000 // 请求超时时间
  widthCredentials: true
});
axios.defaults.widthCredentials = true;
// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent

   
  
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

export default service;
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

    config.headers['Authorization'] = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJoYW95aiIsInVzZXJJZCI6IjEiLCJuYW1lIjoi6YOd5rqQ6YeRIiwicG9zdElkIjoiMjE0NSIsInBvc3ROYW1lIjoi5a6h5Lu357uE6ZW_Iiwic3RvcmVJZCI6IjIwMiIsInN0b3JlTmFtZSI6IuS6rOWNgeaipuWkqeacqOmXqCIsIm9yZ2FuaXphdGlvbklkIjoxOTgxLCJvcmdhbml6YXRpb25OYW1lIjoi5YyX5Lqs5aSn5Yy6Iiwib3JnYW5pemF0aW9uSWRCeVByZXNlbnQiOiIyMjQyIiwib3JnYW5pemF0aW9uTmFtZUJ5UHJlc2VudCI6IuS6rOe6ouapsSIsImRhdGFQZXJtaXNzaW9uc1R5cGUiOiIwIiwiZXhwIjoxNTc2MjI5MTQ3fQ.iTagNWgJ73MjaHJvhekWVwTpcYZbNRg3AKxrBHYfXXnXmicIeqmWr41zwTwZs9TezEtwVaOP5uXhb8StGT4vkwFUPUmraEn9rIG4u53eM9gfx6fIsRrdANG_4tcFQF_7_sGoJ95cDsS8rrHjwxV4cAUw21HvS46lR4aTxdicDAk'; // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

export default service;
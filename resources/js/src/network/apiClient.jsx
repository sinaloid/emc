import axios from 'axios';
import handleError from '../services/handleError';

const apiClient = axios.create({
    baseURL: `https://api.example.com`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  request.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
      let res = error.response;
      handleError(res)
      if (res.status == 401) {
        window.location.href = "https://example.com/login";
      }
      console.error("Looks like there was a problem. Status Code: " + res.status);
      return Promise.reject(error);
    }
  );

  export default apiClient;
import axios from "axios";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const axiosAgent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosAgent.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

export default axiosAgent;

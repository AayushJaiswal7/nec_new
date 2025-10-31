import axios from "axios";

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your backend server URL
  //  withCredentials: true, // This will send the cookie with every request
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error globally
    console.log("Axios error:", error);
    return Promise.reject(error);
  }
);

// Set up response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        localStorage.removeItem("encodedCredentials");
        // window.location.href = "/";
      }
      return Promise.reject(error);
    } else {
      //window.location.href = '/error';
      return Promise.reject(error);
    }
  }
);
export default instance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiCall = async (endpoint, method, data = null) => {
   try {
     const config = {
       url: endpoint,
       method: method,
     };

     if (method !== "GET") {
       config.data = data;
     }

     const response = await axiosInstance(config);
     return response.data;
   } catch (error) {
     console.error("Error during API call:", error);
     throw error;
   }
};

export default apiCall;

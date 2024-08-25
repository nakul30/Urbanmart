import axios from "axios";

const baseURL = "http://localhost:4000/api/";
// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const user = (localStorage.getItem("user"));
// console.log("user", user);
// const currentUser = user ;
const currentUser = user ? JSON.parse(user) : null;
// console.log("ERriir here ");
//console.log("Current User", currentUser);
const token = currentUser?.accessToken;
//console.log("Token", token);
export const publicRequest = axios.create({
  baseURL,
});

export const userRequest = axios.create({
  baseURL,
  // headers: { token : `Bearer ${token}` },
});
userRequest.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : null;
    const token = currentUser?.accessToken;

    if (token) {
      config.headers['token'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
   // console.log("No token in userRequest");
    return Promise.reject(error);
  }
);

const testUserRequest = async () => {
  try {
    // Log the headers to ensure the token is being sent
    //console.log("Headers being sent:", userRequest.defaults.headers);
    
    const response = await userRequest.get("/test"); // Replace '/test' with a valid endpoint
   // console.log("Test request successful:", response.data);
  } catch (error) {
    if (error.response) {
     // console.error('Response data:', error.response.data);
      //console.error('Response status:', error.response.status);
      //console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      //console.error('Request data:', error.request);
    } else {
     // console.error('Error message:', error.message);
    }
    //console.error('Config:', error.config);
  }
};

testUserRequest();
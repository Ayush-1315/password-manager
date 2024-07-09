import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const loginAuth = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/password-manager/login`, {
      username,
      password,
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const signupAuth = async (username, password, email) => {
  try {
    const response = await axios.post(`${BASE_URL}/password-manager/signup`, {
      username,
      password,
      email,
    });
    return response;
  } catch (e) {
    throw e;
  }
};

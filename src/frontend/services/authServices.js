import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const loginAuth = async (username, password,otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/password-manager/login`, {
      username,
      password,
      otp
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const signupAuth = async (
  username,
  password,
  email,
  firstName,
  lastName
) => {
  try {
    const response = await axios.post(`${BASE_URL}/password-manager/signup`, {
      username,
      password,
      email,
      firstName,
      lastName,
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const verifyTokenService = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/password-manager/verify-token`,
      { headers: { Authorization: token } }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

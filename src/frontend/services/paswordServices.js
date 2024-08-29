import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const addPasswordService = async (
  userId,
  platform,
  username,
  password,
  description,
  site,
  token
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/passwords/add-password/${userId}`,
      {
        platform,
        username,
        description,
        password,
        site
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const viewPasswordService = async (
  userId,
  passId,
  token,
  accountPassword
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/passwords/password/${userId}/${passId}`,
      { password: accountPassword },
      { headers: { Authorization: token } }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const getPasswordsService = async (page, token, userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/passwords/${userId}?page=${page}`,
      { headers: { authorization: token } }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const searchPasswordService = async (
  search,
  userId,
  token,
  options = {}
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/passwords/password/${userId}?search=${search}`,
      { headers: { Authorization: token }, signal: options.signal }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const updateAccountPasswordService = async (
  userId,
  passId,
  token,
  platform,
  username,
  accountPassword,
  description,
  website
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/passwords/update-password/${userId}/${passId}`,
      {
        username,
        accPassword: accountPassword,
        description,
        platform,
        website
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const deletePasswordService = async (userId, passId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/passwords/password/${userId}/${passId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const getBasicPaswordInfoService = async (userId, passId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/passwords/password/${userId}/${passId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

//Favourites Password

export const addToFavouritesService=async(userId,passId,token)=>{
  try{
    const response=await axios.post(
      `${BASE_URL}/passwords/favourites/${userId}/${passId}`,
      {},
      {
        headers:{
          authorization:token
        }
      }
    );
    return response;
  }
  catch(e){
    throw e;
  }
}

export const  removeFormFavouritesService=async(userId,passId,token)=>{
  try{
    const response=await axios.delete(
      `${BASE_URL}/passwords/favourites/${userId}/${passId}`,
      {
        headers:{
          authorization:token
        }
      }
    );
    return response;
  }
  catch(e){
    throw e;
  }
}

export const getAllFavouritesService=async(userId,token)=>{
  try{
    const response=await axios.get(
      `${BASE_URL}/passwords/favourites/${userId}`,
      {
        headers:{
          authorization:token
        }
      }
    );
    return response;
  }
  catch(e){
    throw e;
  }
}

export const userDashboardService=async(userId,token)=>{
  try{
    const response=await axios.get(
      `${BASE_URL}/passwords/dashboard/${userId}`,
      {
        headers:{
          authorization:token
        }
      }
    )
    return response;
  }
  catch(e){
    throw e
  }
}
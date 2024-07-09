import axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL
export const userProfile = async (userId, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/password-manager/users/${userId}`,{},
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

export const editUserProfile=async(userId,firstName,lastName,email,token)=>{
  try{
    const response=await axios.post(`${BASE_URL}/password-manager/update-profile/${userId}`,{
      firstName,
      lastName,
      email
    },{
      headers:{
        authorization:token
      }
    })
    return response;
  }
  catch(e){
    throw e
  }

}
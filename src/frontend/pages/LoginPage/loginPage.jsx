import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Login } from "../../components/loginForm/loginForm";
import { useAuth } from "../../context/authContext";
import { sendLoginOtp } from "../../services/userServices";
import { useToaster } from "../../context/toasterContext";

export const LoginPage = () => {
  const { logUser, isLogin } = useAuth();
  const { setToasterData } = useToaster();
  const navigate = useNavigate();
  useEffect(() => {
    isLogin && navigate("/home");
    document.title = "Anzen | Login";
  }, [isLogin, navigate]);
const sendOTPHandler=async(user,password,cb)=>{
  try{
    await sendLoginOtp(user,password);
    setToasterData({ message: "OTP Sent", status: "success" })
    cb();
  }catch(e){
    switch(e?.response?.status){
      case 401:setToasterData({message:"Invalid Credentials",status:"error"});
      break;
      case 404:setToasterData({message:"User does not exist",status:"error"});
      break;
      default: setToasterData({message:"Network Error",status:"error"})
      break
    }
  }
}
  return (
    <>
      <div>
        <Login
          onSubmit={(data) => logUser(data)}
          forgotLink={`/forgot-password`}
          signupLink={`/signup`}
          onNext={async (user,password,callback) => {sendOTPHandler(user,password,callback)}}
          onTimeout={()=>setToasterData({message:"Timeout",status:"warning"})}
        />
      </div>
    </>
  );
};

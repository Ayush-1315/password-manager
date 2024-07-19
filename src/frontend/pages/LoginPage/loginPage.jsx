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
const sendOTPHandler=async(user,cb)=>{
  try{
    await sendLoginOtp(user);
    setToasterData({ message: "OTP Sent", status: "success" })
    cb();
  }catch(e){
    console.log(e)
  }
}
  return (
    <>
      <div>
        <Login
          onSubmit={(data) => logUser(data)}
          forgotLink={`/forgot-password`}
          signupLink={`/signup`}
          onNext={async (data,callback) => {sendOTPHandler(data,callback)}}
        />
      </div>
    </>
  );
};

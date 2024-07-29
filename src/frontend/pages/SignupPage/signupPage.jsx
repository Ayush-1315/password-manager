import { useEffect } from "react";
import { SignupForm } from "../../components/signupForm/signupForm";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";

export const SignupPage = () => {
  const { usernameAvailable, checkUserAvailability, signupUser,isLogin } = useAuth();
  const navigate=useNavigate()
  useEffect(()=>{
    if(isLogin){
      navigate("/home")
    }
    document.title="Signup | Anzen"
  },[isLogin,navigate])
  return (
    <>
      <SignupForm
        isAvailable={usernameAvailable}
        checkAvailability={(user) => checkUserAvailability(user)}
        submitData={(data) => signupUser(data)}
        siginLink={"/login"}
      />
    </>
  );
};

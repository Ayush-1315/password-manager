import { SignupForm } from "../../components/signupForm/signupForm";
import { useAuth } from "../../context/authContext";

export const SignupPage = () => {
  const {usernameAvailable,checkUserAvailability,signupUser} =useAuth();
  console.log(usernameAvailable)
  return (
    <>
      <SignupForm isAvailable={usernameAvailable} checkAvailability={(user)=>checkUserAvailability(user)}
      submitData={data=>signupUser(data)}/>
    </>
  );
};

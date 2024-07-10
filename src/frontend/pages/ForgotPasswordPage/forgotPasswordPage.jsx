import { useState } from "react";
import { ForgotPasswordOTP } from "../../components/forgotOTPForm/forgotOTP";
import { ResetPassword } from "../../components/resetPassword/resetPassword";
import {
  resetPasswordService,
  sendForgotOTP,
} from "../../services/userServices";

export const ForgotPasswordPage = () => {
  const [user, setUser] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const forgotPasswordOTP = async (user) => {
    try {
      const response = await sendForgotOTP(user);
      if (response.status === 200) {
        setUser(response?.data?.username);
        setShowResetPassword(true)
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const resetPassword = async (otp, newPassword) => {
    try {
      const response = await resetPasswordService(user, otp, newPassword);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {showResetPassword ? (
        <ResetPassword
          onSubmit={(otp, newPassword) => resetPassword(otp, newPassword)}
        />
      ) : (
        <ForgotPasswordOTP onSubmit={(data) => forgotPasswordOTP(data)} />
      )}
    </>
  );
};

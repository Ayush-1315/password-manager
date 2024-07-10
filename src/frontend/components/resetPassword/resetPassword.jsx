import { useState } from "react";

export const ResetPassword = ({ onSubmit }) => {
  const initialForm = {
    otp: "",
    newPassword: "",
  };
  const [formData, setFormData] = useState({ ...initialForm });
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    const {otp,newPassword}=formData;
    onSubmit(otp,newPassword);
    e.target.reset();
    setFormData({...initialForm})
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <span>Enter your received OTP and new Password</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="OTP"
          onChange={(e) => changeHandler("otp", e.target.value)}
        />
        <input
          type="text"
          placeholder="New Password"
          onChange={(e) => changeHandler("newPassword", e.target.value)}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

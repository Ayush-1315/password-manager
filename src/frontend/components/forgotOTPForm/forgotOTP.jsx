import { useState } from "react";

import forgotOTPCSS from "./forgotOTP.module.css";
export const ForgotPasswordOTP = ({ onSubmit }) => {
  const [user, setUser] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (user.trim() !== "") {
      await onSubmit(user);
      e.target.reset();
      setUser("");
    } else {
      alert("Enter a user");
    }
  };
  const [focus,setFocus]=useState(false)
  return (
    <div className={`${`glassCard`} ${forgotOTPCSS.card}`}>
      <form onSubmit={(e) => submitHandler(e)}>
        <h3>Reset Password</h3>
        <div className={forgotOTPCSS.inputHolder}>
        <label htmlFor="user" className={user!=="" || focus ?`${forgotOTPCSS.forgotOTPLabel} ${forgotOTPCSS.filled}`:`${forgotOTPCSS.forgotOTPLabel}`}>Username or Email</label>
        <input
          type="text"
          id="user"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          onFocus={()=>setFocus(true)}
          onBlur={()=>setFocus(false)}
        />
        </div>
        <button>Send OTP</button>
      </form>
    </div>
  );
};

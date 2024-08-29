import { useState } from "react";

import VerifyPasswordCSS from "./verifyPassword.module.css";
export const VerifyPassword = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      onSubmit(password);
    } else {
      alert("Provide a valid Password.");
    }
  };
  return (
    <div className={`${VerifyPasswordCSS.componentContainer} ${`glassCard`}`}>
      <form onSubmit={(e) => submitHandler(e)}>
        <p>Please provide account password.</p>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Anzen Password"
          required
        />
        <span className={VerifyPasswordCSS.warning}>
          {password.length > 0 &&
            password.length < 8 &&
            "Enter a valid Password"}
        </span>
        <button onClick={submitHandler} disabled={password.length < 8}>
          Verify
        </button>
      </form>
    </div>
  );
};

import { useState } from "react";

export const VerifyPassword = ( {onSubmit}) => {
  const [password, setPassword] = useState("");
  const submitHandler=()=>{
    if(password.length>=8){
        onSubmit(password);
    }
  }
  return (
    <div>
      <p>Please provide account password.</p>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <button onClick={submitHandler}>Verify</button>
    </div>
  );
};

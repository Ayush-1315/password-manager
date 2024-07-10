import { useState } from "react";

export const ForgotPasswordOTP = ({ onSubmit }) => {
  const [user, setUser] = useState("");
  const submitHandler = async(e) => {
    e.preventDefault();
    if (user.trim() !== "") {
        await onSubmit(user);
        e.target.reset();
        setUser('');
    } else {
      alert("Enter a user");
    }
  };
  return (
    <form onSubmit={e=>submitHandler(e)}>
      <label htmlFor="user">Provide your username or associated email</label>
      <input
        type="text"
        id="user"
        onChange={(e) => {
          setUser(e.target.value);
        }}
        placeholder="Username or email"
      />
      <button>Send OTP</button>
    </form>
  );
};

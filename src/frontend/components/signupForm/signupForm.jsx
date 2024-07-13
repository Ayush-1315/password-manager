import { useState } from "react";

export const SignupForm = ({ checkAvailability, isAvailable, submitData }) => {
  const initialData = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  };
  const validatorData = {
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    firstName: false,
    lastName: false,
  };
  const [formData, setFormData] = useState({ ...initialData });
  const [formValidator, setFormValidator] = useState({ ...validatorData });
  console.log(isAvailable)
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value?.trim() }));
    setFormValidator((prev) => {
      if (type === "username") {
        if (value.length >= 4) {
        checkAvailability(value);
          
        }
        return { ...prev, [type]: value.trim().length > 4 && isAvailable };
      } else if (type === "password") {
        return { ...prev, [type]: value.trim().length >= 8 };
      } else if (type === "confirmPassword") {
        return {
          ...prev,
          [type]:
            value.trim().length >= 8 &&
            value.trim() === formData.password.trim(),
        };
      } else if (type === "email") {
        return {
          ...prev,
          [type]:
            value.trim().length > 0 &&
            value.includes("@") &&
            value.includes(".com"),
        };
      } else {
        return { ...prev, [type]: value.trim().length > 0 };
      }
    });
  };
  console.log(formData, formValidator);
  const submitHandler = async (e) => {
    e.preventDefault();
    const allVerified = Object.values(formValidator).reduce(
      (acc, curr) => (curr ? acc : false),
      true
    );
    if (allVerified) {
      await submitData(formData);
      e.target.reset();
    }
    else{
        alert('Fill all fields accordingly')
    }
  };
  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) => changeHandler("username", e.target.value)}
        />
        {!isAvailable && formData.username !== "" && (
          <div>This username is not available</div>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          placeholder="Password"
          onChange={(e) => changeHandler("password", e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="text"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => changeHandler("confirmPassword", e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={(e) => changeHandler("email", e.target.value)}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          placeholder="First name"
          onChange={(e) => changeHandler("firstName", e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Last name"
          onChange={(e) => changeHandler("lastName", e.target.value)}
        />
        <button>Signup</button>
      </form>
    </>
  );
};

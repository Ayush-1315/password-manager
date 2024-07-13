import { useState } from "react";

export const UpdatePassword = ({ handleSubmit, handleCancel }) => {
const initialData={
    password: "",
    newPassword: "",
    confirmPassword: "",
}
  const [formData, setFormData] = useState({...initialData});
  const { password, newPassword, confirmPassword } = formData;
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };
  const isValid =
    password.trim().length >= 8 &&
    newPassword.trim().length >= 8 &&
    newPassword === confirmPassword;

  const submitHandler = async(e) => {
    e.preventDefault();
    if (isValid) {
      await handleSubmit(password, newPassword);
      e.target.reset();
      setFormData({...initialData})
    } else {
      alert("Provide all details");
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    handleCancel();
  };

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="text"
          name="currentPassword"
          id="currentPassword"
          placeholder="Current Password"
          onChange={(e) => changeHandler("password", e.target.value)}
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          type="text"
          id="newPassword"
          placeholder="New Password"
          onChange={(e) => changeHandler("newPassword", e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="text"
          id="confirmPassword"
          placeholder="New Password"
          onChange={(e) => changeHandler("confirmPassword", e.target.value)}
        />
        <button disabled={!isValid}>Update Password</button>
        <button onClick={cancelHandler}>Cancel</button>
      </form>
    </div>
  );
};

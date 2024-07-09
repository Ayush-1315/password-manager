import { useState } from "react";

export const EditProfile = ({ userData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ ...userData });
  const { id, username, firstName, lastName, email } = formData;
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const email = formData.email;
    if (email && email.includes("@") && email.includes(".com")) {
      onSubmit(formData);
    } else {
      alert("Enter a valid email");
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <span>
          <i>User ID:</i> {id}
        </span>
        <span>
          <i>Username:</i>
          {username}
        </span>
        <input
          type="text"
          defaultValue={firstName}
          onChange={(e) => changeHandler("firstName", e.target.value)}
        />
        <input
          type="text"
          defaultValue={lastName}
          onChange={(e) => changeHandler("lastName", e.target.value)}
        />
        <input
          type="text"
          defaultValue={email}
          onChange={(e) => changeHandler("email", e.target.value)}
        />
        <button>Update Profile</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

import { useState } from "react";

export const Login = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formValidation, setFormValidation] = useState({
    username: false,
    password: false,
  });

  const [isLoading,setIsLoading]=useState(false);
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
    setFormValidation((prev) => ({ ...prev, [type]: value.trim() !== "" }));
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    const isFormValid = Object.values(formValidation).reduce(
      (acc, curr) => (curr ? acc : false),
      true
    );

    if(isFormValid){
        setIsLoading(true)
        await onSubmit(formData);
        setIsLoading(false)
        e.target.reset();
    }
    else{
        alert('fill all details')
    }
  };
  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => changeHandler("username", e.target.value)}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={(e) => changeHandler("password", e.target.value)}
        />
        <button disabled={isLoading}>Submit</button>
      </form>
    </>
  );
};

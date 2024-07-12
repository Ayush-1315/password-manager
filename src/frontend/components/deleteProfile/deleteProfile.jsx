import { useState } from "react";

export const DeleteProfile = ({setDeleteData}) => {
  const [formData, setFormData] = useState({
    OTP: "",
    password: "",
  });
  const [formValidator, setFormValidator] = useState({
    OTP: false,
    password: false,
  });
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
    setFormValidator((prev) => 
        (type==='OTP')?
            ({...prev,[type]:value.trim().length===6})
        
        :({...prev,[type]:value.trim().length>=8})
    );
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    const {OTP,password}=formValidator;
    if(OTP && password){
        setDeleteData(formData.OTP,formData.password);
        e.target.reset();
    }
  }
  return (
    <form onSubmit={e=>submitHandler(e)}>
      A verification OTP has been send to your registered email.
      <label htmlFor="OTPverification">Verify OTP</label>
      <input type="text" id="OTPverification" placeholder="OTP" onChange={e=>changeHandler('OTP',e.target.value)}/>
      <label htmlFor="password">Confirm Password</label>
      <input type="password" placeholder="Confirm Password" onChange={e=>changeHandler('password',e.target.value)}/>
      <button disabled={!formValidator?.OTP && !formValidator?.password}>Delete my account</button>
    </form>
  );
};

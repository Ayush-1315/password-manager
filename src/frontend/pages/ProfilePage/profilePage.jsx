import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import { editUserProfile, userProfile } from "../../services/userServices";
import { ProfileCard } from "../../components/profileCard/profilecard";
import { EditProfile } from "../../components/editProfile/editProfile";

export const Profile = () => {
  const { isLogin, logoffUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editProfileForm, setEditProfileForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userTimeout, setUserTimeout] = useState(false);
  const [timer,setTimer]=useState(5);
  const timerIdRef=useRef(null)

  useEffect(() => {
    (async () => {
      try {
        const token = isLogin?.token;
        const userId = isLogin?.user?.id;
        const res = await userProfile(userId, token);
        if (res.status === 200) {
          setUserData({ ...res?.data?.data?.user });
        }
      } catch (e) {
        setUserData(false);
        if (e?.response?.status === 401) {
          setUserTimeout(true);

          if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
          }
          timerIdRef.current=setInterval(()=>{
              setTimer(prev=>{
                console.log(`Timer value ${prev}`)
                if(prev===0){
                  clearInterval(timerIdRef.current);
                  logoffUser();
                  return 0
                }
                else{
                  return prev-1
                }
              })
          },1000)
        }
      } finally {
        setIsLoading(false);
      }
    })();
    document.title = `Profile | Anzen`;
  }, [isLogin,logoffUser]);
  const submitHandler = async (data) => {
    try {
      const id = isLogin?.user?.id;
      const token = isLogin?.token;
      const { firstName, lastName, email } = data;
      const response = await editUserProfile(
        id,
        firstName,
        lastName,
        email,
        token
      );
      setEditProfileForm(false);
      if (response?.status === 201) {
        setUserData((prev) => ({ ...prev, ...response?.data?.data }));
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cancelHandler = () => {
    setEditProfileForm(false);
  };
  return (
    <>
      {userTimeout ? (
        <span>Token Expired {timer}</span>
      ) : (
        <div>
          {editProfileForm && userData && (
            <EditProfile
              userData={userData}
              onSubmit={(data) => {
                submitHandler(data);
              }}
              onCancel={cancelHandler}
            />
          )}
          {isLoading ? (
            <div>Loading...</div>
          ) : userData ? (
            <ProfileCard
              userData={userData}
              onEdit={() => {
                setEditProfileForm(true);
              }}
              onLogOff={() => logoffUser()}
            />
          ) : (
            <span>Sorry for Inconvinience, there are some server issues.</span>
          )}
        </div>
      )}
    </>
  );
};

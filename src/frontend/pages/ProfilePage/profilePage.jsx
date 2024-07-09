import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { editUserProfile, userProfile } from "../../services/userServices";
import { ProfileCard } from "../../components/profileCard/profilecard";
import { EditProfile } from "../../components/editProfile/editProfile";

export const Profile = () => {
  const { isLogin,logoffUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editProfileForm, setEditProfileForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(e);
        setUserData(false);
      } finally {
        setIsLoading(false);
      }
    })();
    document.title = `Profile | Anzen`;
  }, [isLogin]);
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

  const cancelHandler=()=>{
    setEditProfileForm(false);
  }
  return (
    <>
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
          onLogOff={()=>logoffUser()}
        />
      ) : (
        <span>Sorry for Inconvinience, there are some server issues.</span>
      )}
    </>
  );
};

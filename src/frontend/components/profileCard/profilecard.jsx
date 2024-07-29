import profileCardCSS from "./profileCard.module.css";

export const ProfileCard = ({
  userData,
  onEdit,
  onLogOff,
  onDelete,
  onUpdatePassword,
}) => {
  const {
    id,
    username,
    email,
    firstName,
    lastName,
    createdAt,
    totalSavedPassword,
    role,
  } = userData;
  const createDate = new Date(createdAt);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { date, month, year, hours, minutes, seconds } = {
    date: createDate.getDate(),
    month: months[createDate.getMonth()],
    year: createDate.getUTCFullYear(),
    hours: createDate.getUTCHours(),
    minutes: createDate.getUTCMinutes(),
    seconds: createDate.getUTCSeconds(),
  };
  return (
    <div className={`${`glassCard`} ${profileCardCSS.card}`}>
      <h2>Account Details</h2>
      <div className={profileCardCSS.profileContainer}>
        <div>
          <span className={profileCardCSS.logo}>
            {username[0]?.toUpperCase()}
          </span>
        </div>
        <div>
          <div className={profileCardCSS.detail}>
            <span className={profileCardCSS.name}>
              {firstName} {lastName}
            </span>
          </div>
          <div className={profileCardCSS.username}>
            <span>@{username}</span>
          </div>
          <div className={profileCardCSS.detail}>
            <button
              onClick={onEdit}
              className={`${`button`} ${profileCardCSS.editBtn}`}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
          <div>
            <button
              onClick={() => onUpdatePassword(id, username)}
              className={`${`button`} ${profileCardCSS.passwordUpdateBtn}`}
            >
              <span>
                <i className="fa-solid fa-pencil"></i>
              </span>
              <span>Update Password</span>
            </button>
          </div>
          <div className={profileCardCSS.profileDetails}>
            <div className={profileCardCSS.detail}>
              <span>Anzen ID:</span> <span>{id}</span>
            </div>

            <div className={profileCardCSS.detail}>
              <span>Email:</span> <span>{email}</span>
            </div>

            <div className={profileCardCSS.detail}>
              <span>Saved Passwords:</span> <span>{totalSavedPassword}</span>
            </div>
            <div className={profileCardCSS.detail}>
              <span>Role:</span> <span>{role}</span>
            </div>
            <div className={profileCardCSS.detail}>
              {createdAt && (
                <>
                  <span>Created At: </span>
                  <span>
                    {`${date || ""} ${month || ""} ${year || ""};${
                      hours || ""
                    }:${minutes || ""}:${seconds || ""}`}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className={profileCardCSS.actionBtns}>
            <button
              onClick={onLogOff}
              className={`${`button`} ${profileCardCSS.logOffBtn}`}
            >
              <span>Logoff</span>
              <span>
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>
            </button>
            <button
              onClick={() => onDelete(id, email, username)}
              className={`${`button`} ${profileCardCSS.deleteProfileBtn}`}
            >
              <span>
                <i className="fa-solid fa-trash"></i>
              </span>
              <span>Delete Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

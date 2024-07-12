export const ProfileCard = ({ userData, onEdit, onLogOff, onDelete}) => {
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
    <>
      <div>
        <div>Anzen ID: {id}</div>
        <div>Username:{username}</div>
        <div>Registered email: {email}</div>
        <div>
          Name: {firstName} {lastName}
        </div>

        <div>Saved Passwords: {totalSavedPassword}</div>
        <div>Role: {role}</div>
        <div>
          {createdAt && (
            <span>
              Created At:{" "}
              {`${date || ""} ${month || ""} ${year || ""};${hours || ""}:${
                minutes || ""
              }:${seconds || ""}`}
            </span>
          )}
        </div>
      </div>
      <div>
        <button onClick={onEdit}>Edit Profile</button>
        <button onClick={onLogOff}>Logoff</button>
        <button onClick={()=>onDelete(id,email,username)}>Delete Profile</button>
      </div>
    </>
  );
};

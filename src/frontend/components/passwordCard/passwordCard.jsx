import passwordCardCSS from "./passwordCard.module.css";

export const PasswordCard = ({
  _id,
  password,
  platform,
  remindAfterDays,
  username,
  description,
}) => {
  return (
    <div className={`${`glassCard`} ${passwordCardCSS.card}`}>
      <span>Password ID: {_id}</span>
      <span>Associated Platform: {platform}</span>
      <span>Associated Username: {username}</span>
      <span>Description: {description}</span>
      {remindAfterDays && <span>Remider (Days): {remindAfterDays}</span>}
      {password && <span>Associated Password: {password}</span>}
    </div>
  );
};

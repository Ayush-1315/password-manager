import { useNavigate } from "react-router";
import passwordHolderCSS from "./password.module.css";
export const PasswordHolder = ({
  _id,
  username,
  platform,
  description,
  userId,
  onDelete
}) => {
  const navigate = useNavigate();
  const handleDelete=(e)=>{
    e.stopPropagation();
    onDelete()
  }
  return (
    <div
      to={`/${userId}/passwords/${_id}`}
      className={`${`glassCard`} ${passwordHolderCSS.card}`}
      onClick={() => navigate(`/${userId}/passwords/${_id}`)}
    >
      <div>
        <h2>{username}</h2>
        <span>{platform}</span>
        <p>{description}</p>
        <button onClick={e=>handleDelete(e)}><i className="fa-solid fa-trash"></i><span>Delete</span></button>
      </div>
    </div>
  );
};

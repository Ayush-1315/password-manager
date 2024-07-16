import { Link } from "react-router-dom";

export const PasswordHolder = ({
  _id,
  username,
  platform,
  description,
  userId,
  handleEdit,
}) => {
  return (
    <Link
      to={`/${userId}/passwords/${_id}`}
      style={{
        border: `2px solid red`,
        display: `inline-block`,
        textDecoration: `none`,
      }}
    >
      <div>
        <h2>{username}</h2>
        <span>{platform}</span>
        <p>{description}</p>
        <button
                 >
          Delete
        </button>
      </div>
    </Link>
  );
};

import { Link } from "react-router-dom";

export const PasswordHolder = ({_id,username,platform,description}) => {
  return <Link to={`/browse-passwords/password/${_id}`} style={{border:`2px solid red`,display:`inline-block`,textDecoration:`none`}}>
    <div>
        <h2>{username}</h2>
        <span>{platform}</span>
        <p>{description}</p>
    </div>
  </Link>;
};

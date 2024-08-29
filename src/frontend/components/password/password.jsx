import { copyTextFromDiv } from "../../utils/copyCode";
import { pickRandomColor } from "../../utils/randomColor";
import passwordHolderCSS from "./password.module.css";
import { useEffect, useState } from "react";
export const PasswordHolder = ({
  _id,
  username,
  platform,
  description,
  website,
  isFavourite,
  onDelete,
  onView,
  viewPassword,
  resetViewPassword,
  onEdit,
  addToFav,
  removeFromFav,
}) => {
  const [expand, setExpand] = useState(false);
  // const [error, setError] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    try {
      setUrl(`${new URL(`${website}`)?.origin}/favicon.ico`);
    } catch (e) {
      setUrl("");
    }
  }, [website]);
  // const handleError = () => {
  //   setError(true);
  // };
  useEffect(() => {
    if (viewPassword !== "") {
      setTimeout(() => {
        resetViewPassword();
      }, 10000);
    }
  }, [viewPassword, resetViewPassword]);
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };
  const handleViewPassword = (e) => {
    e.stopPropagation();
    onView(_id);
  };
  const handleEditPassword = (e) => {
    e.stopPropagation();
    onEdit(_id);
  };
  const handleExpand = () => setExpand((prev) => !prev);
  const handleAddToFav = (e) => {
    e.stopPropagation();
    addToFav(_id);
  };
  const handleRemoveFromFav = (e) => {
    e.stopPropagation();
    removeFromFav(_id);
  };
  return (
    <div
      className={`${`glassCard`} ${passwordHolderCSS.card}`}
      onClick={() => handleExpand()}
    >
      <div
        className={
          viewPassword !== ""
            ? `${passwordHolderCSS.flipCardInner} ${passwordHolderCSS.flipCardInnerRotate}`
            : `${passwordHolderCSS.flipCardInner}`
        }
      >
        <div className={passwordHolderCSS.flipCardFront}>
          <div className={passwordHolderCSS.contents}>
            <div
              style={{ backgroundImage: `url(${url})` }}
              className={passwordHolderCSS.logo}
            >
              <span
                className={passwordHolderCSS.logoHolder}
                style={{ color: pickRandomColor() }}
              >
                {platform[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h4>{username}</h4>
              <span>{platform}</span>
            </div>
          </div>
          <div className={passwordHolderCSS.options}>
            <button
              onClick={(e) => handleEditPassword(e)}
              className={passwordHolderCSS.edit}
            >
              <i className="fa-solid fa-pencil"></i>Edit
            </button>
            <button
              onClick={(e) => handleDelete(e)}
              className={passwordHolderCSS.delete}
            >
              <i className="fa-solid fa-trash"></i>Delete
            </button>
            <button
              onClick={(e) => handleViewPassword(e)}
              className={passwordHolderCSS.viewPassword}
            >
              <i className="fa-solid fa-eye"></i>View Password
            </button>
          </div>
          {expand && (
            <div className={passwordHolderCSS.description}>
              <p>
                <b>Description:</b>
              </p>
              <p>{description}</p>
            </div>
          )}
          {!isFavourite ? (
            <span onClick={(e) => handleAddToFav(e)}>
              <i
                className={`${`fa-regular fa-star`} ${passwordHolderCSS.fav}`}
              ></i>
            </span>
          ) : (
            <span onClick={(e) => handleRemoveFromFav(e)}>
              <i
                className={`${`fa-solid fa-star`} ${passwordHolderCSS.fav}`}
              ></i>
            </span>
          )}
        </div>
        <div className={passwordHolderCSS.flipCardBack}>
          <>
            <p>Your Password is</p>
            <p id={`password${_id}`}>{viewPassword}</p>
          </>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyTextFromDiv(`password${_id}`);
            }}
            className={passwordHolderCSS.copyBtn}
          >
            <i className="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

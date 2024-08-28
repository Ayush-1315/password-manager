import { useEffect, useState } from "react";
import { getAllFavouritesService } from "../../services/paswordServices";
import { useAuth } from "../../context/authContext";

export const FavouritesPage = () => {
  const [favourites, setFavouries] = useState([]);
  const { isLogin } = useAuth();
  console.log(isLogin);
  useEffect(() => {
    (async () => {
      try {
        const response = await getAllFavouritesService(
          isLogin?.user?.id,
          isLogin?.token
        );
        console.log(response)
      } catch (e) { console.log(e)}
    })();
  }, []);
  return <>Favourites Here</>;
};

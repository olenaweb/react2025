import { useAppSelector, useAppDispatch } from "../store/appHook";
import { removeFavorite } from "../store/slices/favoriteSlice";

import ExportButton from "./ExportButton";
import "./popup.css";

const Popup = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const itemCount = favorites.length;
  if (itemCount === 0) {
    return null;
  }
  const DeselectAllHandle = () => {
    favorites.forEach((item) => dispatch(removeFavorite(item)));
  };

  return (
    <div className={"popup light-popup"}>
      <p>Selected {itemCount} items</p>
      <button onClick={DeselectAllHandle}>Unselect All</button>
      <ExportButton favorites={favorites} />
    </div>
  );
};

export default Popup;

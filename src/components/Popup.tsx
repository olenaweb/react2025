import React from "react";
import { useTheme } from "../store/useTheme";
import { FavoriteItem } from "types/types";
import ExportCSVButton from "./ExportCSVButton";

interface PopupProps {
  itemCount: number;
  onDeselectAll: () => void;
  favorites: FavoriteItem[];
}

const Popup: React.FC<PopupProps> = ({ itemCount, onDeselectAll, favorites }) => {
  const { theme } = useTheme();

  return (
    <div className={theme === "light" ? "popup light-popup" : "popup dark-popup"}>
      <p>Selected {itemCount} items</p>
      <button onClick={onDeselectAll}>Deselect All</button>
      <ExportCSVButton favorites={favorites} />
    </div>
  );
};

export default Popup;

import React from "react";
import { useTheme } from "../store/useTheme";


interface PopupProps {
  itemCount: number;
  onDeselectAll: () => void;
  onDownload: () => void;
}


const Popup: React.FC<PopupProps> = ({ itemCount, onDeselectAll, onDownload }) => {
  const { theme } = useTheme();

  return (
    <div className={theme === "light" ? "popup light-popup" : "popup dark-popup"}>
      <p>Selected {itemCount} items</p>
      <button
        onClick={onDeselectAll}>Deselect All</button>
      <button onClick={onDownload}>Download</button>
    </div>
  );
};

export default Popup;

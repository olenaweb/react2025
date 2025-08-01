import { FavoriteItem } from "../types/types";
import { createRef } from "react";
import loadPct from "../assets/load.png";

interface ExportButtonProps {
  favorites: FavoriteItem[];
}

const ExportButton = ({ favorites }: ExportButtonProps) => {
  const upload = createRef<HTMLAnchorElement>();
  const handlePrepareCSV = () => {
    let url: string | null = null;

    try {
      const csvHeader = "id,name,image,gender,species,status";
      const csvRows = favorites.map(
        (item) =>
          `${item.id},"${item.name}","${item.image}",${item.gender},${item.species},${item.status}`
      );
      const csvContent = [csvHeader, ...csvRows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      url = URL.createObjectURL(blob);
      const link = upload.current;
      if (link) {
        link.href = url;
        link.download = `${favorites.length}_items.csv`;
        link.click();
      }
    } finally {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <>
      <button onClick={handlePrepareCSV}>
        <img className="load" src={loadPct} alt="Download" />
      </button>
      <a ref={upload} href=""></a>
    </>
  );
};

export default ExportButton;

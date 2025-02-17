import React from "react";
import { FavoriteItem } from "types/types";

interface ExportCSVButtonProps {
  favorites: FavoriteItem[];
}

const ExportCSVButton: React.FC<ExportCSVButtonProps> = ({ favorites }) => {
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
      const link = document.createElement("a");
      link.href = url;
      link.download = `${favorites.length}_items.csv`;
      link.click();
    } finally {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <>
      <button onClick={handlePrepareCSV}>
        <img className="load" src="/react2025/src/assets/load.png" alt="Download" />
      </button>
    </>
  );
};

export default ExportCSVButton;

import { FavoriteItem } from "../types/types";
import { createRef } from "react";
import Image from "next/image";

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
        setTimeout((url) => {
          URL.revokeObjectURL(url);
        }, 100);
      }
    } catch (error) {
      console.error("Error generating CSV:", error);
      if (upload.current) {
        upload.current.href = "";
      }
      if (upload.current) {
        upload.current.download = "";
      }
    }
  };

  return (
    <>
      <button aria-label="download" title="Download" onClick={handlePrepareCSV}>
        <Image className="load" src="/load.png" alt="load" />
      </button>
      <a ref={upload} href="" aria-label="download-link" role="link" />
    </>
  );
};

export default ExportButton;

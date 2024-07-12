import "./../App.css";
import { useState, useEffect } from "react";
import { isNotNullable } from "../types/types";

interface Props {
  currentPage: string;
  updateCurrentPage: (page: string) => void;
  nextPage: string | null;
  lastPage: number | null;
}

export default function Pagination({ currentPage, updateCurrentPage, nextPage, lastPage }: Props) {
  const [page, setPage] = useState<string>(currentPage);
  const nextPageValue = nextPage ? Number(nextPage) : null;

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const toFirstPage = () => {
    const prevPage = (-1).toString();
    setPage(prevPage);
    updateCurrentPage("1");
  };
  const toPrevPage = () => {
    const prevPage = (parseInt(page) - 1).toString();
    setPage(prevPage);
    updateCurrentPage(prevPage);
  };

  const toNextPage = () => {
    const nextPage = (parseInt(page) + 1).toString();
    setPage(nextPage);
    updateCurrentPage(nextPage);
  };
  const toLastPage = () => {
    if (lastPage) {
      updateCurrentPage(lastPage.toString());
    }
  };

  return (
    <>
      <button onClick={toFirstPage} disabled={parseInt(page) == 1}>
        First
      </button>
      <button onClick={toPrevPage} disabled={parseInt(page) <= 1}>
        Prev
      </button>
      <span className="current-page">{page}</span>
      <button onClick={toNextPage} disabled={!isNotNullable(nextPageValue)}>
        Next
      </button>
      <button onClick={toLastPage} disabled={parseInt(page) == lastPage}>
        Last
      </button>
    </>

  );
}

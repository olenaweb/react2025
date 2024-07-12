import './../App.css';
import { useState, useEffect } from "react";
import { isNotNullable } from '../types/types';

interface Props {
  currentPage: string;
  updateCurrentPage: (page: string) => void;
  nextPage: string | null;
}

export default function Pagination({ currentPage, updateCurrentPage, nextPage }: Props) {
  const [page, setPage] = useState<string>(currentPage);
  const nextPageValue = (nextPage) ? Number(nextPage) : null;
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

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

  return (
    <>
      <button onClick={toPrevPage} disabled={parseInt(page) <= 1}>
        Prev
      </button>
      <span className='current-page'>{page}</span>
      <button onClick={toNextPage} disabled={!isNotNullable(nextPageValue)}>
        Next
      </button>
    </>
  );
}

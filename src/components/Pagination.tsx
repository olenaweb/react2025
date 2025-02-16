import "./../App.css";
import { useState, useEffect } from "react";
import { isNotNullable } from "../types/types";
import { Link } from "react-router-dom";
import { useTheme } from "./../store/useTheme";

interface Props {
  currentPage: string;
  updateCurrentPage: (page: string) => void;
  nextPage: string | null;
  lastPage: number | null;
}

export default function Pagination({ currentPage, updateCurrentPage, nextPage, lastPage }: Props) {
  const currentPageValue = Number(currentPage) ? currentPage : "1";
  const [page, setPage] = useState<string>(currentPageValue);
  const nextPageValue = nextPage ? Number(nextPage) : null;
  const { theme } = useTheme();

  useEffect(() => {
    setPage(currentPageValue);
  }, [currentPageValue]);

  const isOutOfRange = lastPage == null;

  const toFirstPage = () => {
    const prevPage = (0).toString();
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
      <div
        className={
          theme === "light"
            ? "pagination-panel light-pagination-panel"
            : "pagination-panel dark-pagination-panel"
        }
      >
        <Link to={`/react2025/page/1`}>
          <button onClick={toFirstPage} disabled={parseInt(page) == 1}>
            First
          </button>
        </Link>
        <Link to={`/react2025/page/${parseInt(page) <= 1 ? 0 : parseInt(page) - 1}`}>
          <button onClick={toPrevPage} disabled={isOutOfRange || parseInt(page) <= 1}>
            Prev
          </button>
        </Link>
        <span className="current-page">{Number(page) ? page : currentPageValue}</span>
        <Link to={`/react2025/page/${parseInt(page) + 1}`}>
          <button onClick={toNextPage} disabled={isOutOfRange || !isNotNullable(nextPageValue)}>
            Next
          </button>
        </Link>
        <Link to={`/react2025/page/${lastPage}`}>
          <button
            onClick={toLastPage}
            disabled={isOutOfRange || (lastPage !== null && parseInt(page) === lastPage)}
          >
            Last
          </button>
        </Link>
      </div>
    </>
  );
}

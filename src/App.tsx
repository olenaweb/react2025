import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { SuccessResponse, Response } from "./types/types";
import "./App.css";
import SearchInput from "./components/SearchInput";
import { getData } from "./request/getData";
import { CardList } from "./containers/CardList";
import BackButton from "./components/BackButton";
import useLocalStorage from "./utils/useLocalStorage";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pageId } = useParams<{ pageId: string }>();
  const [storeValue, setStoreValue] = useLocalStorage("olena_01_search", "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<SuccessResponse>({
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>(pageId || "1");

  const [nextPage, setNextPage] = useState<string | null>(requestData.info.next);
  const [lastPage, setLastPage] = useState<number | null>(requestData.info.pages);

  const updateStoreValue = (value: string) => {
    setStoreValue(value);
  };

  useEffect(() => {
    const { pathname } = location;

    if (pathname === "/react2025" || pathname === "/react2025/") {
      navigate("/react2025/page/1", { replace: true });
      return;
    }
    if (!pageId) return;

    const pageNumber = Number(pageId);
    const isInvalidPage = !Number.isInteger(pageNumber) || pageNumber <= 0;
    if (isInvalidPage) {
      setErrorMessage("*** Wrong route! Page not a figure");
      navigate("/react2025/error", { replace: true });
    }
  }, [pageId, location, navigate]);

  const updateRequestData = (result: Response) => {
    if ("error" in result) {
      setErrorMessage(result.error);
      setRequestData({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
    } else {
      setRequestData(result);
      setErrorMessage("");
    }
  };

  const updateErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  const updateCurrentPage = (page: string) => {
    setCurrentPage(page);
    navigate(`/react2025/page/${page}`);
  };
  const updateNextPage = (page: string | null) => {
    setNextPage(page);
  };
  const updateLastPage = (page: number | null) => {
    setLastPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const resultData: Response = await getData(storeValue, currentPage);
        if ("error" in resultData) {
          setErrorMessage("Sorry, the name is not found. Try another name");
          setRequestData({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
        } else {
          setRequestData(resultData);
          setErrorMessage("");
          updateNextPage(resultData.info.next);
          updateLastPage(resultData.info.pages);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Something's gone wrong :-( ");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [storeValue, currentPage]);

  const viewContainer = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    } else if (errorMessage !== "") {
      return (
        <div className="error-message">
          {errorMessage}
          <BackButton />
        </div>
      );
    } else {
      return (
        <>
          <CardList results={requestData.results} />
          <Outlet />
        </>
      );
    }
  }, [isLoading, errorMessage, requestData]);

  return (
    <>
      <SearchInput
        searchValue={storeValue}
        currentPage={currentPage}
        updateRequestData={updateRequestData}
        updateStoreValue={updateStoreValue}
        updateErrorMessage={updateErrorMessage}
        updateCurrentPage={updateCurrentPage}
      />

      <Pagination
        currentPage={currentPage}
        updateCurrentPage={updateCurrentPage}
        nextPage={nextPage}
        lastPage={lastPage}
      />

      <div className="cards-panel">{viewContainer}</div>
    </>
  );
};

export default App;

import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import { SuccessResponse, Response } from "./types/types";
import "./App.css";
import SearchInput from "./components/SearchInput";
import { getData } from "./request/getData";
import { Container } from "./containers/Container";
import ReloadButton from "./components/ReloadButton";
import useLocalSearch from "./utils/useLocalSearch";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pageId = "1" } = useParams<{ pageId: string }>();
  const [storeValue, setStoreValue] = useLocalSearch("olena_01_search", "");
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
    if (location.pathname === "/react2025") {
      navigate("/react2025/page/1", { replace: true });
    }
  }, [pageId, location.pathname, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const resultData: Response = await getData(storeValue, currentPage);
        if ("error" in resultData) {
          setErrorMessage("Sorry , nothing to find, try again");
          setRequestData({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
          updateStoreValue("");
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
          {errorMessage} <ReloadButton />
        </div>
      );
    } else {
      return (
        <>
          <Container results={requestData.results} />
          {/* <Outlet /> */}
        </>
      );
    }
  }, [isLoading, errorMessage, requestData]);

  return (
    <>
      <Outlet />
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

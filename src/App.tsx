import { useState, useEffect } from "react";
import { StateAppPage, Response } from "./types/types";
import "./App.css";
import SearchInput from "./components/SearchButton";
import { getData } from "./request/getData";
import { Container } from "./containers/Container";
import ReloadButton from "./components/ReloadButton";
import ErrorButton from "./components/ErrorButton";
import rickmorty from "./assets/rickmorty.jpg";
import useLocalSearch from "./utils/useLocalSearch";
import Pagination from "./components/Pagination";

const App = () => {
  const [storeValue, setStoreValue] = useLocalSearch("olena_01_search", "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<StateAppPage["requestData"]>({
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>("1");
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
        const resultData: Response = await getData(storeValue, currentPage);
        if ("error" in resultData) {
          setIsLoading(false);
          setErrorMessage("**** Sorry, the name is not found. Try another name");
          setRequestData({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
        } else {
          setRequestData(resultData);
          setIsLoading(false);
          setErrorMessage("");
          updateNextPage(resultData.info.next);
          updateLastPage(resultData.info.pages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setErrorMessage("Something's gone wrong :-( ");
      }
    };

    fetchData();
  }, [storeValue, currentPage]);

  return (
    <>
      <div className="search-panel">
        <div className="rick-morty">
          <img className="rick-morty-img" src={rickmorty} alt="Rick and Morty" />
        </div>
        <h2 className="search-title">Rick and Morty</h2>
        <SearchInput
          searchValue={storeValue}
          currentPage={currentPage}
          updateRequestData={updateRequestData}
          updateStoreValue={updateStoreValue}
          updateErrorMessage={updateErrorMessage}
          updateCurrentPage={updateCurrentPage}
        />
        <ErrorButton />
      </div>
      <div className="pagination-panel">
        <Pagination
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
          nextPage={nextPage}
          lastPage={lastPage}
        />
      </div>
      <div className="cards-panel">
        {isLoading ? (
          <p>Loading...</p>
        ) : errorMessage !== "" ? (
          <div className="error-message">
            {errorMessage} <ReloadButton />
          </div>
        ) : (
          <Container results={requestData.results} />
        )}
      </div>
    </>
  );
};

export default App;

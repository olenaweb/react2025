import { useGetCharactersQuery } from "./store/services/characterApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store/Store";
import { useEffect } from "react";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { setCurrentPage, setLastPage } from "./store/features/paginationSlice";
import "./App.css";
import SearchInput from "./components/SearchButton";
import { Container } from "./containers/Container";
import ReloadButton from "./components/ReloadButton";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import useLocalSearch from "./utils/useLocalSearch";
import { useTheme } from "./store/useTheme";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, lastPage } = useSelector((state: RootState) => state.pagination);

  const [storeValue, setStoreValue] = useLocalSearch("olena_01_search", "");

  const { data, error, isLoading } = useGetCharactersQuery({ name: storeValue, page: currentPage });
  // delay
  useEffect(() => {
    if (isLoading) {
      <Loader />;
    }
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    };
  }, [isLoading]);

  const updateStoreValue = (value: string) => {
    setStoreValue(value);
  };

  useEffect(() => {
    if (data) {
      dispatch(setLastPage(data.info.pages));
    }
  }, [data, dispatch]);

  const updateCurrentPage = (page: string) => {
    dispatch(setCurrentPage(page));
  };
  const viewContainer = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return (
        <div className="error-message">
          Something's gone wrong :-( <ReloadButton />
        </div>
      );
    } else {
      return (
        <>
          <Container results={data?.results || []} />
          <Outlet />
        </>
      );
    }
  }, [isLoading, error, data]);

  return (
    <>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "Light" : "Dark"}
      </button>
      <SearchInput
        searchValue={storeValue}
        currentPage={currentPage}
        updateStoreValue={updateStoreValue}
      />

      <Pagination
        currentPage={currentPage}
        nextPage={data?.info.next ? data.info.next : ""}
        lastPage={lastPage}
        updateCurrentPage={updateCurrentPage}
      />

      <div
        className={
          theme === "light" ? "cards-panel light-cards-panel" : "cards-panel dark-cards-panel"
        }
      >
        {viewContainer}
      </div>
    </>
  );
};

export default App;

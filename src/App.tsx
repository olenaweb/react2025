import { useGetCharactersQuery } from "./store/services/characterApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store/Store";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { setCurrentPage, setLastPage } from "./store/features/paginationSlice";
import "./App.css";
import SearchInput from "./components/SearchButton";
import { Container } from "./containers/Container";
import ReloadButton from "./components/ReloadButton";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, lastPage } = useSelector((state: RootState) => state.pagination);

  const [storeValue, setStoreValue] = useState<string>("");
  const { data, error, isLoading } = useGetCharactersQuery({ name: storeValue, page: currentPage });
  console.log('"isLoading="', isLoading);
  console.log('"data="', data);
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
      <SearchInput
        searchValue={storeValue}
        currentPage={currentPage}
        updateStoreValue={updateStoreValue}
      />

      <Pagination
        currentPage={currentPage}
        nextPage={data?.info.next}
        lastPage={lastPage}
        updateCurrentPage={updateCurrentPage}
      />

      <div className="cards-panel">{viewContainer}</div>
    </>
  );
};

export default App;

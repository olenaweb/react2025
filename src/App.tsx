import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/redux";
import { RootState, AppDispatch } from "./store/Store";
import { useGetCharactersQuery } from "./store/services/characterApi";

import { setCurrentPage, setLastPage } from "./store/features/paginationSlice";
import { removeFavorite } from "./store/services/favoriteSlice";
import { useTheme } from "./store/useTheme";

import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import useLocalSearch from "./utils/useLocalSearch";
import SearchInput from "./components/SearchButton";
import { Container } from "./containers/Container";
import ReloadButton from "./components/ReloadButton";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import Popup from "./components/Popup";
import "./App.css";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { theme, toggleTheme } = useTheme();
  const { pageId = "1" } = useParams<{ pageId: string }>();

  const { currentPage, lastPage } = useAppSelector((state: RootState) => state.pagination);
  const [storeValue, setStoreValue] = useLocalSearch("olena_01_search", "");

  const {
    data: characterData,
    error,
    isFetching
  } = useGetCharactersQuery({ name: storeValue, page: currentPage }, { refetchOnFocus: true });

  const { favorites } = useAppSelector((state: RootState) => state.favorites);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/react2025") {
      navigate("/react2025/page/1", { replace: true });
    }
  }, [pageId, location.pathname, navigate]);

  useEffect(() => {
    if (pageId) {
      dispatch(setCurrentPage(pageId));
    }
  }, [pageId, dispatch]);

  useEffect(() => {
    if (characterData) {
      dispatch(setLastPage(characterData.info.pages));
    }
  }, [characterData, dispatch]);

  const updateCurrentPage = (page: string) => {
    dispatch(setCurrentPage(page));
  };

  const updateStoreValue = (value: string) => {
    setStoreValue(value);
  };

  const handleDeselectAll = () => {
    favorites.forEach((item) => dispatch(removeFavorite(item)));
  };

  const viewContainer = useMemo(() => {
    if (isFetching) {
      return (
        <>
          <Loader />;
        </>
      );
    } else if (error) {
      return (
        <div className="error-message">
          Something's gone wrong :-( <ReloadButton />
        </div>
      );
    } else {
      return (
        <>
          <Container results={characterData?.results || []} />
          <Outlet />
        </>
      );
    }
  }, [isFetching, error, characterData]);

  return (
    <>
      <div className={theme === "light" ? "view-app light-view-app" : "view-app dark-view-app"}>
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
          nextPage={characterData?.info.next ? characterData.info.next : ""}
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
        {favorites.length > 0 && (
          <Popup
            itemCount={favorites.length}
            onDeselectAll={handleDeselectAll}
            favorites={favorites}
          />
        )}
      </div>
    </>
  );
};

export default App;

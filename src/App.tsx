import { useState, useEffect, useMemo } from "react";

import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "./store/appHook";
import Popup from "./components/Popup";
import { useTheme } from "./service/useTheme.tsx";
import { useGetCharactersQuery } from "./request/characterApi";

import "./App.css";
import SearchInput from "./components/SearchInput";
import { CardList } from "./containers/CardList";
import useLocalStorage from "./utils/useLocalStorage";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import errorImage from "./assets/error.jpg";
import { useAppDispatch } from "./store/appHook";
import { characterApi } from "./request/characterApi";

const App = () => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { pageId } = useParams<{ pageId: string }>();
  const dispatch = useAppDispatch();

  const [storeValue, setStoreValue] = useLocalStorage("olena_01_search", "");
  const [currentPage, setCurrentPage] = useState<string>(pageId || "1");

  const { data, isLoading, isFetching, error } = useGetCharactersQuery({
    name: storeValue,
    page: currentPage,
  });
  let nextList: string | null;
  let lastList: number | null;
  if (!error) {
    nextList = data?.info.next || null;
    lastList = data?.info.pages || null;
  } else {
    nextList = null;
    lastList = null;
  }

  const updateStoreValue = (value: string) => {
    setStoreValue(value);
  };

  const updateCurrentPage = (page: string) => {
    setCurrentPage(page);
    navigate(`/page/${page}`);
  };

  useEffect(() => {
    const { pathname } = location;

    if (pathname === "/") {
      navigate("/page/1", { replace: true });
      return;
    }

    if (!pageId) return;

    const pageNumber = Number(pageId);
    const isInvalidPage = !Number.isInteger(pageNumber) || pageNumber <= 0;
    if (isInvalidPage) {
      navigate("/error", { replace: true });
    }
  }, [pageId, location, navigate]);

  const viewContainer = useMemo(() => {
    if (isLoading || isFetching) {
      return <Loader />;
    } else if (error) {
      return (
        <div className="error-message">
          Sorry, the name is not found. Try another name
          <div className="error-image-host">
            <img className="error-image" src={errorImage} alt="error" />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <CardList results={data?.results || []} />
          <Outlet />
        </>
      );
    }
  }, [isLoading, isFetching, error, data]);


  const handleRefreshClick = async () => {
    dispatch(characterApi.util.resetApiState());

    dispatch(
      characterApi.endpoints.getCharacters.initiate({
        name: storeValue,
        page: currentPage,
      })
    );
  };

  return (
    <div className="view-app">
      <SearchInput
        searchValue={storeValue}
        currentPage={currentPage}
        updateCurrentPage={updateCurrentPage}
        updateStoreValue={updateStoreValue}
      />
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "🌞 Light"}
      </button>

      <button
        title="Refresh"
        className={`refresh-btn btn ${isFetching ? "loading" : ""}`}
        onClick={handleRefreshClick}
        disabled={isFetching}
      >
        🗘
      </button>

      <Pagination
        currentPage={currentPage}
        updateCurrentPage={updateCurrentPage}
        nextPage={nextList}
        lastPage={lastList}
      />

      <div className="cards-panel">{viewContainer}</div>
      {favorites.length > 0 && <Popup />}
    </div>
  );
};
export default App;

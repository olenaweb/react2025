"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter, usePathname } from "next/navigation";

import { useAppSelector } from "@/store/appHook";
import Popup from "@/components/Popup";
import { useTheme } from "@/utils/useTheme";
import { useGetCharactersQuery } from "@/request/characterApi";

import SearchInput from "@/components/SearchInput";
import { CardList } from "@/components/CardList";
import useLocalStorage from "@/utils/useLocalStorage";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import { useAppDispatch } from "@/store/appHook";
import { characterApi } from "@/request/characterApi";

const AppPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { theme, toggleTheme } = useTheme();
  const { pageId } = useParams<{ pageId: string }>();
  const dispatch = useAppDispatch();

  const [storeValue, setStoreValue] = useLocalStorage("olena_01_search", "");
  const [currentPage, setCurrentPage] = useState<string>(pageId || "1");
  const queryArg = useMemo(
    () => ({ name: storeValue, page: currentPage }),
    [storeValue, currentPage]
  );
  const { data, isLoading, isFetching, error, status } = useGetCharactersQuery(queryArg, {
    refetchOnMountOrArgChange: false,
    skip: !storeValue && !currentPage,
  });
  console.log({ data, error, isLoading, isFetching, status });
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
    router.push(`/page/${page}`);
  };

  useEffect(() => {
    if (pathname === "/") {
      router.push(`/page/1`);
      return;
    }

    if (!pageId) return;

    const pageNumber = Number(pageId);
    const isInvalidPage = !Number.isInteger(pageNumber) || pageNumber <= 0;
    if (isInvalidPage) {
      router.push("/error");
    }
  }, [pageId, router, pathname]);

  const viewContainer = useMemo(() => {
    if (isLoading || isFetching) {
      return <Loader />;
    } else if (error) {
      return (
        <div className="error-message">
          Sorry, the name is not found. Try another name
          <div className="error-image-host">
            <Image
              className={"error-image"}
              src="/error.jpg"
              alt="error"
              width={500}
              height={500}
              priority={true}
            />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <CardList results={data?.results || []} />
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
export default AppPage;

import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
// import { SuccessResponse } from "../types/types";

import { useGetCharactersQuery } from "../request/characterApi";

import ErrorButton from "./ErrorButton";
import rickmorty from "./../assets/rickmorty.jpg";
import "./../App.css";

interface SearchInputProps {
  searchValue: string;
  currentPage?: string;
  // updateRequestData?: (result: SuccessResponse) => void;
  updateStoreValue?: (value: string) => void;
  // updateErrorMessage?: (message: string) => void;
  updateCurrentPage?: (value: string) => void;
}

const SearchInput = ({
  searchValue,
  updateStoreValue,
  // updateRequestData,
  // updateErrorMessage,
  updateCurrentPage,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };
  const { error, refetch } = useGetCharactersQuery({ name: inputValue.trim(), page: "1" });
  const getQuery = () => {
    try {
      // const result = data as SuccessResponse;
      if (error) {
        // updateErrorMessage?.(" Sorry, the name is not found. Try another name");
        updateStoreValue?.("");
      } else {
        updateStoreValue?.(inputValue.trim());
        updateCurrentPage?.("1");
      }
    } catch {
      throw new Error("Something's gone wrong :-( ");
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getQuery();
  };
  const handleButtonClick = () => {
    refetch();
    getQuery();
  };
  return (
    <>
      <div className="search-panel">
        <div className="rick-morty">
          <img className="rick-morty-img" src={rickmorty} alt="Rick and Morty" />
        </div>
        <h1 className="search-title">Rick and Morty</h1>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="search"
            id="searchValue"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter the name"
          />
          <button className="search-button btn" type="submit">
            🔍
          </button>
        </form>
        <div className="search-buttons">
          <button className="btn" onClick={handleButtonClick}>
            Refresh
          </button>
          <ErrorButton />
        </div>
        <div className="search-about-link">
          <Link to={`/about`}>About</Link>
        </div>
      </div>
    </>
  );
};

export default SearchInput;

import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";

import ErrorButton from "./ErrorButton";
import rickmorty from "./../assets/rickmorty.jpg";
import "./../App.css";

interface SearchInputProps {
  searchValue: string;
  currentPage?: string;
  updateStoreValue?: (value: string) => void;
  updateCurrentPage?: (value: string) => void;
}

const SearchInput = ({ searchValue, updateStoreValue, updateCurrentPage }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);
  const [submitValue, setSubmitValue] = useState<string>(searchValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputValue(e.target.value.trim());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitValue(inputValue);
    updateStoreValue?.(submitValue);
    updateCurrentPage?.("1");
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

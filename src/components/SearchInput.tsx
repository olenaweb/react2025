import Link from "next/link";
import { useState, FormEvent } from "react";
import Image from "next/image";

interface SearchInputProps {
  searchValue: string;
  currentPage?: string;
  updateStoreValue?: (value: string) => void;
  updateCurrentPage?: (value: string) => void;
}

const SearchInput = ({ searchValue, updateStoreValue, updateCurrentPage }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateStoreValue?.(inputValue.trim());
    updateCurrentPage?.("1");
  };

  return (
    <>
      <div className="search-panel">
        <div className="rick-morty">
          <Image
            src="/rickmorty.jpg"
            alt="rickmorty"
            width={150}
            height={150}
            priority={true}
          />
        </div>
        <h1 className="search-title">Rick and Morty</h1>
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="searchValue" className="search-label">
            Search
          </label>
          <input
            className="search-input"
            type="search"
            id="searchValue"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter the name"
          />
          <button className="search-button btn" type="submit" aria-label="Search">
            🔍
          </button>
        </form>

        <div className="search-about-link">
          <Link href={`/about`}>About</Link>
        </div>
      </div>
    </>
  );
};

export default SearchInput;

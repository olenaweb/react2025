import React, { useState, ChangeEvent, FormEvent } from "react";
import { getData } from "../request/getData";
import { Response } from "../types/types";

interface SearchInputProps {
  searchValue: string;
  updateRequestData?: (result: Response) => void;
  updateStoreValue?: (value: string) => void;
  updateErrorMessage?: (message: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  updateRequestData,
  updateStoreValue,
  updateErrorMessage,
}) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await getData(inputValue.trim());
      console.log('"result="', result);

      if ("error" in result) {
        if (updateStoreValue && updateRequestData && updateErrorMessage) {
          updateErrorMessage(result.error + ". Sorry, the name is not found. Try another name");
          updateStoreValue("");
        }
      } else {
        localStorage.setItem("olena_01_search", inputValue.trim());
        if (updateStoreValue && updateRequestData && updateErrorMessage) {
          updateErrorMessage("");
          updateRequestData(result);
          updateStoreValue(inputValue.trim());
        }
      }
    } catch {
      throw new Error("Something's gone wrong :-( ");
    }
  };

  return (
    <>
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
    </>
  );
};

export default SearchInput;

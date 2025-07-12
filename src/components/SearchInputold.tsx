import { Component, ChangeEvent, FormEvent, createRef, RefObject } from "react";

import { getData } from "../request/getData";
import { Response } from "../types/types";

interface SearchInputProps {
  searchValue: string;
  updateRequestData?: (result: Response) => void;
  updateStoreValue?: (value: string) => void;
  updateErrorMessage?: (message: string) => void;
  updateBeginLoad?: (beginLoad: boolean) => void;
}

interface SearchInputState {
  searchValue: string;
}

export default class SearchInput extends Component<SearchInputProps, SearchInputState> {
  private input: RefObject<HTMLInputElement>;

  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      searchValue: props.searchValue,
    };
    this.input = createRef<HTMLInputElement>();
  }

  componentDidMount() {
    if (this.input.current) {
      this.input.current.focus();
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { updateBeginLoad, updateRequestData, updateStoreValue, updateErrorMessage } = this.props;

    const searhName = this.state.searchValue.trim();

    try {
      updateBeginLoad?.(true);

      const result = await getData(searhName);
      localStorage.setItem("olena_01_search", searhName);

      if ("error" in result) {
        console.error("Error fetching data:", result.error);
        updateStoreValue?.("");
        updateErrorMessage?.("*** Sorry, the name is not found. Try another name");
        updateBeginLoad?.(false);
      } else {
        updateStoreValue?.(searhName);
        updateRequestData?.(result);
        updateErrorMessage?.("");
        updateBeginLoad?.(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      updateErrorMessage?.("Something's gone wrong :-(");
      updateBeginLoad?.(false);
    }
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          className="search-input"
          type="search"
          id="searchValue"
          value={this.state.searchValue}
          onChange={this.handleChange}
          placeholder="Enter the name"
          ref={this.input}
        />
        <button className="search-button btn" type="submit">
          🔍
        </button>
      </form>
    );
  }
}

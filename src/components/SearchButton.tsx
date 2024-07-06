import { Component, ChangeEvent, FormEvent } from "react";
import { SearchState } from "../types/types";
import { getData } from "../request/getData";

import "./components.css";

interface SearchInputProps {
  searchValue: string;
  updateRequestData: (result: Response) => void;
}

export default class SearchInput extends Component<SearchInputProps, SearchState> {
  state: SearchState = {
    searchValue: "",
  };
  constructor(props: SearchInputProps) {
    super(props);

    this.state = {
      searchValue: props.searchValue,
    };
    console.log('"this.state.searchValue="', this.state.searchValue);
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: e.target.value });

    console.log('"handleChange this.state.searchValue="', this.state.searchValue);
    console.log('"this="', this);
    console.log('"e.target="', e.target);
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await getData(this.state.searchValue);
    this.props.updateRequestData(result);
    console.log('"result="', result);
  };

  render() {
    return (
      <>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-input"
            type="search"
            id="searchValue"
            value={this.state.searchValue}
            onChange={this.handleChange}
            placeholder="Enter the name"
          />
          <button className="search-button btn" type="submit">
            🔍
          </button>
        </form>
      </>
    );
  }
}

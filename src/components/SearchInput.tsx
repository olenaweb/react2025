import { Component, ChangeEvent, FormEvent } from "react";
import { createRef, RefObject } from "react";

import { getData } from "../request/getData";
import { Response } from "../types/types";

interface SearchInputProps {
  searchValue: string;
  updateRequestData?: (result: Response) => void;
  updateStoreValue?: (value: string) => void;
  updateErrorMessage?: (message: string) => void;
  updateBeginLoad?: (beginLoad: boolean) => void;
}

export default class SearchInput extends Component<SearchInputProps> {
  state: SearchInputProps = {
    searchValue: "",
  };
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
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (this.props.updateBeginLoad) {
        this.props.updateBeginLoad(true);
      }
      const result = await getData(this.state.searchValue.trim());

      if ("error" in result) {
        console.error("Error fetching data:", result.error);

        if (
          this.props.updateStoreValue &&
          this.props.updateRequestData &&
          this.props.updateErrorMessage &&
          this.props.updateBeginLoad
        ) {
          this.props.updateStoreValue("");
          this.props.updateErrorMessage("*** Sorry, the name is not found. Try another name");
          this.props.updateBeginLoad(false);
          localStorage.removeItem("olena_01_search");
        }
      } else {
        localStorage.setItem("olena_01_search", this.state.searchValue.trim());
        if (
          this.props.updateStoreValue &&
          this.props.updateRequestData &&
          this.props.updateErrorMessage &&
          this.props.updateBeginLoad
        ) {
          this.props.updateStoreValue(this.state.searchValue.trim());
          this.props.updateRequestData(result);
          this.props.updateErrorMessage("");
          this.props.updateBeginLoad(false);
        }
      }
    } catch {
      throw new Error("Something's gone wrong :-( ");
    }
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
            ref={this.input}
          />
          <button className="search-button btn" type="submit">
            🔍
          </button>
        </form>
      </>
    );
  }
}

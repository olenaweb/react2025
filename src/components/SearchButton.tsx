import { Component, ChangeEvent, FormEvent } from "react";
import { getData } from "../request/getData";

interface SearchInputProps {
  searchValue: string;
  updateRequestData?: (result: Response) => void;
  updateStoreValue?: (value: string) => void;
}

export default class SearchInput extends Component<SearchInputProps> {
  state: SearchInputProps = {
    searchValue: "",
  };
  constructor(props: SearchInputProps) {
    super(props);

    this.state = {
      searchValue: props.searchValue,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await getData(this.state.searchValue.trim());
    console.log('"result="', result);
    if (this.props.updateRequestData && this.props.updateStoreValue) {
      this.props.updateRequestData(result);
      this.props.updateStoreValue(this.state.searchValue.trim());
    }
    if (result) {
      localStorage.setItem("olena_01_search", this.state.searchValue.trim());
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
          />
          <button className="search-button btn" type="submit">
            🔍
          </button>
        </form>
      </>
    );
  }
}

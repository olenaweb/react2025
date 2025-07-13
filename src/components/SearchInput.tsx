import { Component, ChangeEvent, FormEvent, createRef, RefObject } from "react";

interface SearchInputProps {
  searchValue: string;
  fetchData?: (searchName: string) => void;
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
    this.input.current?.focus();
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fetchData } = this.props;
    const searchName = this.state.searchValue.trim();
    fetchData?.(searchName);
    this.input.current?.focus();
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
          autoComplete="off"
          ref={this.input}
        />
        <button className="search-button btn" type="submit">
          🔍
        </button>
      </form>
    );
  }
}

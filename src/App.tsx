// import { useState } from "react";
import { Component } from "react";
import { StateAppPage } from "./types/types";
import "./App.css";
import SearchInput from "./components/SearchButton";
import { getData } from "./request/getData";
import { CardsList } from "./containers/Container";

class App extends Component<StateAppPage> {
  state: StateAppPage = {
    storeValue: "",
    isLoading: false,
    requestData: {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    },
  };

  constructor(props: StateAppPage) {
    super(props);
    const localStore: string | null = localStorage.getItem("olena_01_search");
    this.state = {
      storeValue: localStore || "",
      isLoading: false,
      requestData: {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      },
    };
  }

  updateStoreValue = (value: string) => {
    this.setState({ storeValue: value });
  };

  updateRequestData = (result: Response) => {
    this.setState({ requestData: result });
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const resultData: Response = await getData(this.state.storeValue);
      this.setState({ requestData: resultData, isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ isLoading: false });
    }
  }
  render() {
    return (
      <>
        <div className="search-panel">
          <h2>Rick and Morty</h2>
          <SearchInput
            searchValue={this.state.storeValue ? this.state.storeValue : ""}
            updateRequestData={this.updateRequestData}
            updateStoreValue={this.updateStoreValue}
          />
        </div>

        <div className="cards-panel">
          {this.state.isLoading ? (
            <p>Loading...</p>
          ) : (
            <CardsList results={this.state.requestData.results} />
          )}
        </div>
      </>
    );
  }
}

export default App;

// import { useState } from "react";
import { Component } from "react";
import { StateAppPage } from "./types/types";
import "./App.css";
import SearchInput from "./components/SearchButton";

class App extends Component<StateAppPage> {
  state: StateAppPage = { defaultValue: "", isLoading: false };

  render() {
    return (
      <>
        <div className="search-panel">
          <h2>Rick and Morty</h2>
          <SearchInput searchValue={""} />
        </div>

        <div className="cards-panel"></div>
      </>
    );
  }
}

export default App;

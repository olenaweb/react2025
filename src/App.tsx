import { Component } from "react";
import { StateAppPage, Response } from "./types/types";
import "./App.css";
import rickmorty from "./assets/rickmorty.jpg";
import SearchInput from "./components/SearchInput";
import { getData } from "./request/getData";
import { Container } from "./containers/Container";
import { ErrorButton } from "./components/ErrorButton";
import { Loader } from "./components/Loader";
import { ErrorFetch } from "./components/ErrorFetch";

class App extends Component<object, StateAppPage> {
  constructor(props: object) {
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
      errorMessage: "",
    };
  }

  fetchData = async (searchName: string) => {
    this.setState({ isLoading: true });
    try {
      const resultData: Response = await getData(searchName);
      if ("error" in resultData) {
        this.setState({
          isLoading: false,
          requestData: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
          errorMessage: "**** Sorry, the name is not found. Try another name",
        });
      } else {
        this.setState({
          isLoading: false,
          requestData: resultData,
          errorMessage: "",
        });
        localStorage.setItem("olena_01_search", searchName);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({
        isLoading: false,
        requestData: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
        errorMessage: "Something's gone wrong :-( ",
      });
    }
  };

  async componentDidMount() {
    await this.fetchData(this.state.storeValue);
  }

  render() {
    const yearTemplate = <p className="bold">RS School 2025</p>;
    const cardPanel = () => {
      if (this.state.isLoading) {
        return <Loader />;
      }
      if (this.state.errorMessage !== "") {
        return (
          <div className="error-title">
            <h2> {this.state.errorMessage}</h2>
            <ErrorFetch />
          </div>
        );
      }
      return <Container results={this.state.requestData.results} />;
    };

    return (
      <>
        <div className="search-panel">
          <div className="rick-morty">
            <img className="rick-morty-img" src={rickmorty} alt="RickandMorty" />
          </div>
          <h2 className="search-title">Rick and Morty</h2>
          <SearchInput
            searchValue={this.state.storeValue ? this.state.storeValue : ""}
            fetchData={this.fetchData}
          />
          <ErrorButton />
        </div>
        <div className="cards-panel">{cardPanel()}</div>
        {yearTemplate}
      </>
    );
  }
}

export default App;

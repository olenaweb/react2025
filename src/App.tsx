import { Component } from 'react';
import { StateAppPage, Response } from './types/types';
import './App.css';
import SearchInput from './components/SearchInput';
import { getData } from './request/getData';
import { Container } from './containers/Container';
import { ErrorButton } from './components/ErrorButton';
import rickmorty from './assets/rickmorty.jpg';
import Loader from './components/Loader';
import { ErrorFetch } from './components/ErrorFetch';

class App extends Component<object, StateAppPage> {
  state: StateAppPage = {
    storeValue: '',
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
    errorMessage: '',
  };

  constructor(props: object) {
    super(props);
    const localStore: string | null = localStorage.getItem('olena_01_search');
    this.state = {
      storeValue: localStore || '',
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
      errorMessage: '',
    };
  }

  updateStoreValue = (value: string) => {
    this.setState({ storeValue: value });
  };

  updateRequestData = (result: Response) => {
    if ('error' in result) {
      this.setState({
        errorMessage: result.error,
        requestData: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
        isLoading: false,
      });
    } else {
      this.setState({
        errorMessage: '',
        requestData: result,
        isLoading: false,
      });
    }
  };

  updateErrorMessage = (message: string) => {
    this.setState({ errorMessage: message });
  };

  updateBeginLoad = (beginLoad: boolean) => {
    this.setState({ isLoading: beginLoad });
  };

  fetchData = async () => {
    this.setState({ isLoading: true });
    try {
      const resultData: Response = await getData(this.state.storeValue);
      if ('error' in resultData) {
        this.setState({
          isLoading: false,
          errorMessage: '**** Sorry, the name is not found. Try another name',
          requestData: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
        });
        console.error('Error fetching data:', resultData.error);
      } else {
        this.setState({
          isLoading: false,
          errorMessage: '',
          requestData: resultData,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({
        isLoading: false,
        errorMessage: "Something's gone wrong :-( ",
        requestData: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
      });
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const yearTemplate = <p className="bold">RS School 2025</p>;

    const cardPanel = () => {
      if (this.state.isLoading) {
        return <Loader />;
      }
      if (this.state.errorMessage !== '') {
        return (
          <div className="error-title">
            <h2> {this.state.errorMessage}</h2>
            <ErrorFetch />
          </div>
        );
      }
      return (
        <>
          <Container results={this.state.requestData.results} />
          <ErrorButton />
        </>
      );
    };

    return (
      <>
        <div className="search-panel">
          <div className="rick-morty">
            <img className="rick-morty-img" src={rickmorty} alt="RickandMorty" />
          </div>
          <h2 className="search-title">Rick and Morty</h2>
          <SearchInput
            searchValue={this.state.storeValue ? this.state.storeValue : ''}
            updateRequestData={this.updateRequestData}
            updateStoreValue={this.updateStoreValue}
            updateErrorMessage={this.updateErrorMessage}
            updateBeginLoad={this.updateBeginLoad}
          />
        </div>
        <div className="cards-panel">{cardPanel()}</div>
        {yearTemplate}
      </>
    );
  }
}

export default App;

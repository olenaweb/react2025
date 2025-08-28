import "./index.css";
import "./app.css";
import { useState, useEffect, useMemo } from "react";
import Modal from "@/components/form/modal";

import SearchForm from "@/components/form/search-form";
import ReadMore from "@/components/form/read-more";
import Loader from "@/components/loader/loader";
import DataTable from "@/components/table/DataTable";

import ReloadButton from "@/components/buttons/BackButton";

import { getCountryData } from "@/request/get-country-data";
import { Response } from "@/type/type";
import { CountryData } from "@/type/type";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [requestData, setRequestData] = useState<CountryData[]>([
    {
      id: 0,
      country: "",
      iso_code: "",
      data: [],
    },
  ]);
  const [currYear, setCurrentYear] = useState<number>(2023);
  const [currCountry, setCurrentCountry] = useState<string>("");

  const updateCounty = (country: string) => {
    setCurrentCountry(country);
  };

  const updateYear = (year: number) => {
    setCurrentYear(year);
  };

  // const controlFormHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setIsOpen(true);
  //   console.log('"isOpen="', isOpen);
  // };

  const doCloseHandle = () => {
    setIsOpen(false);
    console.log('"isOpen="', isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resultData: Response = await getCountryData(currYear, currCountry);
        if ("error" in resultData) {
          setErrorMessage("Sorry, the name is not found. Try another name");
          setRequestData([
            {
              id: 0,
              country: "",
              iso_code: "",
              data: [],
            },
          ]);
        } else {
          setRequestData(resultData);
          console.log('"resultData="', resultData);
          setErrorMessage("");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Something's gone wrong :-( ");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currYear, currCountry]);

  const viewContainer = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    } else if (errorMessage !== "") {
      return (
        <div className="error-message">
          {errorMessage} <ReloadButton />
        </div>
      );
    } else {
      return <DataTable data={requestData} />;
    }
  }, [isLoading, errorMessage, requestData]);

  return (
    <div className="view-app">
      <div className="search-block">
        <SearchForm updateCountry={updateCounty} updateYear={updateYear} />
      </div>
      <div className="view-body">{viewContainer}</div>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={doCloseHandle}>
          <ReadMore onClose={doCloseHandle} />
        </Modal>
      )}
    </div>
  );
};

export default App;

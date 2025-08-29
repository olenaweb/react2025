import "./index.css";
import "./app.css";
import { useState, useEffect } from "react";
import React, { Suspense } from "react";

const DataTable = React.lazy(() => import("@/components/table/DataTable"));
import SearchForm from "@/components/form/search-form";
import Loader from "@/components/loader/loader";

import { getCountryData } from "@/request/get-country-data";
import { Response } from "@/type/type";
import { CountryData } from "@/type/type";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [requestData, setRequestData] = useState<CountryData[]>([]);
  const [filteredRequestData, setFilteredRequestData] = useState<CountryData[]>(requestData);
  const [currYear, setCurrentYear] = useState<number>(2023);
  const [currCountry, setCurrentCountry] = useState<string>("");

  const updateCounty = (country: string) => {
    setCurrentCountry(country);
  };

  const updateYear = (year: number) => {
    setCurrentYear(year);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resultData: Response = await getCountryData();
        if ("error" in resultData) {
          setErrorMessage("Sorry, the name is not found. Try another name");
          setRequestData([]);
        } else {
          setRequestData(resultData);
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
  }, []);

  useEffect(() => {
    if (requestData.length > 0 && requestData[0].country !== "") {
      setIsLoading(true);
      const filtered = requestData
        .filter((item) => {
          const matchesCountry = currCountry ? item.country === currCountry : true;
          return matchesCountry;
        })
        .map((item) => ({
          ...item,
          data: item.data.filter((d) => d.year === currYear),
        }))
        .filter((item) => item.data.length > 0);

      setFilteredRequestData(filtered);
      setIsLoading(false);
    }
  }, [requestData, currYear, currCountry]);

  return (
    <div className="view-app">
      <SearchForm updateCountry={updateCounty} updateYear={updateYear} />
      <Suspense fallback={<Loader />}>
        {isLoading ? (
          <Loader />
        ) : filteredRequestData.length > 0 ? (
          <DataTable data={filteredRequestData} />
        ) : !errorMessage && requestData.length > 0 ? (
          <div className="no-data">No data found for the selected criteria.</div>
        ) : !errorMessage ? (
          <div className="no-data">No data available. Loading...</div>
        ) : null}
      </Suspense>
    </div>
  );
};

export default App;

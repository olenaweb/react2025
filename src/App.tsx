import "./index.css";
import "./app.css";
import { useState, useCallback } from "react";
import React, { Suspense } from "react";

const DataTable = React.lazy(() => import("@/components/table/DataTable"));
import SearchForm from "@/components/form/search-form";
import Loader from "@/components/loader/loader";

const App: React.FC = () => {
  const [currYear, setCurrentYear] = useState<number>(2023);
  const [currCountry, setCurrentCountry] = useState<string>("");

  const updateCounty = useCallback((country: string) => {
    setCurrentCountry(country);
  }, []);

  const updateYear = useCallback((year: number) => {
    setCurrentYear(year);
  }, []);

  return (
    <div className="view-app">
      <SearchForm updateCountry={updateCounty} updateYear={updateYear} />
      <Suspense fallback={<Loader />}>
        <DataTable year={currYear} country={currCountry} />
      </Suspense>
    </div>
  );
};

export default App;

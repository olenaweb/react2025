import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";

import { CountryData, Response } from "@/type/type";
import "./dataTable.css";
import { FormData } from "@/type/type";
import Loader from "@/components/loader/loader";

import { useAppSelector } from "@/app/appHook";
import { getCountryData } from "@/request/get-country-data";
import './dataTable.css';

interface DataTableProps {
  year: number;
  country: string;
}

const DataTable = memo(function MemoDataTable({ year, country }: DataTableProps) {
  const [sortCountry, setSortCountry] = useState<string>("asc");
  const [sortPopulation, setSortPopulation] = useState<string>("asc");

  const [allData, setAllData] = useState<CountryData[]>([]);
  const [sortedData, setSortedData] = useState<CountryData[]>([]);
  const previousDataRef = useRef<CountryData[]>([]);
  const previousYearRef = useRef<number | null>(null);

  const [highlightedRows, setHighlightedRows] = useState<Set<number>>(new Set());

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const informData = useAppSelector((state) => state.inform.data);

  const selectedColumns = useMemo(() => {
    const formData = informData as FormData;
    return {
      co2_per_gdp: formData.co2_per_gdp,
      gdp: formData.gdp,
      ghg_per_capita: formData.ghg_per_capita,
      cumulative_co2: formData.cumulative_co2,
      co2_growth_prct: formData.co2_growth_prct,
      methane: formData.methane,
      methane_per_capita: formData.methane_per_capita,
      nitrous_oxide: formData.nitrous_oxide,
      nitrous_oxide_per_capita: formData.nitrous_oxide_per_capita,
      total_ghg: formData.total_ghg,
    };
  }, [informData]);

  const filteredData = useMemo(() => {
    if (allData.length === 0) return [];

    return allData
      .filter((item) => {
        const matchesCountry = country ? item.country === country : true;
        return matchesCountry;
      })
      .map((item) => ({
        ...item,
        data: item.data.filter((d) => d.year === year),
      }))
      .filter((item) => item.data.length > 0);
  }, [allData, year, country]);

  useEffect(() => {
    setSortedData(filteredData);
  }, [filteredData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resultData: Response = await getCountryData();
        if ("error" in resultData) {
          setErrorMessage(resultData.error + " 404 (Please try again later)");
          setAllData([]);
          setIsInitialLoad(false);
        } else {
          setErrorMessage("");
          setAllData(resultData);
          setIsInitialLoad(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Something's gone wrong :-( ");
        setIsInitialLoad(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const changedRowIds = useMemo(() => {
    const previousData = previousDataRef.current;
    const previousYear = previousYearRef.current;

    if (previousYear === null || previousData.length === 0) {
      return new Set<number>();
    }

    if (previousYear === year) {
      return new Set<number>();
    }

    const changedIds = new Set<number>();

    sortedData.forEach((item) => {
      const prevItem = previousData.find((prev) => prev.country === item.country);
      if (prevItem) {
        const currentData = item.data.length > 0 ? item.data[0] : null;
        const prevDataItem = prevItem.data.length > 0 ? prevItem.data[0] : null;

        if (currentData && prevDataItem) {
          const hasChanges =
            currentData.year !== prevDataItem.year ||
            currentData.population !== prevDataItem.population ||
            currentData.co2 !== prevDataItem.co2 ||
            currentData.co2_per_capita !== prevDataItem.co2_per_capita ||
            currentData.co2_per_gdp !== prevDataItem.co2_per_gdp ||
            currentData.gdp !== prevDataItem.gdp ||
            currentData.ghg_per_capita !== prevDataItem.ghg_per_capita ||
            currentData.cumulative_co2 !== prevDataItem.cumulative_co2 ||
            currentData.co2_growth_prct !== prevDataItem.co2_growth_prct ||
            currentData.methane !== prevDataItem.methane ||
            currentData.methane_per_capita !== prevDataItem.methane_per_capita ||
            currentData.nitrous_oxide !== prevDataItem.nitrous_oxide ||
            currentData.nitrous_oxide_per_capita !== prevDataItem.nitrous_oxide_per_capita ||
            currentData.total_ghg !== prevDataItem.total_ghg;

          if (hasChanges) {
            changedIds.add(item.id);
          }
        } else if (currentData !== prevDataItem) {
          changedIds.add(item.id);
        }
      }
    });

    return changedIds;
  }, [year, sortedData]);

  useEffect(() => {
    if (changedRowIds.size > 0) {
      setHighlightedRows(changedRowIds);

      const timer = setTimeout(() => {
        setHighlightedRows(new Set());
        previousDataRef.current = [...sortedData];
        previousYearRef.current = year;
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      if (sortedData.length > 0 && previousYearRef.current === null) {
        previousDataRef.current = [...sortedData];
        previousYearRef.current = year;
      }
    }
  }, [changedRowIds, sortedData, year]);

  const handleSortByCountry = useCallback(() => {
    const newSortOrder = sortCountry === "asc" ? "desc" : "asc";

    const sorted = [...sortedData].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.country.localeCompare(b.country);
      } else {
        return b.country.localeCompare(a.country);
      }
    });
    setSortCountry(newSortOrder);
    setSortedData(sorted);
  }, [sortCountry, sortedData]);

  const handleSortByPopulation = useCallback(() => {
    const newSortOrder = sortPopulation === "asc" ? "desc" : "asc";

    const sorted = [...sortedData].sort((a, b) => {
      const popA = a.data.length > 0 ? a.data[0].population : 0;
      const popB = b.data.length > 0 ? b.data[0].population : 0;
      if (newSortOrder === "asc") {
        return (popA || 0) - (popB || 0);
      } else {
        return (popB || 0) - (popA || 0);
      }
    });
    setSortPopulation(newSortOrder);
    setSortedData(sorted);
  }, [sortPopulation, sortedData]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage && !isInitialLoad) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (sortedData.length === 0 && allData.length > 0 && isInitialLoad) {
    return <div className="no-data">No data found for the selected criteria.</div>;
  }
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th className="sortable">
              <button className="datatable-sorter" onClick={handleSortByCountry}>
                <span>Country</span>
                <span>{sortCountry === "asc" ? "▲" : "▼"}</span>
              </button>
            </th>
            <th>ISO Code</th>
            <th>Year</th>
            <th className="sortable">
              <button className="datatable-sorter" onClick={handleSortByPopulation}>
                <span>Population</span>
                <span>{sortPopulation === "asc" ? "▲" : "▼"}</span>
              </button>
            </th>
            <th>CO2</th>
            <th>CO2 per capita</th>
            {selectedColumns.co2_per_gdp && <th>CO2 per GDP</th>}
            {selectedColumns.gdp && <th>GDP</th>}
            {selectedColumns.ghg_per_capita && <th>GHG per capita</th>}
            {selectedColumns.cumulative_co2 && <th>Cumulative CO2</th>}
            {selectedColumns.co2_growth_prct && <th>CO2 Growth %</th>}
            {selectedColumns.methane && <th>Methane</th>}
            {selectedColumns.methane_per_capita && <th>Methane per capita</th>}
            {selectedColumns.nitrous_oxide && <th>Nitrous Oxide</th>}
            {selectedColumns.nitrous_oxide_per_capita && <th>Nitrous Oxide per capita</th>}
            {selectedColumns.total_ghg && <th>Total GHG</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.country}</td>
              <td>{item.iso_code || "N/A"}</td>
              <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                {item.data.length > 0 ? item.data[0].year : "N/A"}
              </td>
              <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                {item.data.length > 0 && item.data[0].population !== undefined
                  ? item.data[0].population?.toLocaleString()
                  : "N/A"}
              </td>
              <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                {item.data.length > 0 && item.data[0].co2 !== undefined
                  ? item.data[0].co2.toFixed(2)
                  : "N/A"}
              </td>
              <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                {item.data.length > 0 && item.data[0].co2_per_capita !== undefined
                  ? item.data[0].co2_per_capita.toFixed(2)
                  : "N/A"}
              </td>
              {selectedColumns.co2_per_gdp && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].co2_per_gdp !== undefined
                    ? item.data[0].co2_per_gdp.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {selectedColumns.gdp && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].gdp !== undefined
                    ? item.data[0].gdp.toLocaleString()
                    : "N/A"}
                </td>
              )}
              {selectedColumns.ghg_per_capita && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].ghg_per_capita !== undefined
                    ? item.data[0].ghg_per_capita.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {selectedColumns.cumulative_co2 && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].cumulative_co2 !== undefined
                    ? item.data[0].cumulative_co2.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {selectedColumns.co2_growth_prct && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].co2_growth_prct !== undefined
                    ? item.data[0].co2_growth_prct.toFixed(2) + "%"
                    : "N/A"}
                </td>
              )}
              {selectedColumns.methane && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].methane !== undefined
                    ? item.data[0].methane.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {selectedColumns.methane_per_capita && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].methane_per_capita !== undefined
                    ? item.data[0].methane_per_capita.toFixed(4)
                    : "N/A"}
                </td>
              )}
              {selectedColumns.nitrous_oxide && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].nitrous_oxide !== undefined
                    ? item.data[0].nitrous_oxide.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {selectedColumns.nitrous_oxide_per_capita && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].nitrous_oxide_per_capita !== undefined
                    ? item.data[0].nitrous_oxide_per_capita.toFixed(4)
                    : "N/A"}
                </td>
              )}
              {selectedColumns.total_ghg && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].total_ghg !== undefined
                    ? item.data[0].total_ghg.toFixed(2)
                    : "N/A"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default DataTable;

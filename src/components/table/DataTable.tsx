import React from "react";
import { useState, useEffect, useRef } from "react";

import { CountryData } from "@/type/type";
import "./dataTable.css";
import { FormData } from "@/type/type";
import { useAppSelector } from "@/app/appHook";

interface DataTableProps {
  data: CountryData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortCountry, setSortCountry] = useState<string>("asc");
  const [sortPopulation, setSortPopulation] = useState<string>("asc");
  const [sortedData, setSortedData] = useState<CountryData[]>(data);
  const [highlightedRows, setHighlightedRows] = useState<Set<number>>(new Set());
  const previousDataRef = useRef<CountryData[]>([]);
  const informData = useAppSelector((state) => state.inform.data);
  const {
    population_growth_prct,
    gdp,
    cement_co2,
    co2_growth_abs,
    co2_growth_prct,
    methane,
    methane_per_capita,
    nitrous_oxide,
    nitrous_oxide_per_capita,
    temperature_change_anomaly,
  } = informData as FormData;

  useEffect(() => {
    const previousData = previousDataRef.current;

    if (previousData.length > 0) {
      const changedRowIds = new Set<number>();

      data.forEach((item) => {
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
              currentData.population_growth_prct !== prevDataItem.population_growth_prct ||
              currentData.gdp !== prevDataItem.gdp ||
              currentData.cement_co2 !== prevDataItem.cement_co2 ||
              currentData.co2_growth_abs !== prevDataItem.co2_growth_abs ||
              currentData.co2_growth_prct !== prevDataItem.co2_growth_prct ||
              currentData.methane !== prevDataItem.methane ||
              currentData.methane_per_capita !== prevDataItem.methane_per_capita ||
              currentData.nitrous_oxide !== prevDataItem.nitrous_oxide ||
              currentData.nitrous_oxide_per_capita !== prevDataItem.nitrous_oxide_per_capita ||
              currentData.temperature_change_anomaly !== prevDataItem.temperature_change_anomaly;

            if (hasChanges) {
              changedRowIds.add(item.id);
            }
          } else if (currentData !== prevDataItem) {
            changedRowIds.add(item.id);
          }
        }
      });

      if (changedRowIds.size > 0) {
        setHighlightedRows(changedRowIds);

        setTimeout(() => {
          setHighlightedRows(new Set());
        }, 5000);
      }
    }

    setSortedData(data);
    previousDataRef.current = [...data];
  }, [data]);

  const handleSortByCountry = () => {
    const sorted = [...sortedData].sort((a, b) => {
      if (sortCountry === "asc") {
        return a.country.localeCompare(b.country);
      } else {
        return b.country.localeCompare(a.country);
      }
    });
    setSortCountry(sortCountry === "asc" ? "desc" : "asc");
    setSortedData(sorted);
  };

  const handleSortByPopulation = () => {
    const sorted = [...sortedData].sort((a, b) => {
      const popA = a.data.length > 0 ? a.data[0].population : 0;
      const popB = b.data.length > 0 ? b.data[0].population : 0;
      if (sortPopulation === "asc") {
        return (popA || 0) - (popB || 0);
      } else {
        return (popB || 0) - (popA || 0);
      }
    });
    setSortPopulation(sortPopulation === "asc" ? "desc" : "asc");
    setSortedData(sorted);
  };
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
            {population_growth_prct && <th>Population Growth %</th>}
            {gdp && <th>GDP</th>}
            {cement_co2 && <th>Cement CO2</th>}
            {co2_growth_abs && <th>CO2 Growth Abs</th>}
            {co2_growth_prct && <th>CO2 Growth %</th>}
            {methane && <th>Methane</th>}
            {methane_per_capita && <th>Methane per capita</th>}
            {nitrous_oxide && <th>Nitrous Oxide</th>}
            {nitrous_oxide_per_capita && <th>Nitrous Oxide per capita</th>}
            {temperature_change_anomaly && <th>Temperature Change Anomaly</th>}
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
                {item.data.length > 0 ? item.data[0].population?.toLocaleString() : "N/A"}
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
              {population_growth_prct && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].population_growth_prct !== undefined
                    ? item.data[0].population_growth_prct.toFixed(2) + "%"
                    : "N/A"}
                </td>
              )}
              {gdp && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].gdp !== undefined
                    ? item.data[0].gdp.toLocaleString()
                    : "N/A"}
                </td>
              )}
              {cement_co2 && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].cement_co2 !== undefined
                    ? item.data[0].cement_co2.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {co2_growth_abs && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].co2_growth_abs !== undefined
                    ? item.data[0].co2_growth_abs.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {co2_growth_prct && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].co2_growth_prct !== undefined
                    ? item.data[0].co2_growth_prct.toFixed(2) + "%"
                    : "N/A"}
                </td>
              )}
              {methane && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].methane !== undefined
                    ? item.data[0].methane.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {methane_per_capita && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].methane_per_capita !== undefined
                    ? item.data[0].methane_per_capita.toFixed(4)
                    : "N/A"}
                </td>
              )}
              {nitrous_oxide && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].nitrous_oxide !== undefined
                    ? item.data[0].nitrous_oxide.toFixed(2)
                    : "N/A"}
                </td>
              )}
              {nitrous_oxide_per_capita && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].nitrous_oxide_per_capita !== undefined
                    ? item.data[0].nitrous_oxide_per_capita.toFixed(4)
                    : "N/A"}
                </td>
              )}
              {temperature_change_anomaly && (
                <td className={highlightedRows.has(item.id) ? "highlighted-cell" : ""}>
                  {item.data.length > 0 && item.data[0].temperature_change_anomaly !== undefined
                    ? item.data[0].temperature_change_anomaly.toFixed(2) + "°C"
                    : "N/A"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

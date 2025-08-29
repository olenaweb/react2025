import React from "react";
import { useState } from "react";

import { CountryData } from "@/type/type";
import "./dataTable.css";

interface DataTableProps {
  data: CountryData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortCountry, setSortCountry] = useState<string>("asc");
  const [sortPopulation, setSortPopulation] = useState<string>("asc");
  const [sortedData, setSortedData] = useState<CountryData[]>(data);

  const handleSortByCountry = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortCountry === "asc") {
        return a.country.localeCompare(b.country);
      } else {
        return b.country.localeCompare(a.country);
      }
    });
    setSortCountry(sortCountry === "asc" ? "desc" : "asc");
    setSortedData(sortedData);
  };
  const handleSortByPopulation = () => {
    const sortedData = [...data].sort((a, b) => {
      const popA = a.data.length > 0 ? a.data[0].population : 0;
      const popB = b.data.length > 0 ? b.data[0].population : 0;
      if (sortPopulation === "asc") {
        return (popA || 0) - (popB || 0);
      } else {
        return (popB || 0) - (popA || 0);
      }
    });
    setSortPopulation(sortPopulation === "asc" ? "desc" : "asc");
    setSortedData(sortedData);
  };
  return (
    <div className="data-table-container">
      <h2>CO2 emissions by country</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <button className="datatable-sorter" onClick={handleSortByCountry}>
                <span>Country</span><span>{sortCountry === "asc" ? "▲" : "▼"}</span>
              </button>
            </th>
            <th>ISO Code</th>
            <th>Year</th>
            <th>
              <button className="datatable-sorter" onClick={handleSortByPopulation}>
                <span>Population</span><span>{sortPopulation === "asc" ? "▲" : "▼"}</span>
              </button>
            </th>
            <th>CO2</th>
            <th>CO2 per capita</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.country}</td>
              <td>{item.iso_code || "N/A"}</td>
              <td>{item.data.length > 0 ? item.data[0].year : "N/A"}</td>
              <td>{item.data.length > 0 ? item.data[0].population?.toLocaleString() : "N/A"}</td>
              <td>
                {item.data.length > 0 && item.data[0].co2 !== undefined
                  ? item.data[0].co2.toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {item.data.length > 0 && item.data[0].co2_per_capita !== undefined
                  ? item.data[0].co2_per_capita.toFixed(2)
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

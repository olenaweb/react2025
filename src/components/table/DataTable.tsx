import React from "react";
import { CountryData } from "@/type/type";
import "./dataTable.css";

interface DataTableProps {
  data: CountryData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="data-table-container">
      <h2>Data</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <button className="datatable-sorter">
                <span>Country</span> <svg className="size-4 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-sorting-icon="true"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"></path> </svg>
              </button>
            </th>
            <th>ISO Code</th>
            <th>Year</th>
            <th>
              <button className="datatable-sorter">
                <span>Population</span> <svg className="size-4 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-sorting-icon="true"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"></path> </svg>
              </button>
            </th>
            <th>CO2</th>
            <th>CO2 per capita</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
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

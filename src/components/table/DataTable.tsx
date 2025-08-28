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
            <th>Country</th>
            <th>ISO Code</th>
            <th>Year</th>
            <th>Population</th>
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

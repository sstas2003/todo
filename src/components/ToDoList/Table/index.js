import React from "react";

function Table({ data = [], columns = [], loading = false }) {
  return loading ? (
    <div>Loading...</div>
  ) : (
    <table>
      <thead>
        {columns.length > 0 && (
          <tr>
            {columns.map(({ name }) => {
              return <th key={name}>{name}</th>;
            })}
          </tr>
        )}
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row.id}>
              {columns.map((column, columnIndex) => {
                if (column.hasOwnProperty("render")) {
                  return (
                    <td key={`${row.id}_${columnIndex}`}>
                      {column.render(row)}
                    </td>
                  );
                }
                let res =
                  typeof row[column.field] !== "string"
                    ? String(row[column.field])
                    : row[column.field];
                return <td key={`${row.id}_${columnIndex}`}>{res}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;

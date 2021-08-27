import React, { Fragment, useEffect, useState } from "react";
import Paginator from "../Paginator";

function Table({
  data = [],
  columns = [],
  paginator = { perPage: [10, 20, 40], select: 10 },
  loading = false,
}) {
  let [itemsPerPage, setItemsPerPage] = useState(paginator.select);
  let [page, setPage] = useState(1);
  let [pages, setPages] = useState(Math.ceil(data.length / 10));

  let start =
    (page - 1) * itemsPerPage > data.length - 1 ? 0 : (page - 1) * itemsPerPage;
  let finish =
    Number(start) + Number(itemsPerPage) > data.length - 1
      ? data.length
      : Number(start) + Number(itemsPerPage);

  let newData = data.filter((item, index) => index >= start && index < finish);

  useEffect(() => {
    if (loading === false) {
      setPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [loading, itemsPerPage]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
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
          {newData.map((row) => {
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
      <Paginator
        page={page}
        pages={pages}
        onChange={setPage}
        options={paginator.perPage}
        perPage={itemsPerPage}
        onChangePerPage={setItemsPerPage}
      />
    </Fragment>
  );
}
export default Table;

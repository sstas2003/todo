import React from "react";
import "./style.scss";

function Paginator({
  page,
  pages,
  onChange = () => {},
  options = [10, 20, 40],
  perPage = 10,
  onChangePerPage = () => {},
}) {
  let pagesC = [];
  for (let i = 0; i < pages; i++) {
    let pg = i + 1;
    pagesC.push(
      <div
        key={"page_" + i}
        className={
          pg === page ? "table-paginator-item selected" : "table-paginator-item"
        }
        onClick={() => onChange(pg)}
      >
        {pg}
      </div>
    );
  }
  return (
    <div className={"table-paginator"}>
      <select value={perPage} onChange={(e) => onChangePerPage(e.target.value)}>
        {options.map((item) => (
          <option key={"per_page_" + item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div>
        page {page > pages ? pages : page} of {pages}
      </div>
      {pagesC}
    </div>
  );
}

export default Paginator;

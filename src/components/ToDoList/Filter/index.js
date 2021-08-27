import React, { Fragment } from "react";

function Filter({ dataList = [], value = {}, onChange = () => {} }) {
  return (
    <Fragment>
      <input
        list="authors"
        value={value?.author || ""}
        name={"author"}
        onChange={onChange}
      />
      <datalist id="authors">
        {dataList.map((item) => {
          return <option key={item.id} value={item.name} />;
        })}
      </datalist>
      <input
        type="date"
        value={value?.date || ""}
        name={"date"}
        onChange={onChange}
      />
      <select
        value={value?.complete || ""}
        name={"complete"}
        onChange={onChange}
      >
        <option value={""}>All</option>
        <option value={true}>Completed</option>
        <option value={false}>Uncompleted</option>
      </select>
    </Fragment>
  );
}
export default Filter;

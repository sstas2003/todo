import React from "react";
import "./style.scss";
import usePresenter from "./usePresenter";
import Table from "./Table";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import { getUser } from "../../store/appReducer/selectors";
import Action from "./Action";

function ToDoList() {
  let user = useSelector(getUser);
  let {
    list,
    isLoading,
    filters,
    setFilters,
    deleteItem,
    setItem,
    addItem,
    users,
    getUserByID,
  } = usePresenter({
    userId: user?.id || undefined,
  });

  let newList = list.filter((item) => {
    let filter = true;

    if (filters?.author !== "" && filters?.author !== undefined) {
      let u = getUserByID(item.user_id);
      if (u?.name?.indexOf(filters?.author) === -1) {
        filter = false;
      }
    }
    if (filters?.date !== "" && filters?.date !== undefined) {
      if (item?.date !== filters?.date) {
        filter = false;
      }
    }
    if (filters?.complete !== "" && filters?.complete !== undefined) {
      if (String(item?.complete) !== String(filters?.complete)) {
        filter = false;
      }
    }
    return filter;
  });

  return (
    <div className={"list-wrapper"}>
      <div className={"filters-wrapper"}>
        <Action
          type={"button"}
          button={{
            title: "Add task",
            onClick: (e) => addItem({ ...e, user_id: user?.id }),
          }}
        />
        <Filter
          dataList={users}
          value={filters}
          name={"filters"}
          onChange={setFilters}
        />
      </div>
      <div className={"table-wrapper"}>
        <Table
          paginator={{ perPage: [1, 10, 20, 40], select: 10 }}
          loading={isLoading}
          data={newList}
          columns={[
            { name: "№", field: "id" },
            { name: "Name", field: "name" },
            { name: "Date", field: "date" },
            {
              name: "Status",
              render: (e) => <div>{e?.complete && "Complete"}</div>,
            },
            {
              name: "Action",
              render: (e) => {
                return (
                  <Action data={e} onDelete={deleteItem} onChange={setItem} />
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ToDoList;

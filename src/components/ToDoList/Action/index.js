import React, { Fragment, useState } from "react";
import Modal from "../../Modal";

function Action({
  type = "select",
  button = { title: "", onClick: () => {} },
  data = {},
  onOpen = () => {},
  onChange = () => {},
  onDelete = () => {},
}) {
  let [state, setState] = useState({
    select: "",
    data: {},
    type: "",
    showModal: false,
  });
  let modalHeader = "";
  let modalContent = "";
  let onAcceptHandler = () => {};

  const modalShow = () => {
    setState((prev) => ({
      ...prev,
      showModal: true,
    }));
  };
  const modalHide = () => {
    setState((prev) => ({
      ...prev,
      showModal: false,
      type: "",
    }));
  };

  const onChangeDataHandler = (e) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, [e.target.name]: e.target.value },
    }));
  };

  switch (state.type) {
    case "edit":
      modalHeader = (
        <input
          type="text"
          value={state.data.name}
          name={"name"}
          onChange={onChangeDataHandler}
        />
      );
      modalContent = (
        <div style={{ padding: 5, display: "flex", flexDirection: "column" }}>
          <div style={{ textAlign: "start" }}>
            <input
              type="checkbox"
              checked={state.data.complete}
              name={"complete"}
              onChange={(e) => {
                onChangeDataHandler({
                  target: { name: e.target.name, value: e.target.checked },
                });
              }}
            />
            <span>Complete</span>
          </div>
          <textarea
            rows={3}
            value={state.data.desc}
            name={"desc"}
            onChange={onChangeDataHandler}
          />
        </div>
      );
      onAcceptHandler = (obj) => onChange(obj);
      break;
    case "open":
      modalHeader = state.data.name;
      modalContent = (
        <div style={{ padding: 20 }}>
          <div>{state.data.desc}</div>
        </div>
      );
      break;
    case "add":
      modalHeader = button?.title;
      modalContent = (
        <div
          style={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
          }}
        >
          <label htmlFor={"name"}>Name</label>
          <input
            type="text"
            value={state.data?.name || ""}
            name={"name"}
            onChange={onChangeDataHandler}
          />
          <span>Date</span>
          <input
            type="date"
            value={state.data?.date || ""}
            name={"date"}
            onChange={onChangeDataHandler}
          />
          <span>Description</span>
          <textarea
            rows={3}
            value={state.data?.desc || ""}
            name={"desc"}
            onChange={onChangeDataHandler}
          />
        </div>
      );
      break;
    case "delete":
      modalHeader = "Delete";
      modalContent = <div>{state.data.name}</div>;
      onAcceptHandler = (obj) => onDelete(obj);
      break;
  }
  const onChangeSelect = (e) => {
    setState((prev) => ({
      ...prev,
      data: data,
      type: e.target.value,
      showModal: true,
    }));
  };

  switch (type) {
    case "button": {
      onAcceptHandler = (obj) => button?.onClick(obj);
      break;
    }
  }

  return (
    <Fragment>
      {type === "select" ? (
        <select value={state.type} onChange={onChangeSelect}>
          <option value=""></option>
          <option value="open">Open</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      ) : (
        <button onClick={() => onChangeSelect({ target: { value: "add" } })}>
          {button?.title}
        </button>
      )}
      <Modal
        header={modalHeader}
        visible={state.showModal}
        onAccept={() => {
          onAcceptHandler(state.data);
          modalHide();
        }}
        onDecline={modalHide}
      >
        {modalContent}
      </Modal>
    </Fragment>
  );
}
export default Action;

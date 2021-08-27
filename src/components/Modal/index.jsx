import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";

function Modal({
  header = "",
  media = undefined,
  visible = false,
  onAccept = undefined,
  onDecline = undefined,
  ...props
}) {
  let [state, setState] = useState({ visible });
  const onVisibleHandler = () => {
    setState((prev) => ({ ...prev, visible: true }));
  };
  const onHideHandler = () => {
    setState((prev) => ({ ...prev, visible: false }));
  };
  useEffect(() => {
    if (visible) {
      onVisibleHandler();
    } else {
      onHideHandler();
    }
  }, [visible]);
  return (
    state.visible && (
      <div className="modal-wrapper">
        <div className="modal-window">
          <div className={"modal-header"}>{header}</div>
          <div className={"modal-content"}>{props.children}</div>
          <div className={"modal-media"}>
            {media || (
              <Fragment>
                <button
                  className={"modal-media-cancel"}
                  onClick={() => {
                    onDecline && onDecline();
                    onHideHandler();
                  }}
                >
                  Cancel
                </button>
                <button
                  className={"modal-media-ok"}
                  onClick={() => {
                    onAccept && onAccept();
                    onHideHandler();
                  }}
                >
                  Ok
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;

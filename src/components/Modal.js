import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Portal from "./Portal";
import "./Modal.module.scss";

function Modal({ children }) {
  const [redirectToBeersList, setRedirectToBeersList] = useState(false);

  return (
    <>
      {redirectToBeersList ? (
        <Redirect to="/" />
      ) : (
        <Portal>
          <div styleName="modal">
            <div
              styleName="modal-backdrop"
              onClick={() => setRedirectToBeersList(true)}
            />
            <div styleName="modal-content">
              <div styleName="modal-card">
                <div styleName="close-btn-wrapper">
                  <button
                    styleName="close-btn"
                    onClick={() => setRedirectToBeersList(true)}
                  >
                    ✖
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

export default Modal;

//some comment

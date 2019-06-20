import { useEffect } from "react";
import { createPortal } from "react-dom";

function Portal({ children }) {
  const modalRoot = document.getElementById("modal");
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => modalRoot.removeChild(el);
  }, [modalRoot, el]);

  return createPortal(children, el);
}

export default Portal;

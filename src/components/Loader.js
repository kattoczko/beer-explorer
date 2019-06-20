import React from "react";
import { ImpulseSpinner } from "react-spinners-kit";
import classNames from "classnames";
import "./Loader.module.scss";

function Loader({ isLoading }) {
  const styles = classNames("loader", { "loader-invisible": !isLoading });
  return (
    <div styleName={styles}>
        <ImpulseSpinner size={40} frontColor="#21d0ff" loading={isLoading} />
    </div>
  );
}

export default Loader;

import React from "react";
import { Link } from "react-router-dom";
import "./BeerItem.module.scss";

function BeerItem({ id, name, tagline, imageUrl }) {
  return (
    <div styleName="beer-item">
      <Link to={`/details/${id}`}>
        <div styleName="beer-card">
          {imageUrl && (
            <img
              styleName="beer-image"
              src={imageUrl}
              alt={name}
              height="300"
            />
          )}
          <h2 styleName="beer-name">{name}</h2>
          <p styleName="beer-tagline">{tagline}</p>
        </div>
        <div styleName="beer-frame" />
      </Link>
    </div>
  );
}

export default BeerItem;

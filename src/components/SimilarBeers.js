import React from "react";
import { Link } from "react-router-dom";
import "./SimilarBeers.module.scss";

function SimilarBeers({ similarBeersList }) {
  function renderSimilarBeers() {
    const similarBeers = similarBeersList.map(beer => {
      return (
        <div key={beer.id} styleName="similar-beers-item">
          <Link to={`/details/${beer.id}`}>
            <div styleName="similar-beers-item-card">
              <img
                styleName="similar-beers-item-image"
                src={beer.image_url}
                alt={name}
              />
              <p styleName="similar-beers-item-name">{beer.name}</p>
            </div>
            <div styleName="similar-beer-frame" />
          </Link>
        </div>
      );
    });
    return similarBeers;
  }

  return (
    <div styleName="similar-beers">
      <h4 styleName="similar-beers-heading">You may also like</h4>
      <div styleName="similar-beers-list">{renderSimilarBeers()}</div>
    </div>
  );
}

export default SimilarBeers;

import React from "react";
import BeerItem from "./BeerItem";
import "./BeerList.module.scss";
import Loader from "./Loader";

function BeerList({
  beers: beersData,
  onBeerClick,
  isLoading,
  allBeersLoaded
}) {
  const beers = beersData.map(beer => {
    const { id, name, tagline, image_url } = beer;
    return (
      <BeerItem
        key={id}
        id={id}
        name={name}
        tagline={tagline}
        imageUrl={image_url}
        onBeerClick={onBeerClick}
      />
    );
  });

  return (
    <>
      <div styleName="beer-list">{beers}</div>

      {allBeersLoaded ? (
        <div styleName="everything-loaded">
          You have seen all the beers. For sure something grabbed your attention
          :)
        </div>
      ) : (
        <div styleName="loader-placeholder">
          <Loader isLoading={isLoading} />
        </div>
      )}
    </>
  );
}

export default BeerList;

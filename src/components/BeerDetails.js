import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BeerDetails.module.scss";
import Loader from "./Loader";
import SimilarBears from "./SimilarBeers";

function BeerDetails({ match }) {
  const [beerDetails, setBeerDetails] = useState(null);
  const [beerIsLoading, setBeerIsLoading] = useState(true);
  const [similarBeersAreLoading, setSimilarBeersAreLoading] = useState(true);
  const [similarBeers, setSimilarBeers] = useState([]);

  useEffect(() => {
    const beerId = match.params.id;

    async function fetchBeerDetails() {
      setBeerIsLoading(true);
      const result = await axios(`${process.env.API_URL}/${beerId}`);
      setBeerDetails(result.data[0]);
      setBeerIsLoading(false);
    }

    fetchBeerDetails();
  }, [match]);

  useEffect(() => {
    async function fetchSimilarBeers() {
      const { abv, ibu, id } = beerDetails;

      const similarAbv = getSimilarProperties(abv);
      const similarIbu = getSimilarProperties(ibu);

      setSimilarBeersAreLoading(true);
      const result = await axios(
        `${process.env.API_URL}?abv_gt=${similarAbv.min}&abv_ls=${
          similarAbv.max
        }&ibu_gt=${similarIbu.min}&ibu_ls=${similarIbu.max}`
      );

      setSimilarBeers(getFirstThreeSimilar(result.data));
      setSimilarBeersAreLoading(false);

      function getSimilarProperties(property) {
        const similarityRange = 3;
        let min = Math.floor(property - similarityRange / 2);
        let max = Math.ceil(property + similarityRange / 2);

        min = min >= 0 ? min : 0;
        max = max >= 0 ? max : 0;

        return { min, max };
      }

      function removeActiveBeer(beers) {
        return beers.filter(item => item.id !== id);
      }

      function getFirstThreeSimilar(beers) {
        beers = removeActiveBeer(beers);
        return beers.slice(0, 3);
      }
    }

    if (beerDetails !== null) {
      fetchSimilarBeers();
    }
  }, [beerDetails]);

  return (
    <>
      <Loader isLoading={beerIsLoading || similarBeersAreLoading} />
      {!beerIsLoading && !similarBeersAreLoading && (
        <>
          <div styleName="about-beer">
            {beerDetails.image_url && (
              <div styleName="beer-img">
                <img src={beerDetails.image_url} alt={name} />
              </div>
            )}
            <div styleName="beer-details">
              <div styleName="details-section">
                <h3 styleName="beer-name">{beerDetails.name}</h3>
                <p styleName="beer-tagline">{beerDetails.tagline}</p>
                <span styleName="beer-property">
                  <span styleName="beer-property-name">IBU:</span>{" "}
                  {beerDetails.ibu}
                </span>
                <span styleName="beer-property">
                  <span styleName="beer-property-name">ABV:</span>{" "}
                  {beerDetails.abv}
                </span>
              </div>
              <div styleName="details-section">
                <p>{beerDetails.description}</p>
              </div>
              <div styleName="details-section">
                <p>{beerDetails.brewers_tips}</p>
              </div>
            </div>
            {similarBeers.length > 0 && (
              <SimilarBears similarBeersList={similarBeers} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default BeerDetails;

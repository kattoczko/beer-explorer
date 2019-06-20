import React, { useState, useEffect } from "react";
import axios from "axios";
import BeerList from "./BeerList";

function BeerListManager() {
  const [beers, setBeers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allBeersAreLoaded, setAllBeersAreLoaded] = useState(false);

  useEffect(() => {
    const itemsPerPage = 20;
    async function fetchBeers() {
      setIsLoading(true);
      const result = await axios(
        `${process.env.API_URL}?page=${pageNumber}&per_page=${itemsPerPage}`
      );
      setBeers(prevState => {
        return [...prevState, ...result.data];
      });

      setIsLoading(false);

      if (result.data.length < itemsPerPage) {
        setAllBeersAreLoaded(true);
      }
    }

    if (!allBeersAreLoaded) {
      fetchBeers();
    }
  }, [pageNumber, allBeersAreLoaded]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, false);

    return function cleanup() {
      window.removeEventListener("scroll", onScroll, false);
    };

    function handleLoadNextPage() {
      setPageNumber(prevState => prevState + 1);
    }

    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        !isLoading
      ) {
        handleLoadNextPage();
      }
    }
  }, [isLoading]);

  return (
    <BeerList
      beers={beers}
      isLoading={isLoading}
      allBeersLoaded={allBeersAreLoaded}
    />
  );
}

export default BeerListManager;

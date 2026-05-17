import React, { useEffect, useState } from "react";
import MediaCard from "../../components/MediaCard/MediaCard";
import "./SearchResults.css";
import Cookies from "universal-cookie";
import Loader from "../../components/Loader/Loader";
import { API_OPTIONS } from "../../config/api";

const cookies = new Cookies();

function SearchResults(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedUser = cookies.get("loggedUser");
    if (loggedUser) {
      setIsLoggedIn(true);
    }

    const { value, mediaType } = props.match.params;
    const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${value}&include_adult=false&language=en-US&page=1`;

    fetch(url, API_OPTIONS)
      .then((res) => res.json())
      .then((json) => {
        setSearchResults(json.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [props]);

  return (
    <div className="search-results-container">
      <h1>Resultados de busqueda</h1>
      {loading ? (
        <Loader />
      ) : (
        <section className="carrousel search-results">
          {searchResults.map((result, i) => (
            <MediaCard media={result} key={i} loggedIn={isLoggedIn} />
          ))}
        </section>
      )}
    </div>
  );
}

export default SearchResults;

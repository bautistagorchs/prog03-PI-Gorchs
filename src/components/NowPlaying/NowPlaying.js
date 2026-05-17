import React, { useEffect, useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import Loader from "../Loader/Loader";
import { API_OPTIONS } from "../../config/api";

const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

function NowPlaying(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const url = `${BASE_URL}?language=en-US&page=${page}`;

    fetch(url, API_OPTIONS)
      .then((res) => res.json())
      .then((json) =>
        setMovies(
          page === 1 ? json.results : (prev) => [...prev, ...json.results],
        ),
      )
      .catch((err) => console.error(err));
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <div
        style={{
          display: props.displayed === "home" ? "none" : "flex",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        <h2>Now Playing</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            name="now-playing-filter"
            id="now-playing-filter"
            placeholder="Filter now playing movies"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              all: "unset",
              height: "28px",
              border: "1px solid #0e3fa9",
              padding: "0 0.5rem",
              borderRadius: "4px",
            }}
          />
        </form>
      </div>
      {filteredMovies.length === 0 ? (
        <Loader />
      ) : (
        <section id="now-playing" className="carrousel">
          {filteredMovies.map((movie, i) => (
            <MediaCard key={i} media={movie} loggedIn={props.loggedIn} />
          ))}
          <button className="load-more-btn" onClick={() => loadMore()}>
            Load more
          </button>
        </section>
      )}
    </div>
  );
}

export default NowPlaying;

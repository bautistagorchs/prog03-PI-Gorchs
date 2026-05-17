import React, { useEffect, useState } from "react";
import MediaCard from "../../components/MediaCard/MediaCard";
import "./MyFavourites.css";
import Loader from "../../components/Loader/Loader";
import Cookies from "universal-cookie";
import { API_OPTIONS } from "../../config/api";

const cookies = new Cookies();

function MyFavourites(props) {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouriteTv, setFavouriteTv] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingTv, setLoadingTv] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMovieFavourites = () => {
    const storage = localStorage.getItem("favourite_movie");

    if (storage === null) {
      setLoadingMovies(false);
      return;
    }
    if (storage !== null) {
      const parsedStorage = JSON.parse(storage);
      if (storage !== null) {
        const peliculas = [];
        parsedStorage.forEach((id) => {
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            API_OPTIONS,
          )
            .then((res) => res.json())
            .then((json) => peliculas.push(json))
            .then(() => {
              setFavouriteMovies(peliculas);
              setLoadingMovies(false);
            })
            .catch((err) => console.error(err));
        });
      }
    }
  };

  const handleTvFavourites = () => {
    const storage = localStorage.getItem("favourite_tv");

    if (storage !== null) {
      const parsedStorage = JSON.parse(storage);
      if (storage !== null) {
        const tv = [];
        parsedStorage.forEach((id) => {
          fetch(
            `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
            API_OPTIONS,
          )
            .then((res) => res.json())
            .then((json) => tv.push(json))
            .then(() => {
              setFavouriteTv(tv);
              setLoadingTv(false);
            })
            .catch((err) => console.error(err));
        });
      }
    }
  };

  useEffect(() => {
    const loggedUser = cookies.get("loggedUser");

    if (!loggedUser) {
      props.history.push("/");
    } else {
      setIsLoggedIn(true);
    }

    handleMovieFavourites();
    handleTvFavourites();
  }, [props]);

  return (
    <section className="favourites-page">
      <h1>My Favourites</h1>

      {loadingMovies ? (
        <Loader />
      ) : (
        <>
          {favouriteMovies.length === 0 ? (
            <p style={{ fontSize: "1.2rem", paddingLeft: "1rem" }}>
              You haven't added any favourite movies yet.
            </p>
          ) : (
            <>
              <h2>Movies</h2>
              <section className="carrousel">
                {favouriteMovies.map((movie) => (
                  <MediaCard
                    key={movie.id}
                    media={movie}
                    mediaType="movie"
                    loggedIn={isLoggedIn}
                  />
                ))}
              </section>
            </>
          )}
        </>
      )}

      {loadingTv ? (
        <Loader />
      ) : (
        <>
          {favouriteTv.length === 0 ? (
            <p style={{ fontSize: "1.2rem", paddingLeft: "1rem" }}>
              You haven't added any favourite series yet.
            </p>
          ) : (
            <>
              <h2>Series</h2>
              <section className="carrousel">
                {favouriteTv.map((tv) => (
                  <MediaCard
                    key={tv.id}
                    media={tv}
                    mediaType="tv"
                    loggedIn={isLoggedIn}
                  />
                ))}
              </section>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MyFavourites;

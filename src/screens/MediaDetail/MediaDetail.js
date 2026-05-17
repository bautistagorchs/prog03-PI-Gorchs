import React, { useEffect, useState } from "react";
import "./MediaDetail.css";
import Loader from "../../components/Loader/Loader";
import Cookies from "universal-cookie";
import { API_OPTIONS } from "../../config/api";

const cookies = new Cookies();

function MediaDetail(props) {
  const [media, setMedia] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIsFav = (id, mediaType) => {
    const favourites = localStorage.getItem("favourite_" + mediaType);
    if (favourites) {
      const parsed = JSON.parse(favourites);
      return parsed.includes(id);
    }
    return false;
  };

  useEffect(() => {
    const { mediaType, id } = props.match.params;
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`;

    fetch(url, API_OPTIONS)
      .then((res) => res.json())
      .then((json) => {
        setMedia(json);
        if (checkIsFav(json.id, mediaType)) {
          setIsFav(true);
        }
      })
      .catch((err) => console.error(err));

    const loggedUser = cookies.get("loggedUser");
    if (loggedUser) {
      setIsLoggedIn(true);
    }
  }, [props]);

  const toggleFavourite = (id, mediaType) => {
    const favourites = localStorage.getItem("favourite_" + mediaType);
    const favId = [id];
    if (!favourites) {
      localStorage.setItem("favourite_" + mediaType, JSON.stringify(favId));
      setIsFav(true);
      return;
    }
    const parsed = JSON.parse(favourites);

    if (!parsed.includes(id)) {
      parsed.push(id);
      localStorage.setItem("favourite_" + mediaType, JSON.stringify(parsed));
      setIsFav(true);
      return;
    }
    const updated = parsed.filter((favId) => favId !== id);
    localStorage.setItem("favourite_" + mediaType, JSON.stringify(updated));
    setIsFav(false);
  };

  const { mediaType } = props.match.params;

  return (
    <div className="media-detail-container">
      {media.id === undefined ? (
        <div style={{ width: "100%", height: "100%" }}>
          <Loader />
        </div>
      ) : (
        <>
          <div className="section-left">
            <div className="img-container">
              <img
                src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
                alt={mediaType === "movie" ? media.title : media.name}
              />
            </div>
          </div>
          <div className="section-right">
            <h1>{mediaType === "movie" ? media.title : media.name}</h1>
            <ol>
              <li>
                <strong>Calificación: </strong>
                {media.vote_average}/10
              </li>
              <li>
                <strong>Fecha de estreno: </strong>
                {mediaType === "movie"
                  ? media.release_date
                  : media.first_air_date}
              </li>
              <li>
                <strong>Duración: </strong>
                {mediaType === "movie"
                  ? media.runtime
                  : media.episode_run_time}{" "}
                minutos
              </li>
              <li>
                <strong>Sinópsis: </strong>
                {media.overview}
              </li>
              <li>
                <strong>Género: </strong>
                {media.genres?.map((genre) => genre.name).join(", ")}
              </li>
            </ol>
            <div className="actions-container">
              <a
                href={`https://www.youtube.com/results?search_query=${media.title || media.name}+trailer`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver trailer
              </a>
              <button
                onClick={() => toggleFavourite(media.id, mediaType)}
                style={{ display: isLoggedIn ? "block" : "none" }}
              >
                {isFav ? "Remover de favoritos" : "Agregar a favoritos"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MediaDetail;

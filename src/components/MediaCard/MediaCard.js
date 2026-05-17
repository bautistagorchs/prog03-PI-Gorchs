import React, { useEffect, useState } from "react";
import "./MediaCard.css";

function MediaCard(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const { media } = props;
    if (checkIsFav(media.id, media.first_air_date ? "tv" : "movie")) {
      setIsFav(true);
    }
  }, [props]);

  const toggleDescription = (e) => {
    e.preventDefault();
    setShowDescription(!showDescription);
  };
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

  const checkIsFav = (id, mediaType) => {
    const favourites = localStorage.getItem("favourite_" + mediaType);
    if (favourites) {
      const parsed = JSON.parse(favourites);
      return parsed.includes(id);
    }
    return false;
  };

  const { media } = props;
  return (
    <article className="media-card">
      <div className="img-container" id={showDescription ? "hide" : undefined}>
        <img
          src={
            "https://image.tmdb.org/t/p/w342" + media.poster_path ||
            media.profile_path
          }
          alt={media.title ? media.title + " poster" : media.name + " poster"}
        />
      </div>

      <div
        className="content-container"
        id={showDescription ? "show" : undefined}
      >
        <div>
          <h5 className="title">{media.title ? media.title : media.name}</h5>
        </div>
        {showDescription && (
          <div>
            <p className="media-card-overview">
              {media.overview.slice(0, 320)}
            </p>
            <a
              href={`/detail/${media.first_air_date ? `tv/` : `movie/`}${media.id}`}
              className="to-details"
            >
              Details
            </a>
          </div>
        )}
        <div className="media-card-actions">
          <button className="show-more" onClick={(e) => toggleDescription(e)}>
            {showDescription ? "Show less" : "Show more"}
          </button>
          <button
            className="media-card-favorite"
            onClick={() =>
              toggleFavourite(media.id, media.first_air_date ? "tv" : "movie")
            }
            style={{ display: props.loggedIn ? "block" : "none" }}
          >
            {isFav ? "❤️" : "🩶"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MediaCard;

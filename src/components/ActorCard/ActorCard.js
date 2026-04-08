import React, { Component } from "react";
import "./ActorCard.css";

class ActorCard extends Component {
  render() {
    const { actor } = this.props;
    return (
      <article className="actor-card">
        <div className="img-container">
          <a
            href={`https://www.google.com/search?q=${actor.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={"https://image.tmdb.org/t/p/w342" + actor.profile_path}
              alt={actor.name}
            />
          </a>
        </div>
        <div className="content-container">
          <h5 className="title">{actor.name}</h5>
          <p className="subtitle">
            Last project:{" "}
            <strong>
              {actor.known_for[0]?.title || actor.known_for[0]?.name}
            </strong>
          </p>
        </div>
      </article>
    );
  }
}

export default ActorCard;

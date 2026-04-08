import React, { Component } from "react";
import "./MediaCard.css";

class MediaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false,
    };
  }

  toggleDescription(e) {
    e.preventDefault();
    this.setState({ showDescription: !this.state.showDescription });
  }

  render() {
    const { movie } = this.props;
    return (
      <article className="media-card">
        <div
          className="img-container"
          id={this.state.showDescription ? "hide" : undefined}
        >
          <img
            src={"https://image.tmdb.org/t/p/w342" + movie.poster_path}
            alt={movie.title ? movie.title + " poster" : movie.name + " poster"}
          />
        </div>

        <div
          className="content-container"
          id={this.state.showDescription ? "show" : undefined}
        >
          <div>
            <h5 className="title">{movie.title ? movie.title : movie.name}</h5>
          </div>
          {this.state.showDescription && (
            <div>
              <p className="media-card-overview">{movie.overview}</p>
              <a
                href="cuando cree la subpagina de detalle, agrego el link"
                className="to-details"
              >
                Details
              </a>
            </div>
          )}
          <div className="media-card-actions">
            <button
              className="show-more"
              onClick={(e) => this.toggleDescription(e)}
            >
              {this.state.showDescription ? "Show less" : "Show more"}
            </button>
            <a className="media-card-favorite" href="hola">
              🩶
            </a>
          </div>
        </div>
      </article>
    );
  }
}

export default MediaCard;

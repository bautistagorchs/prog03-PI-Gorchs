import React, { Component } from "react";
import "./MediaCard.css";

class MediaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false,
      mediaId: this.props.media.id,
    };
  }

  toggleDescription(e) {
    e.preventDefault();
    this.setState({ showDescription: !this.state.showDescription });
  }

  render() {
    const { media } = this.props;
    return (
      <article className="media-card">
        <div
          className="img-container"
          id={this.state.showDescription ? "hide" : undefined}
        >
          <img
            src={"https://image.tmdb.org/t/p/w342" + media.poster_path}
            alt={media.title ? media.title + " poster" : media.name + " poster"}
          />
        </div>

        <div
          className="content-container"
          id={this.state.showDescription ? "show" : undefined}
        >
          <div>
            <h5 className="title">{media.title ? media.title : media.name}</h5>
          </div>
          {this.state.showDescription && (
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

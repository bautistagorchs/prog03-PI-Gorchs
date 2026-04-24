import React, { Component } from "react";
import "./MediaDetail.css";
import Loader from "../../components/Loader/Loader";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class MediaDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: {},
      isFav: false,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const { mediaType, id } = this.props.match.params;
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTI2NDY1N2ZhZGZiYzg4OTM3MGI2YzI5N2FmZDcyYiIsIm5iZiI6MTY5ODY3NTE1MS4xNDMwMDAxLCJzdWIiOiI2NTNmYjljZjEwOWNkMDAxMGIwNGQwZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DU-jNPv55CxVOlwyDSo8_1sJ-o6SGpqLIRCLc188uv0",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ media: json });
        if (this.checkIsFav(json.id, mediaType)) {
          this.setState({ isFav: true });
        }
      })

      .catch((err) => console.error(err));
    const loggedUser = cookies.get("loggedUser");

    if (loggedUser) {
      this.setState({ isLoggedIn: true });
    }
  }

  checkIsFav(id, mediaType) {
    const favourites = localStorage.getItem("favourite_" + mediaType);
    if (favourites) {
      const parsed = JSON.parse(favourites);
      return parsed.includes(id);
    }
    return false;
  }

  toggleFavourite(id, mediaType) {
    const favourites = localStorage.getItem("favourite_" + mediaType);
    const favId = [id];
    if (!favourites) {
      localStorage.setItem("favourite_" + mediaType, JSON.stringify(favId));
      this.setState({ isFav: true });
      return;
    }
    const parsed = JSON.parse(favourites);

    if (!parsed.includes(id)) {
      parsed.push(id);
      localStorage.setItem("favourite_" + mediaType, JSON.stringify(parsed));
      this.setState({ isFav: true });
      return;
    }
    const updated = parsed.filter((favId) => favId !== id);
    localStorage.setItem("favourite_" + mediaType, JSON.stringify(updated));
    this.setState({ isFav: false });
  }

  render() {
    const { mediaType } = this.props.match.params;
    const { media, isFav } = this.state;
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
                  onClick={() => this.toggleFavourite(media.id, mediaType)}
                  style={{ display: this.state.isLoggedIn ? "block" : "none" }}
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
}

export default MediaDetail;

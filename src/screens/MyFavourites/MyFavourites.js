import React, { Component } from "react";
import MediaCard from "../../components/MediaCard/MediaCard";
import "./MyFavourites.css";
import Loader from "../../components/Loader/Loader";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTI2NDY1N2ZhZGZiYzg4OTM3MGI2YzI5N2FmZDcyYiIsIm5iZiI6MTY5ODY3NTE1MS4xNDMwMDAxLCJzdWIiOiI2NTNmYjljZjEwOWNkMDAxMGIwNGQwZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DU-jNPv55CxVOlwyDSo8_1sJ-o6SGpqLIRCLc188uv0",
  },
};
class MyFavourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteMovies: [],
      favouriteTv: [],
      loadingMovies: true,
      loadingTv: true,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const loggedUser = cookies.get("loggedUser");

    if (!loggedUser) {
      this.props.history.push("/");
    } else {
      this.setState({ isLoggedIn: true });
    }

    this.handleMovieFavourites();
    this.handleTvFavourites();
  }

  handleMovieFavourites() {
    const storage = localStorage.getItem("favourite_movie");

    if (storage === null) {
      this.setState({ loadingMovies: false });
      return;
    }
    if (storage !== null) {
      const parsedStorage = JSON.parse(storage);
      if (storage !== null) {
        const peliculas = [];
        // eslint-disable-next-line
        parsedStorage.map((id) => {
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options,
          )
            .then((res) => res.json())
            .then((json) => peliculas.push(json))
            .then(() =>
              this.setState({
                favouriteMovies: peliculas,
                loadingMovies: false,
              }),
            )
            .catch((err) => console.error(err));
        });
      }
    }
  }
  handleTvFavourites() {
    const storage = localStorage.getItem("favourite_tv");

    if (storage !== null) {
      const parsedStorage = JSON.parse(storage);
      if (storage !== null) {
        const tv = [];
        // eslint-disable-next-line
        parsedStorage.map((id) => {
          fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
            .then((res) => res.json())
            .then((json) => tv.push(json))
            .then(() => this.setState({ favouriteTv: tv, loadingTv: false }))
            .catch((err) => console.error(err));
        });
      }
    }
  }

  render() {
    return (
      <section className="favourites-page">
        <h1>My Favourites</h1>

        {this.state.loadingMovies ? (
          <Loader />
        ) : (
          <>
            {this.state.favouriteMovies.length === 0 ? (
              <p style={{ fontSize: "1.2rem", paddingLeft: "1rem" }}>
                You haven't added any favourite movies yet.
              </p>
            ) : (
              <>
                <h2>Movies</h2>
                <section className="carrousel">
                  {this.state.favouriteMovies.map((movie) => (
                    <MediaCard
                      key={movie.id}
                      media={movie}
                      mediaType="movie"
                      loggedIn={this.state.isLoggedIn}
                    />
                  ))}
                </section>
              </>
            )}
          </>
        )}

        {this.state.loadingTv ? (
          <Loader />
        ) : (
          <>
            {this.state.favouriteTv.length === 0 ? (
              <p style={{ fontSize: "1.2rem", paddingLeft: "1rem" }}>
                You haven't added any favourite series yet.
              </p>
            ) : (
              <>
                <h2>Series</h2>
                <section className="carrousel">
                  {this.state.favouriteTv.map((tv) => (
                    <MediaCard
                      key={tv.id}
                      media={tv}
                      mediaType="tv"
                      loggedIn={this.state.isLoggedIn}
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
}

export default MyFavourites;

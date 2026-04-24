import React, { Component } from "react";
import MediaCard from "../../components/MediaCard/MediaCard";
import "./SearchResults.css";
import Cookies from "universal-cookie";
import Loader from "../../components/Loader/Loader";

const cookies = new Cookies();

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      loading: true,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const loggedUser = cookies.get("loggedUser");
    if (loggedUser) {
      this.setState({ isLoggedIn: true });
    }

    const { value, mediaType } = this.props.match.params;

    const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${value}&include_adult=false&language=en-US&page=1`;
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
      .then((json) =>
        this.setState({ searchResults: json.results, loading: false }),
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="search-results-container">
        <h1>Resultados de busqueda</h1>
        {this.state.loading ? (
          <Loader />
        ) : (
          <section className="carrousel search-results">
            {this.state.searchResults.map((result, i) => (
              <MediaCard
                media={result}
                key={i}
                loggedIn={this.state.isLoggedIn}
              />
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default SearchResults;

import React, { Component } from "react";
import MediaCard from "../MediaCard/MediaCard";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTI2NDY1N2ZhZGZiYzg4OTM3MGI2YzI5N2FmZDcyYiIsIm5iZiI6MTY5ODY3NTE1MS4xNDMwMDAxLCJzdWIiOiI2NTNmYjljZjEwOWNkMDAxMGIwNGQwZjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DU-jNPv55CxVOlwyDSo8_1sJ-o6SGpqLIRCLc188uv0",
  },
};
class Upcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      filter: "",
    };
  }

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${this.state.page}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => this.setState({ movies: json.results }))
      .catch((err) => console.error(err));
  }

  loadMore() {
    const page = this.state.page + 2;
    this.setState({ page: page });

    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((json) =>
        this.setState({ movies: [...this.state.movies, ...json.results] }),
      )
      .catch((err) => console.error(err));
  }

  render() {
    const filteredMovies = this.state.movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.state.filter.toLowerCase()),
    );

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "0.5rem",
          }}
        >
          <h2>Upcoming</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              name="upcoming-filter"
              id="upcoming-filter"
              placeholder="Filter upcoming movies"
              value={this.state.filter}
              onChange={(e) => this.setState({ filter: e.target.value })}
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
        <section id="upcoming" className="carrousel">
          {filteredMovies.map((movie, i) => (
            <MediaCard key={i} media={movie} />
          ))}
          <button className="load-more-btn" onClick={() => this.loadMore()}>
            Load more
          </button>
        </section>
      </div>
    );
  }
}

export default Upcoming;

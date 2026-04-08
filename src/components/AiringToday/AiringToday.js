import React, { Component } from "react";
import MediaCard from "../MediaCard/MediaCard";

class AiringToday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";

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
      .then((json) => this.setState({ movies: json.results }))
      .catch((err) => console.error(err));
  }
  render() {
    return (
      <section id="airing-today" className="carrousel">
        {this.state.movies.map((movie, i) => (
          <MediaCard key={i} movie={movie} />
        ))}
      </section>
    );
  }
}

export default AiringToday;

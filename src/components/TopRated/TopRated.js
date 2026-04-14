import React, { Component } from "react";
import MediaCard from "../MediaCard/MediaCard";

class TopRated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
    };
  }

  componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
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
      .then((json) => this.setState({ series: json.results }))
      .catch((err) => console.error(err));
  }
  render() {
    return (
      <section id="top-rated" className="carrousel">
        {this.state.series.map((movie, i) => (
          <MediaCard key={i} media={movie} />
        ))}
      </section>
    );
  }
}

export default TopRated;

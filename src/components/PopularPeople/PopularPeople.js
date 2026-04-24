import React, { Component } from "react";
import ActorCard from "../ActorCard/ActorCard";

class PopularPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }
  componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";

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
      .then((json) => this.setState({ people: json.results }))
      .catch((err) => console.error(err));
  }
  render() {
    return (
      <section className="carrousel">
        {this.state.people.map((actor, i) => (
          <ActorCard key={i} actor={actor} />
        ))}
      </section>
    );
  }
}

export default PopularPeople;

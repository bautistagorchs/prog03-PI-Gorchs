import React, { useEffect, useState } from "react";
import ActorCard from "../ActorCard/ActorCard";
import { API_OPTIONS } from "../../config/api";

function PopularPeople(props) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";

    fetch(url, API_OPTIONS)
      .then((res) => res.json())
      .then((json) => setPeople(json.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="carrousel">
      {people.map((actor, i) => (
        <ActorCard key={i} actor={actor} />
      ))}
    </section>
  );
}

export default PopularPeople;

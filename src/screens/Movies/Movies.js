import React, { useEffect, useState } from "react";
import NowPlaying from "../../components/NowPlaying/NowPlaying";
import Trending from "../../components/Trending/Trending";
import Upcoming from "../../components/Upcoming/Upcoming";
import "./Movies.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Movies(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedUser = cookies.get("loggedUser");
    if (loggedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <main className="movies-screen">
      <Upcoming loggedIn={isLoggedIn} />
      <NowPlaying loggedIn={isLoggedIn} />
      <Trending loggedIn={isLoggedIn} />
    </main>
  );
}

export default Movies;

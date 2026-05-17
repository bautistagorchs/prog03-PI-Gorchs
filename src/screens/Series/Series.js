import React, { useEffect, useState } from "react";
import AiringToday from "../../components/AiringToday/AiringToday";
import "./Series.css";
import TopRated from "../../components/TopRated/TopRated";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Series(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedUser = cookies.get("loggedUser");
    if (loggedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <main className="series-screen">
      <AiringToday loggedIn={isLoggedIn} />
      <TopRated loggedIn={isLoggedIn} />
    </main>
  );
}

export default Series;

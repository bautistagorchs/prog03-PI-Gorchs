import React from "react";
import AiringToday from "../../components/AiringToday/AiringToday";
import "./Series.css";
import TopRated from "../../components/TopRated/TopRated";
class Series extends React.Component {
  render() {
    return (
      <main className="series-screen">
        <AiringToday />
        <TopRated />
      </main>
    );
  }
}

export default Series;

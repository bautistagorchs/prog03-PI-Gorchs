import React from "react";
import "./Home.css";
import NowPlaying from "../../components/NowPlaying/NowPlaying";
import Trending from "../../components/Trending/Trending";
import AiringToday from "../../components/AiringToday/AiringToday";
import PopularPeople from "../../components/PopularPeople/PopularPeople";
import SearchForm from "../../components/SearchForm/SearchForm";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    const loggedUser = cookies.get("loggedUser");

    if (loggedUser) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    return (
      <main className="home-screen">
        <div className="home-search">
          <h2>Search</h2>
          <SearchForm />
        </div>

        <div className="sections-wrapper">
          <h2>Now Playing</h2>
          <Link to="/movies">See more</Link>
        </div>
        <NowPlaying displayed={"home"} loggedIn={this.state.isLoggedIn} />

        <div className="sections-wrapper">
          <h2>Popular People</h2>
        </div>
        <PopularPeople />

        <div className="sections-wrapper">
          <h2>Trending</h2>
          <Link to="/movies">See more</Link>
        </div>
        <Trending displayed={"home"} loggedIn={this.state.isLoggedIn} />

        <div className="sections-wrapper">
          <h2>Series Airing Today</h2>
          <Link to="/series">See more</Link>
        </div>
        <AiringToday displayed={"home"} loggedIn={this.state.isLoggedIn} />
      </main>
    );
  }
}

export default Home;

import React from "react";
import NowPlaying from "../../components/NowPlaying/NowPlaying";
import Trending from "../../components/Trending/Trending";
import Upcoming from "../../components/Upcoming/Upcoming";
import "./Movies.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Movies extends React.Component {
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
      <main className="movies-screen">
        <Upcoming loggedIn={this.state.isLoggedIn} />
        <NowPlaying loggedIn={this.state.isLoggedIn} />
        <Trending loggedIn={this.state.isLoggedIn} />
      </main>
    );
  }
}

export default Movies;

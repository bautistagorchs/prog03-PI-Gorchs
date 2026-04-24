import React from "react";
import AiringToday from "../../components/AiringToday/AiringToday";
import "./Series.css";
import TopRated from "../../components/TopRated/TopRated";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Series extends React.Component {
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
      <main className="series-screen">
        <AiringToday loggedIn={this.state.isLoggedIn} />
        <TopRated loggedIn={this.state.isLoggedIn} />
      </main>
    );
  }
}

export default Series;

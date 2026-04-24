import React, { Component } from "react";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      mediaType: "movie",
    };
  }

  updateInputValues(e) {
    this.setState({ searchValue: e.target.value });
  }

  updateSelectOptions(e) {
    this.setState({ mediaType: e.target.value });
  }
  render() {
    return (
      <div className="search-container">
        <form
          action={`/search-results/${this.state.searchValue}/${this.state.mediaType}`}
          className="search-form"
        >
          <input
            className="search-input"
            name="value"
            id="name"
            placeholder="Search movie, show or person"
            value={this.state.searchValue}
            onChangeCapture={(e) => this.updateInputValues(e)}
          />
          <select
            className="media-select"
            name="mediaType"
            id="mediaType"
            onChange={(e) => this.updateSelectOptions(e)}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
            <option value="multi">All</option>
          </select>
          <button className="search-submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;

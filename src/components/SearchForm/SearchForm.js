import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm(props) {
  const [searchValue, setSearchValue] = useState("");
  const [mediaType, setMediaType] = useState("movie");

  return (
    <div className="search-container">
      <form
        action={`/search-results/${searchValue}/${mediaType}`}
        className="search-form"
      >
        <input
          className="search-input"
          name="value"
          id="name"
          placeholder="Search movie, show or person"
          value={searchValue}
          onChangeCapture={(e) => setSearchValue(e.target.value)}
        />
        <select
          className="media-select"
          name="mediaType"
          id="mediaType"
          onChange={(e) => setMediaType(e.target.value)}
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

export default SearchForm;

import React from "react";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Home />
      <Footer />
    </React.Fragment>
  );
}

export default App;

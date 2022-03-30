import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  return (
    <main>
      <h1>Welcome! </h1>
      <p>
        I don't know who you are, please <Link to="/login">login</Link> or{" "}
        <Link to="/signup">sign up</Link>.
      </p>
    </main>
  );
};

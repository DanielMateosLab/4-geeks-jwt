import React from "react";
import { Link } from "react-router-dom";
import { useRedirectAuthenticated } from "../utils";

export const Signup = () => {
  useRedirectAuthenticated();

  return (
    <main>
      <h1>Signup</h1>
      <p>
        Already have an account? <Link to="/login">Log in!</Link>
      </p>
    </main>
  );
};

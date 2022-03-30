import React from "react";
import { Link } from "react-router-dom";

export const Login = () => (
  <main>
    <h1>Login</h1>
    <p>
      Don't have an account yet? <Link to="/signup">Sign up!</Link>
    </p>
  </main>
);

import React from "react";
import { Link } from "react-router-dom";
import { Form } from "../component/form";
import { useRedirectAuthenticated } from "../utils";

export const Login = () => {
  useRedirectAuthenticated()
  
  return (
  <main>
    <h1>Login</h1>
    <p>
      Don't have an account yet? <Link to="/signup">Sign up!</Link>
    </p>
    <Form />
  </main>
)};

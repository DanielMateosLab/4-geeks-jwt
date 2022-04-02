import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Form = ({ login, signup }) => {
  const submitButtonText = login ? "Log in" : "Sign up";

  const { actions } = useContext(Context);
  const [formValues, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    const { value, id } = event.target;

    setValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSubmit = async (event) => {
    setError("");

    event.preventDefault();

    let error = null;

    error = await actions.authenticate(formValues, signup);

    error ? setError(error) : history.push("/");
  };

  return (
    <form className="text-start" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          id="email"
          onChange={handleChange}
          value={formValues.email}
          type="email"
          className="form-control"
          placeholder="jhon_doe@mailing.com"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          onChange={handleChange}
          value={formValues.password}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {submitButtonText}
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </form>
  );
};

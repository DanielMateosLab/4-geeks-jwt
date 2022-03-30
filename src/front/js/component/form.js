import React, { useState } from "react";

export const Form = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { value, id } = event.target;

    setValues({
      ...values,
      [id]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const res = await fetch(process.env.BACKEND_URL + "/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const { token, msg } = await res.json();

      if (!res.ok) {
        setError(msg);
      }

      sessionStorage.setItem("jwt", token);
    } catch (error) {
      console.error(error);
      setError("Could not log in, try again later.");
    }
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
          value={values.email}
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
          value={values.password}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Log in
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </form>
  );
};

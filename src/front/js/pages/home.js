import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  function handleLogout(event) {
    event.preventDefault();

    actions.logout();
  }

  return (
    <main>
      <h1>Welcome! </h1>
      {store.user ? (
        <p>
          You are logged in as <b>{store.user.email}</b>. Click{" "}
          <a href="#" onClick={handleLogout}>
            here
          </a>{" "}
          if you want to log out.
        </p>
      ) : (
        <p>
          I don't know who you are, please <Link to="/login">login</Link> or{" "}
          <Link to="/signup">sign up</Link>.
        </p>
      )}
    </main>
  );
};

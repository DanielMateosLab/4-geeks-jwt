import { fetchPost } from "../utils";

const getState = ({ _, getActions, setStore }) => {
  return {
    store: {
      user: null,
    },
    actions: {
      saveToken(token) {
        localStorage.setItem("jwt", token);
      },
      /**
       * Tries to log in with the provided credentials, creating a new user if singup = true.
       * Saves the token and fetches the user if api request success.
       * Returns error if present.
       */
      async authenticate(credentials, signup = false) {
        const endpoint = signup ? "/api/users" : "/api/token";

        try {
          const res = await fetchPost(endpoint, credentials);
          const { token, msg } = await res.json();

          if (!res.ok) {
            return msg;
          }

          getActions().saveToken(token);
          await getActions().getAuthenticatedUser();
        } catch (error) {
          console.error(error);
          return `Could not ${signup ? "sign up" : "log in"}, try again later.`;
        }
      },
      logout() {
        localStorage.removeItem("jwt");
        setStore({ user: null });
      },
      async getAuthenticatedUser() {
        try {
          const token = localStorage.getItem("jwt");
          if (!token) return;

          const res = await fetch(process.env.BACKEND_URL + "/api/private", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) throw new Error("Token is not valid.");

          const user = await res.json();
          setStore({ user });
        } catch (err) {
          console.error(err);
          localStorage.removeItem("jwt");
        }
      },
    },
  };
};

export default getState;

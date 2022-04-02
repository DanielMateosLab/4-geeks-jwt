import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "./store/appContext";

export async function fetchPost(path, body) {
  return await fetch(process.env.BACKEND_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export const useRedirectAuthenticated = () => {
  const { store } = useContext(Context);
  const history = useHistory();

  if (store.user) history.push("/");
};

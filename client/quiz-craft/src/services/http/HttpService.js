import { client } from "./axiosClient";

export function register({ email, password }) {
  return client.post(
    "/auth/register",
    { email, password },
    { authorization: false }
  );
}

export function login({ email, password }) {
  return client.post(
    "/auth/login",
    { email, password },
    { authorization: false }
  );
}

export function getUser() {
  return client.get("/user");
}

export function setUser({first_name, last_name}) {
  return client.patch(
    "/user",
    { first_name, last_name },
    { authorization: true }
  );
}

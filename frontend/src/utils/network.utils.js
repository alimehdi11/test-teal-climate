import { getBearerToken } from "./auth.utils.js";

// My custom fetch function
const request = (url, method, body) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      authorization: getBearerToken(),
    },
    body: JSON.stringify(body),
  });
};

export { request };

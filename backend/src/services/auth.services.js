import jwt from "jsonwebtoken";

const issueJWT = (payload) => {
  const token = jwt.sign(payload, process.env.AUTH_JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return token;
};

export { issueJWT };

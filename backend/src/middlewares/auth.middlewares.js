import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const tokenParts = req.headers.authorization.split(" ");
    if (
      tokenParts[0] !== "Bearer" ||
      tokenParts[1].match(/\S+\.\S+\.\S+/) === null
    ) {
      throw Error();
    }
    const decodedToken = jwt.verify(
      tokenParts[1],
      process.env.AUTH_JWT_SECRET,
      {
        algorithm: "HS256",
      }
    );
    req.user = decodedToken;
    next();
    return;
  } catch (error) {
    console.log("Error Verifying Token: ", error);
    res.status(401).json({
      message: "You are not authorized",
    });
  }
};

export { verifyToken };

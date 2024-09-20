import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  try {
    if (!req?.headers.authorization) {
      throw Error("No authorization header provided");
    }
    const tokenParts = req.headers.authorization.split(" ");
    if (
      tokenParts[0] !== "Bearer" ||
      tokenParts[1].match(/\S+\.\S+\.\S+/) === null
    ) {
      throw Error();
    }
    const decodedToken = jwt.verify(
      tokenParts[1],
      process.env.AUTH_JWT_SECRET_KEY
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

const isSubscribed = (req, res, next) => {
  // if (!req.user.subscribed) {
  //   console.log("User not subscribed");
  //   console.error(JSON.stringify(req.user, null, 2));
  //   res.status(401).json({
  //     message: "You are not authorized",
  //   });
  // }
  next();
};

export { isLoggedIn, isSubscribed };

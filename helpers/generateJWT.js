import jwt from "jsonwebtoken";

const generateJWT = (id, oneUse) => {
  if (oneUse) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "6h",
      });
  } else {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }
};

export default generateJWT;

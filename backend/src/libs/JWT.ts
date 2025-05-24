import jwt from "jsonwebtoken";

export const authenticateUser = (token: string | null) => {
  const SECRET = process.env.JWT_SECRET || "";
  
  if (!token) return false;

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return false;
    return user;
  });
};

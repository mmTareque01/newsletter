import jwt from "jsonwebtoken";

export const authenticateUser = (token: string | null) => {
  const SECRET = "your-secret-key"; // Use .env for real secret

  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (!token) return false;

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return false;
    return user;
  });
};

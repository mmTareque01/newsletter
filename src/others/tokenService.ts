import jwt from "jsonwebtoken";

// Access token – short lifespan (e.g. 15m)



export function generateAccessToken(user: UserType) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: "15m",
  });
}

// Refresh token – long lifespan (e.g. 7 days)
export function generateRefreshToken(user: UserType) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "", {
    expiresIn: "7d",
  });
}

// Verify access token
export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
}

// Verify refresh token
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "");
}

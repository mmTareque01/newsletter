import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "./errors";

// Access token – short lifespan (e.g. 15m)

export function generateAccessToken(user: UserType | JwtPayload) {
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

export const verifyRefreshToken = (token: string | null) => {
  const SECRET = process.env.REFRESH_TOKEN_SECRET || "";

  if (!token) throw new CustomError("ER400", "Access token expired");

  jwt.verify(token, SECRET, (err, user) => {
    // if (err) return false;

    if (!err) return user as UserType;

    if (err instanceof jwt.TokenExpiredError) {
      throw new CustomError("ER400", "Access token expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new CustomError("ER400", "Invalid Access token");
    } else {
      throw new Error(err);
    }
  });
};

// export const verifyAccessToken = (token: string | null) => {
//   const SECRET = process.env.JWT_SECRET || "";

//   if (!token) throw new CustomError("ER400", "Refresh token expired");

//   jwt.verify(token, SECRET, (err, user) => {
//     // if (err) return false;

//     if (err instanceof jwt.TokenExpiredError) {
//       throw new CustomError("ER400", "Refresh token expired");
//     } else if (err instanceof jwt.JsonWebTokenError) {
//       throw new CustomError("ER400", "Invalid refresh token");
//     } else if (err) {
//       throw new Error(err);
//     }
//     return user;
//   });
// };


// import jwt from "jsonwebtoken";
// import { CustomError } from "./errors"; // adjust the path as needed

interface UserPayload {
  id: string;
  email: string;
  // Add more fields as per your token payload
}

export const verifyAccessToken = (token: string | null): UserPayload => {
  const SECRET = process.env.JWT_SECRET || "";

  if (!token) {
    throw new CustomError("ER400", "Access token missing");
  }

  try {
    const decoded = jwt.verify(token, SECRET) as UserPayload;
    return decoded;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new CustomError("ER400", "Access token expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new CustomError("ER400", "Invalid access token");
    } else {
      throw err;
    }
  }
};

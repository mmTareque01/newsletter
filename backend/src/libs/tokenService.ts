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


export const verifyRefreshToken = (token: string | null): TokenInfo | void=> {
  const SECRET = process.env.REFRESH_TOKEN_SECRET || "";

  if (!token) throw new CustomError("ER401", "Access token expired");

  try {
    const user = jwt.verify(token, SECRET) as UserType;

    const authUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
    } as UserType;

    const accessToken = generateAccessToken(authUser);
    const refreshToken = generateRefreshToken(authUser);

    console.log({ accessToken, refreshToken, authUser });

    return {
      accessToken,
      refreshToken,
      user: authUser,
    };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log({ err, name: "TokenExpiredError" });
      throw new CustomError("ER401", "Access token expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      console.log({ err, name: "JsonWebTokenError" });
      throw new CustomError("ER401", "Invalid Access token");
    } else {
      console.log({ err, name: "Unknown JWT Error" });
      // return null;
    }
  }
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
  const SECRET = process.env.ACCESS_TOKEN_SECRET || "";

  if (!token) {
    throw new CustomError("ER401", "Unauthorized user");
  }

  try {
    const decoded = jwt.verify(token, SECRET) as UserPayload;
    return decoded;
  } catch (err) {
    console.log({ err });
    if (err instanceof jwt.TokenExpiredError) {
      throw new CustomError("ER401", "Unauthorized user");
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new CustomError("ER401", "Unauthorized user");
    } else {
      throw err;
    }
  }
};

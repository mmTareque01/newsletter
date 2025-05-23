import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscriber from "./services/subscriber";
import service from "./services";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "process";
import path from "path";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;
// const expressServer = http.createServer(app);

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
// Serve widget.js statically from 'public' directory
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "..", "public")));

// CORS setup (for allowing cross-origin requests)
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend origin
    credentials: true,
  })
);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Accept, Content-Type, Authorization, X-Requested-With"
//   );

//   next();
// });

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
   'true'
  );

  next();
});

// Health check endpoint
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

// Routes
app.use("/api", service);

// Global error handler
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.message);
//   res.status(500).json({ error: err.message || "Something went wrong!" });
// });

app.use(errorHandler);

app.listen(PORT, (error) => {
  if (error) {
    console.log("making connection failed: ", error);
  } else {
    console.log(`server running on port ${PORT} ...`);
  }
});

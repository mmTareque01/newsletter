import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscriber from "./services/subscriber";
import service from "./services";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5001;
// const expressServer = http.createServer(app);

// Middleware to parse JSON
app.use(express.json());

// CORS setup (for allowing cross-origin requests)
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Authorization, X-Requested-With"
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

app.use(errorHandler)

app.listen(PORT, (error) => {
  if (error) {
    console.log("making connection failed: ", error);
  } else {
    console.log(`server running on port ${PORT} ...`);
  }
});

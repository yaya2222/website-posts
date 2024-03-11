import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import notesRoute from "./routes/notesRoute";
import usersRoute from "./routes/usersRoute";
import morgan from "morgan";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import env from "./ulit/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URL,
    }),
  })
);

app.use("/api/notes",requiresAuth, notesRoute);
// app.use("/api/notes", notesRoute);
app.use("/api/users", usersRoute);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  console.log({errorMessage});
  
  res.status(statusCode).json({ error: errorMessage });
});

export default app;

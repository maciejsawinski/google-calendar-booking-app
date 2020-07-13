import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";
// import cors from "cors";

import AppErrorHandler from "./utils/appErrorHandler.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

app.use(compression());

app.enable("trust proxy");

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(xss());

app.use(
  hpp({
    whitelist: [],
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// routes
app.get("/api/v1/", (req, res) => {
  res.json("OK");
});

// error handlers
app.all("*", (req, res, next) => {
  next(
    new AppErrorHandler(`Can't find ${req.originalUrl} on this server.`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
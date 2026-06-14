import express from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import tasksRoutes from "./routes/tasks.js";

import dotenv from "dotenv";

import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import { logger } from "./Middlewares/logger.js";
import { notFound } from "./Middlewares/notfound.js";
import { errorHandler } from "./Middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";
import { limiter } from "./Middlewares/rateLimiter.js";



dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:52875", "https://dugsiiye.com/"],
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(limiter);

const PORT = process.env.PORT || 5000;



app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Custom Middleware
// app.use(logger);

// routes middleware
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/upload", uploadRoutes);
app.use("/tasks", tasksRoutes);

// Main App Methods

// Method	Purpose

// app.get()	Read data
// app.post()	Create data
// app.put()	Update data
// app.delete()	Delete data
// app.patch()	Partial update
// app.all()	Handle all methods
// app.use()	Middleware
// app.listen()	Start server

// GET route
app.get("/", (req, res) => {
  res.json(users);
});

// Not Found Middleware
app.use(notFound);

// Last Middleware ErrorHandler
app.use(errorHandler);

// connect to Mongodb
mongoose
  .connect(process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO )
  .then(() => console.log("✅ MongoDB connected locally"))
  .catch((error) => console.log("❌ Connection error:", error));

app.listen(PORT, () => {
  console.log(`Server is running on http://local:${PORT}`);
});

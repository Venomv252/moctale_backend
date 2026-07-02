import express from "express";
import authRoutes from "./routes/auth.routes.js";
import checkPhoneRoutes from "./routes/checkPhone.routes.js";
import checkUsernameRoutes from "./routes/checkUsername.routes.js";
import otpRoutes from "./routes/otp.routes.js";

import errorHandler from "./middleware/errorMiddleware.js";
import contentRoutes from "./routes/admincontent.routes.js";
import adminauthRoutes from "./routes/adminauth.routes.js";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://moctale-frontend-q9bz.vercel.app",
      "https://moctale-frontend-fae3.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// users routes
app.use("/api/auth", authRoutes);
app.use("/api/utils", checkPhoneRoutes);
app.use("/api/utils", checkUsernameRoutes);
app.use("/api/utils", otpRoutes);

// content

app.use("/api/admin", adminauthRoutes);
app.use("/api/admin",contentRoutes);

app.use(errorHandler);

export default app;
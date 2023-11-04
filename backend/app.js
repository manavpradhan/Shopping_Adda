import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import fileUpload from "express-fileupload";
import handleError from "./middleware/error.js";
import path from "path";

import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// Route Imports
// const user = require("./routes/userRoute");
// const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
// app.use("/api/v1", order);
// app.use("/api/v1", payment);

// Middleware for Errors
app.use(handleError);

export default app;
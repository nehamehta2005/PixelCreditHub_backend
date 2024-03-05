// import stuff you need
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import fileUpload from "express-fileupload";
import usersRouter from "./routers/usersRouter.js";
import adminRouter from "./routers/adminRouter.js";
import contactUsRouter from "./routers/contactUsRouter.js";
import memberRouter from "./routers/memberRouter.js";
import profileRouter from "./routers/profileRouter.js";
import imageRouter from "./routers/imageRouter.js";
import paymentRouter from "./routers/addPaymentRouter.js";
import forgotPasswordRouter from "./routers/forgotPasswordRouter.js";

// creating express server
const app = express();

// middleware
// middleware to parse any incoming json data
app.use(express.static("public")); // don't touch it plz! best regards, Masouma
app.use(express.json());
app.use(express.static("./views/dist"));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB through mongoose
mongoose
  //.connect("mongodb://localhost:27017/PixelCreditHub")
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.woouwqc.mongodb.net/PixelCreditHub` 
  )
  .then(() => console.log("We connected to DB 😉"))
  .catch((err) => console.log(err));

// middleware morgan
app.use(morgan("tiny"));

// cors middleware
 app.use((req, res, next) => {
  const origin =
    process.env.NODE_ENV === "production"
      ? "https://pixelcredithub.netlify.app"
      : "http://localhost:5173";

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  app.use(cors({ origin, exposedHeaders: ["token"] }));
  next();
}); 




// localhost:5500/users
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/submitContactForm", contactUsRouter);
app.use("/members", memberRouter);
app.use("/profile", profileRouter);
app.use("/images", imageRouter);
app.use("/savePayment", paymentRouter);
app.use("/forgotPassword", forgotPasswordRouter);

//create more routes as required

// middleware to handle errors
app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message || "something went wrong");
});

// the server should listen on port 5500
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("the server is running on port 🎉", PORT);
});

const express = require("express");
const cors = require("cors");
const app = express();
require("colors");
require("dotenv");

const connectDb = require("./config/connectDB");
connectDb();

const port = process.env.PORT || 5000;
const authRouter = require("./routes/main.routes");
const productRouter = require("./routes/product.routes");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    process.env.FRONTEND_MAIN_URL,
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "" }));
app.use(express.urlencoded({ limit: "", extended: true }));

app.use("/api/auth", authRouter); // This route handles all the logic for onboarding of users(Login or signup)
app.use("/api/products", productRouter); // This route handles all the login related to products in the table

app.listen(port, () => {
  console.log(
    "➜".green,
    ` Server running on -`.bold,
    `http://localhost:${port}`.cyan
  );
});

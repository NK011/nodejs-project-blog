const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user");
const { checkForUserCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8080;

mongoose
    .connect("mongodb://127.0.0.1:27017/blogs")
    .then(() => console.log("MongoDB connection established"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForUserCookie("token"));

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user,
    });
});

app.use("/user", userRoutes);

app.listen(PORT, () => console.log("Listening on port " + PORT));

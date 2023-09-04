const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const { v4: uuidv4 } = require("uuid");

const app = express();
const router = require("./router");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

app.use("/route/homepage", checkAuth);

app.use((req, res, next) => {
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

app.use("/route", router);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/route/homepage");
  } else {
    res.render("base", { title: "Login" });
  }
});

app.listen(port, () => {
  console.log(`Listening to the server on http://localhost:${port}`);
});

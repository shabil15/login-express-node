const express = require("express");
const router = express.Router();

const credentials = {
  email: "shabil@gmail.com",
  password: "shabil123",
};

router.post("/login", (req, res) => {
  if (
    req.body.email === credentials.email &&
    req.body.password === credentials.password
  ) {
    req.session.user = req.body.email;

    res.redirect("/route/homepage");
  } else {
    res.render("base", { title: "Invalid User", logout: "Invalid User!" });
  }
});

router.get("/homepage", (req, res) => {
  if (req.session.user) {
    res.render("homepage", { user: req.session.user });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("base", {
        title: "Logout",
        logout: "logout Successfully...!",
      });
    }
  });
});

module.exports = router;

const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const states = require("./states.js")

module.exports = app => {
  // Load signup page
  app.get("/", (req, res) => res.render("dogwalkers"));
  app.get("/signup", (req, res) => res.render("signup", {
    states: states,
  }));
  app.get("/profile", (req, res) => res.render("profile"));
  app.get("/dogwalkers", (req, res) => res.render("dogwalkers"));

  // Load login page
  app.get("/login", (req, res) => res.render("login"));

  // Load profile page
  app.get("/profile", isAuthenticated, (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Example]
    }).then(dbUser => {
      res.render("profile", { user: dbUser });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", isAuthenticated, (req, res) => {
    db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => res.render("404"));
};

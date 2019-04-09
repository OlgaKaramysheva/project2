const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = app => {
  // Load signup page
  app.get("/", (req, res) => res.render("dogwalkers"));
  app.get("/signup", (req, res) => res.render("signup"));
  
 

  // Load login page
  // app.get("/login", (req, res) => res.render("login"));

  // Load profile page
  app.get("/profile", (req, res) => {
    db.User.findAll().then(dbAllUsers => {
      console.log(dbAllUsers);
      res.render("profile", { users : dbAllUsers });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", (req, res) => {
    db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => res.render("404"));
};

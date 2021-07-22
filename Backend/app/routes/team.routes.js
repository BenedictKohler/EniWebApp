module.exports = app => {

    const team = require("../controllers/team.controller.js");
  
    // Retrieve all Users
    app.get("/teams", team.getAll);

  };
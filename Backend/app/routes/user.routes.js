module.exports = app => {

    const user = require("../controllers/user.controller.js");
  
    // Retrieve all Users
    app.get("/users", user.getAll);

  };
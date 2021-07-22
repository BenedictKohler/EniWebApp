module.exports = app => {

    const server = require("../controllers/server.controller.js");
  
    // Retrieve all Servers by Environment Id
    app.get("/servers/:environmentId", server.getAllByEnvironmentId);


    // Adds a new server to the database
    app.post("/server", server.addServer);

  };
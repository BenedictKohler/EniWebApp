module.exports = app => {

    const software = require("../controllers/software.controller.js");
  
    // Retrieve all Software
    app.get("/software", software.getAll);

    // Retrieve all Software by Server Id
    app.get("/software/:serverId", software.getAllByServerId);

    // Add software to the database
    app.post("/software", software.addSoftware);

  };
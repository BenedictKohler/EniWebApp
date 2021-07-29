module.exports = app => {

    const environment = require("../controllers/environment.controller.js");
  
    // Retrieve all Environments
    app.get("/environments", environment.getAll);

    // Add new Environment
    app.post("/environment", environment.addEnvironment);

    // Update environment
    app.put("/environment", environment.updateEnvironment);

  };
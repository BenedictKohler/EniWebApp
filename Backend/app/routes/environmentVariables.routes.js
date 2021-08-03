module.exports = app => {

    const environmentVariables = require("../controllers/environmentVariables.controller.js");
  
    // Retrieve all environment variables by environment id
    app.get("/environmentVariables/:environmentId", environmentVariables.getAllById);

  };
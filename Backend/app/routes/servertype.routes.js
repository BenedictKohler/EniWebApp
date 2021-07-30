module.exports = app => {

    const servertype = require("../controllers/servertype.controller.js");
  
    // Retrieve all ServerTypes
    app.get("/serverTypes", servertype.getAll);

    // Adds a new server type
    app.post("/serverType", servertype.addServerType);

  };
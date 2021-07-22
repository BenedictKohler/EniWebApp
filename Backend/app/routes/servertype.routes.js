module.exports = app => {

    const servertype = require("../controllers/servertype.controller.js");
  
    // Retrieve all ServerTypes
    app.get("/serverTypes", servertype.getAll);

  };
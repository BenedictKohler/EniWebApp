module.exports = app => {

    const windows = require("../helpers/script.windows.js");

    const linux = require("../helpers/script.linux.js");
  
    // Execute windows script
    app.get("/windows", windows.executeFile);

    // Execute linux script
    app.get("/linux", linux.executeFile);

  };
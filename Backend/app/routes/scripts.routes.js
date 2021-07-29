module.exports = app => {

    const windows = require("../helpers/script.windows.js");

    const linux = require("../helpers/script.linux.js");

    const machine = require("../helpers/script.machine.js");
  
    // Execute windows script
    app.get("/windows", windows.executeFile);

    // Execute linux script
    app.get("/linux", linux.executeFile);

    // Gets services running on this machine
    app.get("/runningServices", machine.getServices);

  };
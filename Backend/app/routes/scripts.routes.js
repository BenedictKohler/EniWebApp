module.exports = app => {

    const windows = require("../utils/script.windows.js");

    const linux = require("../utils/script.linux.js");

    const machine = require("../utils/script.machine.js");
  
    // Execute windows script
    app.get("/windows", windows.executeFile);

    // Execute linux script
    app.get("/linux", linux.executeFile);

    // Gets status of servers
    app.post("/serverStatus", machine.getServerStatus);

    // Gets status of service
    app.post("/serviceStatus", machine.getServiceStatus);

    // Starts services on servers
    app.post("/startServices", machine.startServices);

    // Stops services on servers
    app.post("/stopServices", machine.stopServices);

  };
module.exports = app => {

    const userpermission = require("../controllers/userpermission.controller.js");
  
    // Add new user permission
    app.post("/userPermission", userpermission.addUserPermission);

  };
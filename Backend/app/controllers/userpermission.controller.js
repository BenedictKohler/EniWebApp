const UserPermission = require('../models/userpermission.model.js');

// Add user permission to the database
exports.addUserPermission = (req, res) => {

    User.addUserPermission((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while adding a user permission."
          });
        else res.status(200).json(data);
      });
  
};

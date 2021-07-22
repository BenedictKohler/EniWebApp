const User = require('../models/user.model.js');

// Retrieve all Users from the database.
exports.getAll = (req, res) => {

    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.status(200).json(data);
      });
  
};

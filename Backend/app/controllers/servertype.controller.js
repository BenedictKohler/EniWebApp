const ServerType = require('../models/servertype.model.js');

// Retrieve all ServerTypes from the database.
exports.getAll = (req, res) => {

    ServerType.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving servertypes."
          });
        else res.status(200).json(data);
      });
  
};
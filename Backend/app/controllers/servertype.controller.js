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


// Adds a new server type
exports.addServerType = (req, res) => {

  ServerType.addServerType(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding a servertype."
        });
      else res.status(200).json(data);
    });

};


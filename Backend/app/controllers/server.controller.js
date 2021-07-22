const Server = require('../models/server.model.js');

// Retrieve all Servers by environment from the database.
exports.getAllByEnvironmentId = (req, res) => {

    Server.getAllByEnvironmentId(req.params.environmentId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving servers."
          });
        else res.status(200).json(data);
      });
  
};

// Add a new server to the database.
exports.addServer = (req, res) => {

  Server.addServer(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding a server."
        });
      else res.status(200).json(data);
    });

};

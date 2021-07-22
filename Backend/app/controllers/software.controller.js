const Software = require('../models/software.model.js');

// Retrieve all Software from the database.
exports.getAll = (req, res) => {

    Software.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving software."
          });
        else res.status(200).json(data);
      });
  
};

// Retrieve all software by server from the database.
exports.getAllByServerId = (req, res) => {

  Software.getAllByServerId(req.params.serverId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving software."
        });
      else res.status(200).json(data);
    });

};

// Add software to the database.
exports.addSoftware = (req, res) => {

  Software.addSoftware(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding software."
        });
      else res.status(200).json(data);
    });

};
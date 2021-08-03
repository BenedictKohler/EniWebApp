const EnvironmentVariables = require('../models/environmentVariables.model.js');

// Retrieve all Environments from the database.
exports.getAllById = (req, res) => {

  EnvironmentVariables.getAllById(req.params.environmentId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving environments."
      });
    else res.status(200).json(data);
  });

};
const Environment = require('../models/environment.model.js');

// Retrieve all Environments from the database.
exports.getAll = (req, res) => {

    Environment.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving environments."
          });
        else res.status(200).json(data);
      });
  
};

// Add environment to the database.
exports.addEnvironment = (req, res) => {

  Environment.addEnvironment(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding an environment."
        });
      else res.status(200).json(data);
    });

};
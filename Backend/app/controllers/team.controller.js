const Team = require('../models/team.model.js');

// Retrieve all Teams from the database.
exports.getAll = (req, res) => {

    Team.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving teams."
          });
        else res.status(200).json(data);
      });
  
};

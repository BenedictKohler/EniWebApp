const Pipeline = require('../models/pipeline.model.js');

// Add pipeline to the database.
exports.addPipeline = (req, res) => {

  Pipeline.addPipeline(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding a pipeline."
        });
      else res.status(200).json(data);
    });

};
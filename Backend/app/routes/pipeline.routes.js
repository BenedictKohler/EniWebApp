module.exports = app => {

    const pipeline = require("../controllers/pipeline.controller.js");

    // Adds a new pipeline to the database
    app.post("/pipeline", pipeline.addPipeline);

  };
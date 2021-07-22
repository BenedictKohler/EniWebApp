const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Helper = require('../helpers/Helper.js');

const Pipeline = (pipeline) => {
    this.armId = pipeline.armId;
    this.ansibleId = pipeline.ansibleId;
    this.environmentId = pipeline.environmentId;
}

Pipeline.addPipeline = (pipeline, result) => {
    let query = 'insert into Pipeline (armId, ansibleId, environmentId) values (@armId, @ansId, @envId); select @@identity';
    let params = [{name: 'armId', type: TYPES.Int, value: pipeline.armId}, {name: 'ansId', type: TYPES.Int, value: pipeline.ansibleId},
    {name: 'envId', type: TYPES.Int, value: pipeline.environmentId}];
    
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Pipeline model: " + err.message);
            result(null, err);
            return;
        }
        else {
            let pipelineId = rows[0][0].value; // Inserted id
            result(null, {pipelineId: pipelineId});
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
}

module.exports = Pipeline;
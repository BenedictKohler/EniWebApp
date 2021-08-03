const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Utils = require('../utils/Utils.js');

const EnvironmentVariables = (env) => {
    this.variable = env.variable;
    this.value = env.value;
    this.last_updated= env.last_updated;
    this.environmentId = env.environmentId;
}

EnvironmentVariables.getAllById = (environmentId, result) => {
    let query = 'select * from EnvironmentVariables where environmentId = @environmentId';
    let params = [{name: 'environmentId', type: TYPES.Int, value: environmentId}];

    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Environment model: " + err.message);
            result(null, err);
            return;
        }
        else {
          let res = Utils.convertToJsonList(rows);
          result(null, res);
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
}

module.exports = EnvironmentVariables;
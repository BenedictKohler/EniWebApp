const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Helper = require('../helpers/Helper.js');

const Environment = (env) => {
    this.name = env.name;
    this.status = env.status;
    this.startDate = env.startDate;
    this.endDate = env.endDate;
    this.teamId = env.teamId;
    this.ownerId = env.ownerId;
}

Environment.getAll = result => {
    let query = 'select environmentId, fullName, name, status, startDate, endDate, teamName from environment join team on environment.teamId = team.teamId left outer join Person on Environment.ownerId = Person.personId';
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Environment model: " + err.message);
            result(null, err);
            return;
        }
        else {
          let res = Helper.convertToJsonList(rows);
          result(null, res);
        }
    });
    connection.execSql(request);
}

Environment.addEnvironment = (env, result) => {
    let query = 'insert into Environment (name, status, teamId, ownerId) values (@name, @status, @teamId, @ownerId); select @@identity';
    let params = [{name: 'name', type: TYPES.VarChar, value: env.name}, {name: 'status', type: TYPES.VarChar, value: env.status},
    {name: 'teamId', type: TYPES.Int, value: env.teamId}, {name: 'ownerId', type: TYPES.Int, value: env.ownerId}];
    
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Environment model: " + err.message);
            result(null, err);
            return;
        }
        else {
            let envId = rows[0][0].value; // Inserted id
            result(null, {environmentId: envId});
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
}

module.exports = Environment;
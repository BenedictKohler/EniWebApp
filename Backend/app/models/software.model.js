const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Helper = require('../helpers/Helper.js');

const Software = (software) => {
    this.name = software.name;
    this.version = software.version;
    this.serverId = software.serverId;
    this.location = software.location;
}

Software.getAll = result => {
    let query = 'select softwareId, version, name, location, serverId from software';
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Software model: " + err.message);
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

Software.getAllByServerId = (serverId, result) => {
    let query = 'select softwareId, version, name, location, serverId from software where serverId = @id';
    let params = [{name: 'id', type: TYPES.Int, value: serverId}];
    
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Server model: " + err.message);
            result(null, err);
            return;
        }
        else {
          let res = Helper.convertToJsonList(rows);
          result(null, res);
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
}

Software.addSoftware = (software, result) => {
    let query = 'insert into software (name, version, location, serverId) values (@name, @version, @location, @serverId); select @@identity';
    let params = [{name: 'name', type: TYPES.VarChar, value: software.name}, {name: 'version', type: TYPES.VarChar, value: software.version},
    {name: 'location', type: TYPES.VarChar, value: software.location}, {name: 'serverId', type: TYPES.Int, value: software.serverId}];
    
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Software model: " + err.message);
            result(null, err);
            return;
        }
        else {
            let softwareId = rows[0][0].value; // Inserted id
            result(null, {softwareId: softwareId});
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
}

module.exports = Software;
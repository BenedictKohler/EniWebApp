const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Helper = require('../helpers/Helper.js');

const Server = (server) => {
    this.name = server.name;
    this.ipAddress = server.ipAddress;
    this.environmentId = server.environmentId;
    this.serverTypeId = server.serverTypeId;
}

Server.getAllByEnvironmentId = (envId, result) => {
    let query = 'select Server.serverTypeId, serverId, name, serverType, ipAddress from Server join ServerType on Server.serverTypeId = ServerType.serverTypeId where environmentId = @id';
    let params = [{name: 'id', type: TYPES.Int, value: envId}];
    
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

Server.addServer = (server, result) => {
    let query = 'insert into server (name, serverTypeId, ipAddress, environmentId) values (@name, @id, @ip, @envId); select @@identity';
    let params = [{name: 'name', type: TYPES.VarChar, value: server.name}, {name: 'id', type: TYPES.Int, value: server.serverTypeId},
    {name: 'ip', type: TYPES.VarChar, value: server.ipAddress}, {name: 'envId', type: TYPES.Int, value: server.environmentId}];
    
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Server model: " + err.message);
            result(null, err);
            return;
        }
        else {
          let serverId = rows[0][0].value; // Inserted id
          result(null, {serverId: serverId});
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
}

module.exports = Server;
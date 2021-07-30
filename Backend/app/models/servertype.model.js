const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Helper = require('../helpers/Helper.js');

const ServerType = (st) => {
    this.serverType = st.serverType;
}

ServerType.getAll = result => {
    let query = 'select serverTypeId, serverType from servertype';
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in ServerType model: " + err.message);
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

ServerType.addServerType = (serverType, result) => {
    let query = 'insert into servertype (serverType) values (@serverType); select @@identity';
    let params = [{name: 'serverType', type: TYPES.VarChar, value: serverType.serverType}];

    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in ServerType model: " + err.message);
            result(null, err);
            return;
        }
        else {
            let serverTypeId = rows[0][0].value; // Inserted id
            result(null, {serverTypeId: serverTypeId});
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
}

module.exports = ServerType;
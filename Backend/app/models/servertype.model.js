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

module.exports = ServerType;
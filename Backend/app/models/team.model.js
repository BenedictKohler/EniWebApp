const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Helper = require('../helpers/Helper.js');

const Team = (team) => {
    this.teamName = team.teamName;
}

Team.getAll = result => {
    let query = 'select teamId, teamName from Team';
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in Team model: " + err.message);
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

module.exports = Team;
const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Helper = require('../helpers/Helper.js');

const User = (user) => {
    this.username = user.username;
    this.password = user.password;
    this.fullName = user.fullName;
    this.teamId = user.teamId;
}

User.getAll = result => {
    let query = 'select personId, fullName, teamId from Person';
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in User model: " + err.message);
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

module.exports = User;
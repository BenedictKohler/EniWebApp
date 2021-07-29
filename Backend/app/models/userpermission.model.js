const connection = require('./db.js');
const { Request } = require('tedious');
const TYPES = require("tedious").TYPES;
const Helper = require('../helpers/Helper.js');

const UserPermission = (permission) => {
    this.personId = permission.personId;
    this.environmentId = permission.environmentId;
    this.permissionId = permission.permissionId;
}


UserPermission.addUserPermission = (permission, result) => {
    let query = 'insert into userpermission (personId, environmentId, permissionId) values (@personId, @environmentId, @permissionId); select @@identity';
    let params = [{name: 'personId', type: TYPES.Int, value: permission.personId}, {name: 'environmentId', type: TYPES.Int, value: permission.environmentId},
    {name: 'permissionId', type: TYPES.Int, value: permission.permissionId}]
    
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.log("Error in UserPermission model: " + err.message);
            result(null, err);
            return;
        }
        else {
          let userPermissionId = rows[0][0].value; // Inserted id
          result(null, {userPermissionId: userPermissionId});
        }
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
    });

    connection.execSql(request);
}

module.exports = UserPermission;
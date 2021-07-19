const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

const { Connection, Request } = require("tedious");
const TYPES = require("tedious").TYPES;

const config = {
  authentication: {
    options: {
      userName: "bkohler",
      password: "Tennisgolf@1"
    },
    type: "default"
  },
  server: "dbpipelineserver.database.windows.net",
  options: {
    database: "EniPipeline",
    encrypt: true,
    rowCollectionOnRequestCompletion: true
  }
};

app.get("/environments", async (req, res) => {
    const connection = new Connection(config);
    connection.on("connect", (err) => {
            if (err) {
              console.log(err.message);
              res.status(500).json({"Error": err.message});
            }
            else {
                let query = 'select environmentId, fullName, name, status, startDate, endDate, teamName from environment join team on environment.teamId = team.teamId left outer join Person on Environment.ownerId = Person.personId';
                const request = new Request(query, (err, rowCount, rows) => {
                  if (err) res.status(500).json({"Error": err.message});
                  else {
                    let tempRes = convertToJsonList(rows);
                    res.status(200).json(tempRes);
                  }
                  connection.close();
                });
                connection.execSql(request);
            }
        });

    connection.connect();
});

app.get("/servers/:environmentId", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }
          else {
              let query = 'select serverId, name, type, ipAddress from server where environmentId = @id';
              let params = [{name: 'id', type: TYPES.Int, value: req.params.environmentId}];
              const request = new Request(query, (err, rowCount, rows) => {
                if (err) res.status(500).json({"Error": err.message});
                else {
                  let tempRes = convertToJsonList(rows);
                  res.status(200).json(tempRes);
                }
                connection.close();
              });

              params.forEach(param => {
                request.addParameter(param.name, param.type, param.value);
              });

              connection.execSql(request);
          }
      });

  connection.connect();
});

app.get("/software", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }
          else {
              let query = 'select softwareId, version, name, location, serverId from software';
              const request = new Request(query, (err, rowCount, rows) => {
                if (err) res.status(500).json({"Error": err.message});
                else {
                  let tempRes = convertToJsonList(rows);
                  res.status(200).json(tempRes);
                }
                connection.close();
              });
              connection.execSql(request);
          }
      });

  connection.connect();
});

app.get("/software/:serverId", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }
          else {
              let query = 'select softwareId, version, name, location, serverId from software where serverId = @id';
              let params = [{name: 'id', type: TYPES.Int, value: req.params.serverId}];
              const request = new Request(query, (err, rowCount, rows) => {
                if (err) res.status(500).json({"Error": err.message});
                else {
                  let tempRes = convertToJsonList(rows);
                  res.status(200).json(tempRes);
                }
                connection.close();
              });

              params.forEach(param => {
                request.addParameter(param.name, param.type, param.value);
              });

              connection.execSql(request);
          }
      });

  connection.connect();
});

app.get("/users", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }
          else {
              let query = 'select personId, fullName, teamId from Person';
              const request = new Request(query, (err, rowCount, rows) => {
                if (err) res.status(500).json({"Error": err.message});
                else {
                  let tempRes = convertToJsonList(rows);
                  res.status(200).json(tempRes);
                }
                connection.close();
              });
              connection.execSql(request);
          }
      });

  connection.connect();
});

app.get("/teams", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }
          else {
              let query = 'select teamId, teamName from Team';
              const request = new Request(query, (err, rowCount, rows) => {
                if (err) res.status(500).json({"Error": err.message});
                else {
                  let tempRes = convertToJsonList(rows);
                  res.status(200).json(tempRes);
                }
                connection.close();
              });
              connection.execSql(request);
          }
      });

  connection.connect();
});

app.post("/server", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }
          else {
              let query = 'insert into server (name, type, ipAddress, environmentId) values (@name, @type, @ip, @envId)';
              let params = [{name: 'name', type: TYPES.VarChar, value: req.body.name}, {name: 'type', type: TYPES.VarChar, value: req.body.type},
              {name: 'ip', type: TYPES.VarChar, value: req.body.ipAddress}, {name: 'envId', type: TYPES.Int, value: req.body.environmentId}];
              const request = new Request(query, (err, rowCount, rows) => {
                if (err) res.status(500).json({"Error": err.message});
                else {
                  res.sendStatus(200);
                }
                connection.close();
              });

              params.forEach(param => {
                request.addParameter(param.name, param.type, param.value);
              });

              connection.execSql(request);
          }
      });

  connection.connect();
});

app.post("/environment", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {

          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }

          else {

              let query1 = 'insert into Environment (name, status, teamId, ownerId) values (@name, @status, @teamId, @ownerId); select @@identity';
              let params1 = [{name: 'name', type: TYPES.VarChar, value: req.body.name}, {name: 'status', type: TYPES.VarChar, value: req.body.status},
              {name: 'teamId', type: TYPES.Int, value: req.body.teamId}, {name: 'ownerId', type: TYPES.Int, value: req.body.ownerId}];

              let query2 = 'insert into Pipeline (armId, ansibleId, environmentId) values (@armId, @ansId, @envId)';

              const request1 = new Request(query1, (err, rowCount, rows) => {
                if (err) {
                  res.status(500).json({"Error": err.message});
                  connection.close();
                } 
                else {
                  let envId = rows[0][0].value; // Get inserted id

                  let params2 = [{name: 'armId', type: TYPES.Int, value: req.body.armId}, {name: 'ansId', type: TYPES.Int, value: req.body.ansibleId},
                  {name: 'envId', type: TYPES.Int, value: envId}];

                  const request2 = new Request(query2, (err, rowCount, rows) => {
                    if (err) res.status(500).json({"Error": err.message});
                    else res.sendStatus(200);
                    connection.close();
                  });

                  params2.forEach(param => {
                    request2.addParameter(param.name, param.type, param.value);
                  });

                  connection.execSql(request2);

                }
              });

              params1.forEach(param => {
                request1.addParameter(param.name, param.type, param.value);
              });

              connection.execSql(request1);
          }
      });

  connection.connect();
});

function convertToJsonList(result) {
    let res = [];
    for (var row of result) {
        let item = {};
        for (var obj of row) item[obj.metadata.colName] = obj.value;
        res.push(item);
    }
    return res;
}

app.listen(PORT, () => console.log('Listening on port ' + PORT.toString()));
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

// Execute a shell script
const { exec, spawn, execFile } = require('child_process');


// exec launches shell and returns all the ouput at the end
app.get("/exec", async (req, res) => {

  exec('ls', (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout:\n${stdout}`);

    res.status(200).json({"Shell output": stdout});

  });

});

app.get("/execFileLinux", async (req, res) => {

  // Had to first do chmod u+x filename
  execFile(__dirname + '/Hello.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  
    console.log(`stdout:\n${stdout}`);
  });

});

app.get("/execFileWindows", async (req, res) => {

  // Had to first do chmod u+x filename
  execFile(__dirname + '/Hello.bat', (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  
    console.log(`stdout:\n${stdout}`);
  });

});

// spawn doesn't launch shell and it returns data through streams
app.get("/spawn", async (req, res) => {

  const child = spawn('ls');

  child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
  });
  
  child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
  });

});

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

app.get("/serverTypes", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }
          else {
              let query = 'select serverTypeId, serverType from servertype';
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
              let query = 'select Server.serverTypeId, serverId, name, serverType, ipAddress from Server join ServerType on Server.serverTypeId = ServerType.serverTypeId where environmentId = @id';
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
              let query = 'insert into server (name, serverTypeId, ipAddress, environmentId) values (@name, @id, @ip, @envId)';
              let params = [{name: 'name', type: TYPES.VarChar, value: req.body.name}, {name: 'id', type: TYPES.Int, value: req.body.serverTypeId},
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

app.post("/software", async (req, res) => {
  const connection = new Connection(config);
  connection.on("connect", (err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({"Error": err.message});
          }
          else {
              let query = 'insert into software (name, version, location, serverId) values (@name, @version, @location, @serverId)';
              let params = [{name: 'name', type: TYPES.VarChar, value: req.body.name}, {name: 'version', type: TYPES.VarChar, value: req.body.version},
              {name: 'location', type: TYPES.VarChar, value: req.body.location}, {name: 'serverId', type: TYPES.Int, value: req.body.serverId}];
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
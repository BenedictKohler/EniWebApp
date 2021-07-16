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
              let query = 'select name, type, ipAddress from server where environmentId = @id';
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
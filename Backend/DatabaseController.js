const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

const { Connection, Request } = require("tedious");

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
    encrypt: true
  }
};

const connection = new Connection(config);

app.get("/environments", async (req, res) => {
    try {
        connection.on("connect", err => {
            if (err) console.log(err);
            else {
                let result = executeQuery('select name, status, startDate, endDate, teamName from environment join team on environment.teamId = team.teamId;');
                if (result != null) res.status(200).json(result);
                else res.sendStatus(500);
            }
        });
        connection.connect();
    } catch (err) {
        res.status(500).json({"Error": err.message});
    }
});

function executeQuery(query) {

    const request = new Request(query, (err, rowCount) => {
        if (err) console.error(err.message);
        else console.log(`${rowCount} row(s) returned`);
      }
    );
    
    let ans = [];

    request.on("row", columns => {
        columns.forEach(column => {
          console.log("%s\t%s", column.metadata.colName, column.value);
        });
      });

    connection.execSql(request);
}

app.listen(PORT, () => console.log('Listening on port ' + PORT.toString() ));
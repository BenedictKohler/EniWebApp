module.exports = {
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
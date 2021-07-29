// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Constants
const PORT = 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

// Set up routes
require('./app/routes/environment.routes.js')(app);
require('./app/routes/servertype.routes.js')(app);
require('./app/routes/server.routes.js')(app);
require('./app/routes/software.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/team.routes.js')(app);
require('./app/routes/pipeline.routes.js')(app);
require('./app/routes/userpermission.routes.js')(app);
require('./app/routes/scripts.routes.js')(app);

// Listen for requests
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT.toString());
});

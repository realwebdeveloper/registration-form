const express = require('express');
const app = express();
var api = require('./apiRouter');

app.use('/api', api);

app.listen(8080, () => {'Server running on port 8080'});

let express = require('express');
let router = express.Router();

require('./bookRoutes')(router);

module.exports = router;
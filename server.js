let express = require('express'), app = express(), port = process.env.PORT || 8080;
let bodyParser = require('body-parser');
let router = require('./app/routes/index');

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
    console.log("start server" + port);
});
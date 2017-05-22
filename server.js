require('dotenv').config();
var express = require('express');
var port = process.env.PORT || 8080;
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { url: req.protocol + '://' + req.get('host') });
});

app.get('/api/whoami/', (req, res) => {
    var result = {
        "ipaddress": null,
        "language": null,
        "software": null,
    };
    result.ipaddress = req.ip;
    result.language = req.headers['accept-language'].split(',')[0];
    result.software = req.headers['user-agent'].split(')')[0].split('(')[1];
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

app.listen(port, () => {
    console.log('Server started on port '+ port);
});
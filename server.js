//Install express server
const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const credentials = {
  key: fs.readFileSync(__dirname + '/ssl/example.key'),
  cert: fs.readFileSync(__dirname + '/ssl/example.crt')
}

const app = express();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/website'));

app.route('/sitemap.xml').get((req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/sitemap.xml')));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/website/index.html'));
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(443);

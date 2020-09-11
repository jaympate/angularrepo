//Install express server
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const compression = require('compression');
const forceSsl =  (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

const options = {
  key: fs.readFileSync(__dirname + '/ssl/example.key'),
  cert: fs.readFileSync(__dirname + '/ssl/example.crt')
};
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/website'));
app.use(compression());
app.use(forceSsl)

app.route('/sitemap.xml').get((req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/sitemap.xml')));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/website/index.html'));
});

const https = require('https')

https.createServer(options, app)
  .listen(process.env.PORT || 8080, () => {
    console.log("server running!")
  });

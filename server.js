//Install express server
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const sslRedirect = require('heroku-ssl-redirect');

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/website'));
app.use(compression());
app.use(sslRedirect());

app.route('/sitemap.xml').get((req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/sitemap.xml')));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/website/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

const path = require('path');
const express = require('express');
const cors = require('express-cors');
const compression = require('compression');
const bodyParser = require('body-parser')
const port = (process.env.PORT || 3000);
const app = express();
const users = require('./routes/users');

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

const buildFolder = process.env.NODE_ENV !== 'production' ? 'app' : 'public';

app.use(express.static(`${buildFolder}`));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, `./${buildFolder}/index.html`))
});

app.use('/api', users);

app.listen(port);

console.log(`Listening at http://localhost:${port}`);
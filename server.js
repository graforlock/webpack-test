const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const chokidar = require('chokidar');
const watcher = chokidar.watch('./views');
watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing module cache from server....")
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]dist[\/\\]/.test(id)) delete require.cache[id]
    })
  })
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', (req, res, next) => {
    res.render('index', {});
});

app.listen(8080);
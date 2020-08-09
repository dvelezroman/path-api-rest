const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mapsRouter = require('./routes/maps');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/ping', function (req, res) {
	res.json({ status: true, data: '[PONG] up and running.' });
});

app.use('/maps', mapsRouter);

app.get('/', function (req, res) {
	res.status(200).json({ status: true, data: 'Default route.' });
});

app.listen(PORT, function () {
	console.log(`Server is running on http://localhost:${PORT}`);
});

let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoDb = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

mongoose.connect(mongoDb.db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Database sucessfully connected ')
},
error => {
	console.log('Database error: ' + error)
})


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

require('./routes/store.routes')(app);
require('./routes/product.routes')(app);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log('Listening on port ' + port)
})
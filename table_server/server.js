const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/db.config');


app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

const db = require('./models');
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB connected...');
}).catch((err) => {
    console.error("Connection error", err);
    process.exit();
});

require('./routes/task.routes')(app);

app.get('/', (req, res) => {
    res.send('Hello Welcome to index page');
});

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

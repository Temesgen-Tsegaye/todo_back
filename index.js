
const express = require('express');
const bodyparser = require('body-parser');
const cors = require("cors");
const dotenv=require('dotenv')

dotenv.config()
const app = express();

app.use(bodyparser.json());
app.use(cors());

const PORT=process.env.PORT||3001

app.use(bodyparser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const taskRoute = require('./route/school_route');
app.use('/task', taskRoute)

app.listen(PORT, () => {
    console.log('Server started on port 3001');
});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const {MONGOURI} = require('./keys');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected', () => {
    console.log("connected to mongoo")
});
mongoose.connection.on('error', (err) => {
    console.log("err connecting", err)
});

// app.get('/', (req, res) => {
//     res.send("Hello, world!");
// });

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
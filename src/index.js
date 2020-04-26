const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const server = require('http').createServer(app);
app.use(cors())

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://dev:1234@cluster0-awdga.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use(require('./routes'));

server.listen(process.env.PORT || 3000);
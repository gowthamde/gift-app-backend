const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const giftRoutes = require('./api/routes/gifts');
const userRoutes = require('./api/routes/users');
const compression = require('compression');

mongoose.connect('mongodb://localhost/gift', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', () => {
    console.log('error ocurred while connecting db')
});
db.on('open', function() {
    console.log('connection established..')
});

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.header({ "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization" })
    next();
})


app.use('/gifts', giftRoutes);
app.use('/users', userRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
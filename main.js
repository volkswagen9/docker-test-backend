const express = require('express');
const mongoose = require('mongoose');
const nosqlRouter = require('./nosql');
const sqlRouter = require('./sql');
const sql2Router = require('./sql2');
const apiKeyAuth = require('./auth'); 


const app = express();
// Connect to MonoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Middleware
app.use(express.json())

// With API KEY
app.use(apiKeyAuth);

// Mount routers
app.use('/nosql', nosqlRouter)
app.use('/sql', sqlRouter)
app.use('/mysql', sql2Router)

app.listen(3000)
// server.js
const express = require('express');
const app = express();
app.use(express.json());

const usersRouter = require('./Routes/users');
const helpseekersRouter = require('./Routes/helpseekers');
const donorsRouter = require('./Routes/donors');
const categoriesRouter = require('./Routes/categories');
const requestsRouter = require('./Routes/request');


app.use('/users', usersRouter);
app.use('/helpseekers', helpseekersRouter);
app.use('/donors', donorsRouter);
app.use('/categories', categoriesRouter);
app.use('/requests', requestsRouter);



app.listen(3000, () => console.log('Server running on port 3000'));
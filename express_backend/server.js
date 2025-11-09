// server.js
const express = require('express');
const cors = require('cors'); // ✅ Add CORS support

const app = express();

// Middlewares
app.use(cors()); // <-- allow cross-origin requests
app.use(express.json());

// Routers
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

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

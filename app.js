require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const errorHandler = require('./app/middleware/errorHandler');

const dbConnect = require(path.join(__dirname, '/app/model/init'));
dbConnect();

require(path.join(__dirname, '/app/middleware/bootstrap'))(app);
require(path.join(__dirname, '/app/routes/unprotectedRoutes'))(app);


app.all('*', (req, res) => res.redirect('/'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port: ${port}`));

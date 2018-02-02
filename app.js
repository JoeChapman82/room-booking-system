require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const errorHandler = require(path.join(__dirname, '/app/middleware/errorHandler'));
const authorisation = require(path.join(__dirname, '/app/middleware/authorisation'));
const roleAuthorisation = require(path.join(__dirname, '/app/middleware/roleAuthorisation'));

const dbConnect = require(path.join(__dirname, '/app/model/init'));
dbConnect();

require(path.join(__dirname, '/app/middleware/bootstrap'))(app);
require(path.join(__dirname, '/app/routes/unprotectedRoutes'))(app);

app.use(authorisation);
app.all('/admin/*', roleAuthorisation.admin);
app.all('/super/*', roleAuthorisation.super);

require(path.join(__dirname, '/app/routes/routes'))(app);


app.all('*', (req, res) => res.redirect('/'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port: ${port} in ${process.env.NODE_ENV} mode`));

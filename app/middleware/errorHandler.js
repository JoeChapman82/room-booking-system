const redirects = ('../controllers/redirects');

module.exports = (err, req, res, next) => {
    console.log('---------------------------------------');
    console.log(err);
    if(process.env.NODE_ENV !== 'production') {
        res.status(500).send(`Got an error:<br \>
            ${err}<br \>
            Stacktrace:<br \>
            ${err.stack}`);
    } else {
        redirects.goneWrong(req, res);
    }
};

const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    fs.writeFile(path.join(__dirname, '../data/data.csv'), '1, 2, 3 \n', (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log('File Cleared');
        }
        return next();
    });
};

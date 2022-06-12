const fileLoader = require('../loaders/file');
const nullLoader = require('../loaders/null');

module.exports = ({ discard, } = {}) => ({
    test: /\.html$/,
    use: discard ? [
        nullLoader()
    ] : [
        fileLoader()
    ],
});

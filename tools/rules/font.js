const fileLoader = require('../loaders/file');
const nullLoader = require('../loaders/null');

module.exports = ({ discard, } = {}) => ({
    test: /\.(eot|woff2|woff|ttf|otf)/,
    use: discard ? [
        nullLoader()
    ] : [
        fileLoader()
    ],
});

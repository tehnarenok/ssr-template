const { ProvidePlugin, } = require('webpack');

module.exports = ({ target, }) => {
    const provideOptions = { React: 'react', };

    if (target === 'web') {
        provideOptions.Buffer = [ 'buffer', 'Buffer' ];
    }

    return new ProvidePlugin(provideOptions);
};

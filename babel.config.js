module.exports = {
    presets: [
        '@babel/env',
        '@babel/react',
        '@babel/preset-typescript'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        '@loadable/babel-plugin'
    ],
};

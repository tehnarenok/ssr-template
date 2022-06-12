const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    hmrPath: '/__webpack_hmr',
    assetsPath: isDevelopment ? '/build/assets' : '/build/assets',
};

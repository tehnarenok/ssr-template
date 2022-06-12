const quickStart = `
This application is created using reactor and server rendering. Express is used as the server
`;

const webpack = `
For building web version using webpack.
All configs getting from entries.
You can modify config in tools/*.config.js
`;

const entries = `
Entries
`;

const routing = `
routing
`;

const client = `
client
`;

const server = `
server
`;

const components = `
components
`;

const data: {[key: string]: string} = {
    'Quick start': quickStart,
    Webpack: webpack,
    Entries: entries,
    Routing: routing,
    Client: client,
    Server: server,
    Components: components,
};

export default data;

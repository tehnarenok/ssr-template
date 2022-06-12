/* eslint-disable no-console */
import fs from 'fs';
import { Console } from 'console';

const { LOGS_DIR, NODE_ENV, } = process.env;

if (NODE_ENV === 'development') {
    const access = fs.createWriteStream(LOGS_DIR + '/debug.log', { flags: 'a', });
    const error = fs.createWriteStream(LOGS_DIR + '/error.log', { flags: 'a', });

    console = new Console({
        stdout: access,
        stderr: error,
        inspectOptions: {
            colors: true,
            maxStringLength: 120,
            maxArrayLength: 3,
        },
    });

    const originalLog = console.log;
    const originalInfo = console.info;

    console.log = function () {
        originalLog.call('INFO', new Date().toISOString(), ...arguments);
    };

    console.info = function () {
        originalInfo.call('', 'INFO', new Date().toISOString(), ...arguments);
    };
}

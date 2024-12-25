/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { logTransport } from './elastic';

const ENV = process.env;
let indexPrefix = 'logging-api-';
if (ENV.NODE_ENV === 'localhost') {
    indexPrefix = indexPrefix.concat('local');
} else if (ENV.NODE_ENV === 'DEVELOPMENT') {
    indexPrefix = indexPrefix.concat('dev');
} else if (ENV.NODE_ENV === 'QA') {
    indexPrefix = indexPrefix.concat('qa');
} else if (ENV.NODE_ENV === 'PRODUCTION') {
    indexPrefix = indexPrefix.concat('prod');
}

class Logger {
    info(msg: string, data: any) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.info(msg, metaData);
    }

    warn(msg: string, data: any) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.warn(msg, metaData);
    }

    http(msg: string, data: any) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.http(msg, metaData);
    }

    child(data: any) {
        const logger = logTransport(indexPrefix);
        const child = logger.child(data);
        child.http('Child logger created');
    }

    error(msg: string, data: any) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.error(msg, metaData);
    }

    debug(msg: string, data: any) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.debug(msg, metaData);
    }
}

export default new Logger();

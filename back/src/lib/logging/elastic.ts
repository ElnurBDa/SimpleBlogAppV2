/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createLogger, format, transports } from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { v1 as uuidv1 } from 'uuid';

const { combine, timestamp, errors, json } = format;
const ENV = Bun.env as Record<string, string>;
const levels = {
    error: 0,
    warn: 1,
    http: 2,
    info: 3,
    debug: 4
};

interface LogData {
    level: string;
    message: string;
    meta: {
        stack?: string;
        data?: any;
    };
    timestamp?: string;
}

const elasticTransport = (spanTracerId: string, indexPrefix: string) => {
    const esTransportOpts = {
        level: 'debug',
        indexPrefix,
        indexSuffixPattern: 'YYYY-MM-DD',
        transformer: (logData: LogData) => {
            const spanId = spanTracerId;
            return {
                '@timestamp': new Date(),
                severity: logData.level,
                stack: logData.meta.stack,
                message: logData.message,
                span_id: spanId,
                utcTimestamp: logData.timestamp,
                data: JSON.stringify(logData.meta.data),
                ...logData.meta.data
            };
        },
        clientOpts: {
            maxRetries: 50,
            requestTimeout: 10000,
            sniffOnStart: false,
            node: ENV.ELASTIC_URL || 'https://es:9200',
            auth: {
                username: ENV.ELASTIC_USER || 'elastic',
                password: ENV.ELASTIC_PASSWORD || 'changeme'
            },
            tls: {
                rejectUnauthorized: false
            },
            ssl: {
                rejectUnauthorized: false
            }
        }
    };
    return esTransportOpts;
};

export const logTransport = (indexPrefix: string) => {
    const spanTracerId = uuidv1();
    const transport = new transports.File({
        filename: './logs/app.log',
        maxsize: 10 * 1024 * 1024,
        maxFiles: 1
    });
    const logger = createLogger({
        level: 'debug',
        levels,
        format: combine(timestamp(), errors({ stack: true }), json()),
        transports: [
            transport,
            new ElasticsearchTransport({
                ...elasticTransport(spanTracerId, indexPrefix)
            })
        ],
        handleExceptions: true
    });
    if (ENV.NODE_ENV === 'localhost') {
        logger.add(
            new transports.Console({ format: format.splat(), level: 'debug' })
        );
    }
    return logger;
};

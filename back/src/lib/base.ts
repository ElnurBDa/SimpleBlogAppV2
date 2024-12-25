import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import cors from '@elysiajs/cors';
import Logger from './logging/log';

export const getBaseApp = () => {
    return new Elysia()
        .guard({ // Logger Middleware
            beforeHandle: ({ request, body, params, headers }) => {
                Logger.http('request', {
                    url: request.url,
                    method: request.method,
                    headers,
                    body,
                    params
                });
            },
            afterHandle: ({ response, set }) => {
                Logger.http('response', {
                    response,
                    status: set.status
                });
            }
        })
        .use(swagger())
        .use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        }))
        .get('/', () => 'Nothing to see here');
};

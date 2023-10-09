import { createClient } from 'redis';

export const client = createClient({
    password: 'cC3WPcUYJMGVoSdAXmWrmr3CqTPz7lG1',
    socket: {
        host: 'redis-11725.c3.eu-west-1-1.ec2.cloud.redislabs.com',
        port: 11725
    }
});
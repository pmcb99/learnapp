import { createClient } from 'redis';

// connect to redis
export const redisClient = createClient({
    password: 'cC3WPcUYJMGVoSdAXmWrmr3CqTPz7lG1',
    socket: {
        host: 'redis-11725.c3.eu-west-1-1.ec2.cloud.redislabs.com',
        port: 11725
    }
});

redisClient.on('error', function (error) {
    console.error(error);
});

redisClient.on('connect', function () {
    console.log('Redis client connected');
});

async function connectRedis() {
    await redisClient.connect();
}

connectRedis();



import { createClient, RedisClientType } from "redis";

const redisClient: RedisClientType = createClient()

// Connect to Redis
redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch(() => {
    console.error('Failed to connect to Redis');
});

export { redisClient };
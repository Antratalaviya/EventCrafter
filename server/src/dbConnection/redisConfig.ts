// import { createClient, RedisClientType } from "redis";

// const redisPass = process.env.REDIS_PASSWORD || "tbzkjdkxwNcKWOfoMYpJuxwVHneLjIQg";
// const redisHost = process.env.REDIS_HOST || "redis";
// const redisPort = process.env.REDIS_PORT || 6379;

// const redisClient: RedisClientType = createClient({
//     url: `redis://:${redisPass}@${redisHost}:${redisPort}`
// });

// // Connect to Redis
// redisClient.connect().then(() => {
//     console.log('Connected to Redis');
// }).catch((err) => {
//     console.error('Failed to connect to Redis', err);
// });

// export { redisClient };


// import dotenv from 'dotenv';
import { createClient } from 'redis';

// config access to ProcessEnv objest
// dotenv.config();

// configure connection to redis instance
const clientOptions = {
	password: process.env.REDIS_KEY,
	socket: {
		host: 'redis-15326.c289.us-west-1-2.ec2.cloud.redislabs.com',
		port: 15326
	}
};

const client = createClient(clientOptions);
client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
console.log("connected to redis")
await client.set('key', 'value');
const value = await client.get('key');
// await client.disconnect();


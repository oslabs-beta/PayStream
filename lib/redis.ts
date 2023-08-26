
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

export const client = createClient(clientOptions);
client.on('error', (err: Object) => console.log('Redis Client Error', err));

export const redisConnect = async () => {
	await client.connect();
	console.log("connected to redis")
}


// await client.set('key', 'value');
// const value = await client.get('key');
// await client.disconnect();


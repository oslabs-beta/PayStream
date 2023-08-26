// NextRequest object from 
import { NextRequest, NextResponse } from "next/server";

// id generator used below for tutorial
import { nanoid } from "nanoid"

// import client object to interact with redis and DB connection function from our redis.ts file
import { client, redisConnect } from "../../../lib/redis";


// hard-coded post request for adding information to redis
export const POST = async (req: NextRequest): Promise<NextResponse | undefined> => {
	try {
		// need to implement handling to identify if the socket is open; this works for hot reload, but will need to be stable when in production
		await redisConnect() //open redis connection on hot reload

		const body = await req.json()
		const { text, tags } = body
		const newInfoId = nanoid()

		// add newData to list in redis key-value storage
		await client.rPush("newList", newInfoId)

		// add data based on comment ID to a set stored as the value with the comment id as the key
		await client.sAdd(`tags:${newInfoId}`, tags)

		// retrieve full list of values stored in array at "newList" key
		console.log("redis test list", await client.lRange("newList", 0, -1))
		console.log("redis test set", await client.SMEMBERS(`tags:${newInfoId}`))

		return new NextResponse('OK');
	}
	catch (err) {
		console.log(err)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
import { NextRequest } from "next/server";
import nanoid from "nanoid"
// post request for adding information to redis
export const POST = async (req: NextRequest) => {
	try {

		const body = await req.json()
		const { text, tags } = body
		const newInfoId = nanoid()
		// add newData to list

		return new Response('OK');
	}
	catch (err) {
		console.log(err)
	}
}
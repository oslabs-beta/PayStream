import { NextResponse } from "next/server";
import { getToken } from "sf-jwt-token";

export async function GET(req: Request) {
    const { TEST_CLIENT_ID, TEST_USERNAME, TEST_URL, BASE64_PRIVATE_KEY } = process.env;
    // convert the base64 private key into a string
    const privateKey = Buffer.from(BASE64_PRIVATE_KEY, 'base64').toString('utf8');

    try {
      // gets a new (if it hasn't expired it will send the active token) access token from sales force
      const jwtTokenResponse = await getToken({
        iss: TEST_CLIENT_ID,
        sub: TEST_USERNAME,
        aud: TEST_URL,
        privateKey: privateKey,
      });
      
      return NextResponse.json({ accessToken: jwtTokenResponse.access_token })
      }
     catch (error) {
      if (error instanceof Error) {
          console.error('Error:', error);
      }
      return NextResponse.json({ error: error });
    }
}
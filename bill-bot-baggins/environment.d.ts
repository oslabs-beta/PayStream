namespace NodeJS {
  interface ProcessEnv {
    STRIPE_SECRET_KEY: string;
    JWT_SECRET: Secret;
    BASE64_PRIVATE_KEY: string;
    TEST_CLIENT_ID: string;
    TEST_USERNAME: string;
    TEST_URL: string;
  }
}
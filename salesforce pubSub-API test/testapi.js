import PubSubApiClient from 'salesforce-pubsub-api-client';

const {
  SALESFORCE_LOGIN_URL,
  SALESFORCE_TOKEN,
  SALESFORCE_USERNAME,
  SALESFORCE_ORG_ID,
} = process.env;

const accessToken =
  'Bearer 00DEi000000QlCz!AQEAQCLDGwsl9lO3a29ZQn_QbG1_2rmERR_c3QfK6KgNDNxzqDxgTpXn3yXeVPoU5EOr5YqxWNk8GRqA_4BPyHikcJCtgmHV';
const instanceUrl = 'https://escsocal--lc001.sandbox.my.salesforce.com';
const organizationId = '00DEi000000QlCz';
const username = 'admin@escsc.org';

async function run() {
  try {
    // console.log(process.env.SALESFORCE_LOGIN_URL);
    console.log('instanceUrl: ', instanceUrl);
    const client = new PubSubApiClient();
    await client.connectWithAuth(
      accessToken,
      instanceUrl,
      organizationId,
      username
    );

    // Subscribe to a single incoming account change event
    const eventEmitter = await client.subscribe('/event/Payment_Change__e', 4);

    // Handle incoming events
    eventEmitter.on('data', (event) => {
      console.log(
        `Handling ${event.payload.ChangeEventHeader.entityName} change event ${event.replayId}`
      );
      console.log(JSON.stringify(event, null, 2));
      console.log(
        'changed fields: ',
        JSON.stringify(event.payload.ChangeEventHeader.changedFields)
      );
    });
  } catch (error) {
    console.error(error);
  }
}

run();

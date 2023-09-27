import PubSubApiClient from 'salesforce-pubsub-api-client';

const {
  SALESFORCE_LOGIN_URL,
  SALESFORCE_TOKEN,
  SALESFORCE_USERNAME,
  SALESFORCE_ORG_ID,
} = process.env;

const accessToken =
  'Bearer 00DEi000000QlCz!AQEAQA.xt0sBlBbNl_Ni08pkC3mpwfN5v4v2L._B.YWAX.pSigO.zBCRMC20510Gjct8XHOHw9LycW6clJUXbVb5kzNAFSz.';
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

    const eventEmitter = await client.subscribe(
      '/data/npe01__OppPayment__ChangeEvent',
      2
    );

    // Handle incoming events
    /**
     * info that we need from payment event
     * record ID
     * change field
     */
    eventEmitter.on('data', (event) => {
      console.log(
        `Handling ${event.payload.ChangeEventHeader.entityName} change event ${event.replayId}`
      );
      console.log(JSON.stringify(event, null, 2));
      console.log(
        'changed fields: ',
        JSON.stringify(event.payload.ChangeEventHeader.diffFields)
      );
    });
  } catch (error) {
    console.error(error);
  }
}

run();

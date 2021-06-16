const { EventHubProducerClient } = require('@azure/event-hubs');
require('dotenv').config();

const connectionString = process.env['EVENTHUB_CONNECTION_STRING'] || '';
const eventHubName = process.env['EVENTHUB_NAME'];

async function main() {
  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  // Prepare a batch of three events.
  const batch = await producer.createBatch();
  batch.tryAdd({ body: {'ID': 1001, 'msg': 'First event'} });
  batch.tryAdd({ body: 'Second event' });
  batch.tryAdd({ body: 'Third event' });

  // Send the batch to the event hub.
  await producer.sendBatch(batch);

  // Close the producer client.
  await producer.close();

  console.log('A batch of three events have been sent to the event hub');
}

main().catch((err) => {
  console.log('Error occurred: ', err);
});

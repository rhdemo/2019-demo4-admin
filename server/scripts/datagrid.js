const infinispan = require('infinispan');

const DATAGRID_HOST = process.env.DATAGRID_HOST || "127.0.0.1";
const DATAGRID_PORT = process.env.DATAGRID_HOTROD_PORT || 11222;


async function put(key, value, clientOptions) {
  console.log(`=========== ${DATAGRID_HOST}:${DATAGRID_PORT} ${JSON.stringify(clientOptions)} =================`);
  const client = await infinispan.client({port: DATAGRID_PORT, host: DATAGRID_HOST}, clientOptions);
  await client.put(key, JSON.stringify(value));
  client.disconnect();
}

async function remove(key, clientOptions) {
  console.log(`=========== ${DATAGRID_HOST}:${DATAGRID_PORT} ${JSON.stringify(clientOptions)} =================`);
  const client = await infinispan.client({port: DATAGRID_PORT, host: DATAGRID_HOST}, clientOptions);
  await client.remove(key);
  client.disconnect();
}

async function readAll(clientOptions) {
  console.log(`=========== ${DATAGRID_HOST}:${DATAGRID_PORT} ${JSON.stringify(clientOptions)} =================`);
  const client = await infinispan.client({port: DATAGRID_PORT, host: DATAGRID_HOST}, clientOptions);
  let clientIterator = await client.iterator(1);
  let entry = {done: true};

  do {
    entry = await clientIterator.next();
    if (!entry.done) {
      console.log('key = "' + entry.key + '"');
      console.log('value = "' + entry.value + '"');
    }
  } while (!entry.done);

  client.disconnect();
}

async function clear(clientOptions) {
  console.log(`=========== ${DATAGRID_HOST}:${DATAGRID_PORT} ${JSON.stringify(clientOptions)} =================`);
  const client = await infinispan.client({port: DATAGRID_PORT, host: DATAGRID_HOST}, clientOptions);
  console.log("Clearing all values");
  await client.clear();
  client.disconnect();
}



(async function () {

  // const data = {
  //   key: "game",
  //   value: {
  //     dispatchActive: false,
  //     simulationActive: false
  //   }
  // };

  const defaultOptions = {};
  const optOptions = {cacheName: "DispatchEvents"};
  const playerOptions = {cacheName: "players"};
  // await put(data.key, data.value);
  // await remove(data.key, clientOptions);
  // await clear(clientOptions);


  await readAll(defaultOptions);
  await readAll(optOptions);
  readAll(playerOptions);
})();
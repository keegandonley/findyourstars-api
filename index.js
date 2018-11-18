'use strict';
const Datastore = require('@google-cloud/datastore');
const projectId = 'sachacks-222818';

exports.http = (request, response) => {
  // CORS
  response.set('Access-Control-Allow-Origin', "*");
  response.set('Access-Control-Allow-Methods', 'GET');

  // Retrieve Data
  const datastore = new Datastore({
    projectId: projectId,
  });
  const query = datastore.createQuery('Eclipse');
  datastore.runQuery(query).then((result) => {
    response.status(200).send(result ? result : null);
  }).catch((e) => {
    response.status(400).send(e ? e : 'Unknown error');
  })
};

exports.event = (event, callback) => {
  callback();
};

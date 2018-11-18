'use strict';
const Datastore = require('@google-cloud/datastore');
const Axios = require('axios');
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

exports.iss = (request, response) => {
  // CORS
  response.set('Access-Control-Allow-Origin', "*");
  response.set('Access-Control-Allow-Methods', 'GET');

  // Retrieve Data
  Axios.get('http://api.open-notify.org/iss-now.json')
    .then(function (resp) {
      response.status(200).send(resp.data);
    })
    .catch(function (error) {
      console.log(error);
      response.status(200).send(error);
    });
};

exports.conditions = (request, response) => {
  // CORS
  response.set('Access-Control-Allow-Origin', "*");
  response.set('Access-Control-Allow-Methods', 'GET');
  console.log(request);

  const lat = request.query.lat || request.body.lat || '38.338130';
  const long = request.query.long || request.body.long || '-122.689520';

  Axios.get(`https://api.darksky.net/forecast/1cea53e53fcd807974e54ed67d32a76e/${lat},${long}`)
    .then(function (resp) {
      response.status(200).send(resp.data);
    })
    .catch(function (error) {
      console.log(error);
      response.status(200).send(error);
    });
}

exports.event = (event, callback) => {
  callback();
};

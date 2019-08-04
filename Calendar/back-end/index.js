const {
  db,
  collection,
  url,
  port
} = require('./conf.json');

const {
  error,
  successful
} = require('./utils');

const methods = {
  POST: require('./methods/post'),
  PUT: require('./methods/put'),
  GET: require('./methods/get'),
  DELETE: require('./methods/delete')
};

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const http = require('http');

http.createServer((req, res) => {
  MongoClient.connect(url, {
    useNewUrlParser: true
  })
    .then(connect => {
      const targetDB = connect.db(db);
      const targetCollection = targetDB.collection(collection);

      if (methods[req.method]) {
        methods[req.method](req, res, targetCollection);
      } else if (methods[req.method] === 'OPTIONS') {
        successful(res, 'Successful connection');
      } else {
        error(res, 'Not such method');
      }
    })
    .catch(err => error(res, 'Unable to connect'));
}).listen(port);

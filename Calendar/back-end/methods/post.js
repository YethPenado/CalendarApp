const {
  error,
  successful,
  isInside,
  isValidDate,
} = require('../utils');

const qs = require('querystring');

function POST(req, res, collection) {
  if (isInside('/api/v1/events', req.url)) {
    let body = '';
    req
      .on('data', chunk => {
        if (body.length > 1e6) error(res, 'Error');
        body += chunk;
      })
      .on('end', () => {
        const {
          favorite,
          notes,
          name,
          date,
          hour
        } = qs.parse(body);
        if (name && isValidDate(date) && hour) {
          collection.insertOne({
            favorite,
            notes,
            name,
            date,
            hour: +hour
          }, err => {
            successful(res, 'Successfully registered event');
          });
        } else {
          error(res, 'Properties needed');
        }
      });
  } else {
    error(res, 'Not such path')
  }
}

module.exports = POST;
const {
  error,
  successful,
  isInside,
  path,
  setId
} = require('../utils');

const qs = require('querystring');

function PUT(req, res, collection) {
  if (isInside('/api/v1/events', req.url)) {
    const _id = setId(path(req.url)[4]);
    let body = '';
    req
      .on('data', chunk => {
        if (body.length > 1e6) error(res, 'Error');
        body += chunk;
      })
      .on('end', () => {
        if (_id) {
          const { favorite, notes, name } = qs.parse(body);
          collection.updateOne({ _id },
            { $set: { favorite, notes, name } }, err => {
              successful(res, 'Event updated');
            });
        } else {
          error(res, 'Please enter a valid ID');
        }
      });
  } else {
    error(res, 'Not such path')
  }
}

module.exports = PUT;
const {
  error,
  successful,
  isInside,
  path,
  setId
} = require('../utils');

function DELETE(req, res, collection) {
  console.log(path(req.url)[4]);
  if (isInside('/api/v1/events', req.url)) {
    const _id = setId(path(req.url)[4]);
    if (_id) {
      collection.deleteOne({ _id }, err => {
        successful(res, 'Event successfully removed');
      });
    } else {
      error(res, 'Please enter a valid ID');
    }
  } else {
    error(res, 'Not such path')
  }
}

module.exports = DELETE;
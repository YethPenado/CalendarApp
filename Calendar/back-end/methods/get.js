const {
  error,
  successful,
  isValidDate,
  isInside,
  queryURL,
  path
} = require('../utils');
const url = require('url');

function GET(req, res, collection) {
  if (isInside('/api/v1/months', req.url)) {
    const year = +path(req.url)[4];
    const month = +path(req.url)[5];
    if (year && month) {
      const date = new RegExp(`${month}/.*/${year}`, 'gi');
      collection.find({
        date
      })
        .toArray((err, result) => {
          if (err) return error(res, 'Error');
          successful(res, result);
        });
    } else {
      const currentMonth = (new Date().getMonth() + 1) + '';
      const currentYear = (new Date().getFullYear()) + '';
      const date = new RegExp(`${currentMonth}/.*/${currentYear}`);
      collection.find({ date })
        .toArray((err, result) => {
          if (err) return error(res, 'Error');
          successful(res, result);
        });
    }
  } else if (isInside('/api/v1/events', req.url)) {
    const today = new Date();
    const selectedDate = url.parse(req.url)
      .pathname.split('events')[1]
      .split('/').filter(letter => letter).join('/');
    const currentDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const date = isValidDate(selectedDate) ? selectedDate : currentDate;
    const { search } = queryURL(req.url);

    collection.find({
      date,
      name: new RegExp(search ? search : '')
    })
      .toArray((err, result) => {
        if (err) return error(res, 'Error');
        successful(res, result);
      });
  } else {
    error(res, 'URL not found');
  }
}

module.exports = GET;
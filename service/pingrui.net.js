'use strict';

const cheerio = require('cheerio');

const url = 'http://pingrui.net/wn';

const handle = data => {
  const result = {
    header: [],
    data: []
  };

  const $ = cheerio.load(data);

  const table = $('#ip_list');
  const tr = table.find('tr');

  tr.each(function (i, el) {
    if (i === 0) {
      //  Get Header
      $(el).find('th').each(function (j, ele) {
        result.header.push($(ele).text().trim());
      });
      return;
    }

    const obj = [];
    $(el).find('td').each(function (j, ele) {
      if (j === 0) {
        obj.push($(ele).find('img').attr('alt'));
      } else if (j === 6 ||  j === 7) {
        obj.push($(ele).find('div').attr('title'));
      } else {
        obj.push($(ele).text().trim());
      }
    });
    result.data.push(obj);
  });

  //  Format all of IP
  result.ip = result.data.map(i => i[1]);
  result.url = url;

  return result;
};

module.exports = {
  url,
  handle
};

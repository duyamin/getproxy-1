'use strict'

const path = require('path');
const fs = require('fs');

const run = require(path.join(__dirname, 'lib', 'run'));

const getServiceList = () => new Promise((resolve, reject) => {
  fs.readdir(path.join(__dirname, 'service'), (err, stats) => {
    if (err) {
      reject(err);
    }
    resolve(stats);
  });
});

const main = async () => {
  const serviceList = await getServiceList();

  const services = [];
  serviceList.forEach(item => {
    services.push(require(path.join(__dirname, 'service', item)));
  });

  const result = [];
  for (let i = 0; i < services.length; i += 1) {
    const service = services[i]
    const data = await run({
      url: service.url
    });
    result.push(service.handle(data.toString()));
  }

  return result;
}

module.exports = main;

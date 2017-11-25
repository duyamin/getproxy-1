'use strict';

const Koa = require('koa');
const app = new Koa();

app.listen(12315, () => {
  console.log('Server listening at port 12315');
});

const path = require('path')

const run = require(path.join(__dirname, 'run'))
run({
  url: 'http://pingrui.net/wn'
}, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString())
})

module.exports = () => {
  console.log(2333)
}

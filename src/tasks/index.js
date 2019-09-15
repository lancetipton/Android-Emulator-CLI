const list = require('./list')
const run = require('./run')

module.exports = {
  [list.name]: list,
  [run.name]: run,
}
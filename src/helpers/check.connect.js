const mongoose = require('mongoose')

const countConnect = () => {
  const numCollection = mongoose.connections.length
  console.log('Number of collection:::', numCollection)
}

module.exports = {
  countConnect,
}

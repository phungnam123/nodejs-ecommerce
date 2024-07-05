const mongoose = require('mongoose')

const connectString = process.env.MONGO_URI
mongoose
  .connect(connectString)
  .then(() => console.log('Connnect MongoDB Success'))
  .catch((err) => console.log('Err Connected!'))

if (1 === 1) {
  mongoose.set('debug', true)
  mongoose.set('debug', { color: true })
}

module.exports = mongoose

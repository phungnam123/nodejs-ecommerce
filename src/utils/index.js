const _ = require('lodash')

const getInfoData = ({ fiels = [], object = {} }) => {
  return _.pick(object, fiels)
}

module.exports = {
  getInfoData,
}
// // The source object
// let obj = {
//   Name: 'GeeksforGeeks',
//   password: 'gfg@1234',
//   username: 'your_geeks',
// }
// // Using the _.pick() method
// console.log(_.pick(obj, ['password', 'username']))

///{password: "gfg@1234", username: "your_geeks"}

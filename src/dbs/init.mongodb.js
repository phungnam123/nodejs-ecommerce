const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')
const {
  db: { host, port, name },
} = require('../configs/config.mongodb')

const connectString = `mongodb://${host}:${port}/${name}`

console.log('ConnectString:', connectString)

class Database {
  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true), mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then((_) =>
        console.log('Connect Mongo DB Sucessfull PRO', countConnect())
      )
      .catch((err) => console.log('Connected Failed !'))
  }

  static getInstace() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongoDB = Database.getInstace()

module.exports = instanceMongoDB

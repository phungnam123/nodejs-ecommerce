// lv 0
// const config = {
//   app: {
//     port: 8080,
//   },
//   db: {
//     host: 'localhost',
//     port: '27017',
//     name: 'db',
//   },
// }

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 8000,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'dbDev',
  },
}

const pro = {
  app: {
    port: process.env.PRO_DB_HOST || 8000,
  },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || 'dbProduct',
  },
}

const config = { dev, pro }

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]

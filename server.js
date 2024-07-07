const app = require('./src/app')

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => console.log('Server is disconnected...'))
})

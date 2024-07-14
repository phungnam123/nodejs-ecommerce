const { CREATED, OK } = require('../core/success.response')
const AccessSerivce = require('../services/access.service')

class AcessController {
  login = async (req, res, next) => {
    new OK({
      message: 'Success',
      metadata: await AccessSerivce.login(req.body),
    }).send(res)
  }

  signUp = async (req, res, next) => {
    new CREATED({
      message: 'Register Ok',
      metadata: await AccessSerivce.signup(req.body),
    }).send(res)
  }
}

module.exports = new AcessController()

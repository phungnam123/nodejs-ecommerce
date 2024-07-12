const AccessSerivce = require('../services/access.service')
const { OK, CREATED } = require('../core/success.response')

class AcessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: 'Register OK',
      metadata: await AccessSerivce.signup(req.body),
    }).send(res)
  }
}

module.exports = new AcessController()

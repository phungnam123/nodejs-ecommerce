const AccessSerivce = require('../services/access.service')

class AcessController {
  signUp = async (req, res, next) => {
    try {
      console.log('P:::[Signup]:::', req.body)
      return res.status(201).json(await AccessSerivce.signup(req.body))
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AcessController()

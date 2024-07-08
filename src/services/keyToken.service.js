const keyTokenModel = require('../models/keyToken.model')

class keyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    const tokens = await keyTokenModel.create({
      user: userId,
      publicKey,
      privateKey,
    })
    return tokens ? tokens.publicKey : null
  }
}

module.exports = keyTokenService

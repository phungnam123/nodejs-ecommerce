const keyTokenModel = require('../models/keyToken.model')

class keyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    const publicKeyString = publicKey.toString()
    const tokens = await keyTokenModel.create({
      user: userId,
      publicKey: publicKeyString,
    })
    return tokens ? tokens.publicKey : null
  }
}

module.exports = keyTokenService

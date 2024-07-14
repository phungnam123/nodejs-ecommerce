const keyTokenModel = require('../models/keyToken.model')

class keyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      //lv0
      //  const tokens = await keyTokenModel.create({
      //    user: userId,
      //    publicKey,
      //    privateKey,
      //  })
      //  return tokens ? tokens.publicKey : null
      const filter = {
        user: userId,
      }
      const update = {
        publicKey,
        privateKey,
        refreshToken,
        refreshTokenUsed: [],
      }
      const options = {
        upsert: true,
        new: true,
      }
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      )
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}

module.exports = keyTokenService

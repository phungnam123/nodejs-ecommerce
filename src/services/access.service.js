const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

const keyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const {
  ConflictError,
  ForbiddenError,
  AuthFailureError,
} = require('../core/error.response')
const { findByEmail } = require('./shop.service')

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
}
class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    // check email in dbs
    const foundShop = await findByEmail({ email })
    if (!foundShop) {
      throw new ForbiddenError('Shop not register')
    }
    //check password
    const matchPass = await bcrypt.compare(password, foundShop.password)
    if (!matchPass) throw new AuthFailureError('Authentication error!')
    //create AT and RT and save
    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')
    //generate tokens
    const tokens = await createTokenPair(
      { userId: foundShop._id, email },
      publicKey,
      privateKey
    )

    await keyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    })

    //get data
    return {
      shop: getInfoData({
        fiels: ['_id', 'name', 'email'],
        object: foundShop,
      }),
      tokens,
    }
  }

  static signup = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean()

    if (holderShop) {
      throw new ForbiddenError('Shop already register!')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newShop = await shopModel.create({
      name,
      email,
      password: hashPassword,
      roles: RoleShop['SHOP'],
    })

    if (newShop) {
      //create public key and private key
      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')

      //createkeytoken
      const keyStore = await keyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      })
      if (!keyStore) {
        return {
          code: 'xxxx',
          message: 'KeyStore error!',
        }
      }

      //create token pair
      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      )

      return {
        shop: getInfoData({
          fiels: ['_id', 'name', 'email'],
          object: newShop,
        }),
        tokens,
      }
    }
  }
}

module.exports = AccessService

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

const keyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
}
class AccessService {
  static signup = async ({ name, email, password }) => {
    try {
      const holderShop = await shopModel.findOne({ email }).lean()

      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already register',
        }
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

        console.log('Create tokens success:::', tokens)

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fiels: ['_id', 'name', 'email'],
              object: newShop,
            }),
            tokens,
          },
        }
      }
      return {
        code: 201,
        metada: null,
      }
    } catch (error) {
      return {
        code: 'xxxx',
        message: error.message,
        status: 'error',
      }
    }
  }
}

module.exports = AccessService

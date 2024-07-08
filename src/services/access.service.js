const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
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
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
          },
        })
        console.log({ privateKey, publicKey })

        //createkeytoken
        const publicKeyString = await keyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        })
        console.log('Publickey String', publicKeyString)
        if (!publicKeyString) {
          return {
            code: 'xxxx',
            message: 'PublicKey String error!',
          }
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString)
        console.log('Public key object:::', publicKeyObject)

        //create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKeyObject,
          privateKey
        )
        console.log('Create token success:::', tokens)

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

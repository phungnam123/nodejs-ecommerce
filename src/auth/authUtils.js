const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '2 days',
    })
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    })

    const decode = await JWT.verify(accessToken, publicKey)
    console.log('Decode verify:::', decode)

    return { accessToken, refreshToken }
  } catch (error) {
    console.error('Error:::', error)
  }
}

module.exports = {
  createTokenPair,
}

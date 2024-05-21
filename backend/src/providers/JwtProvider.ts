import JWT from 'jsonwebtoken'

const generateToken = async (secretSignature: string, tokenLife: string, user = {}) => {
  try {
    return await JWT.sign(user, secretSignature, { algorithm: 'HS256', expiresIn: tokenLife })

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error generating token: ${error.message}`)
    }
  }
}
// check one token valid 
const verifyToken = async (secretSignature: string, token: string) => {
  try {
    return await JWT.verify(token, secretSignature)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error generating token: ${error.message}`)
    }
  }
}

export const JwtProvider = {
  generateToken,
  verifyToken,
}
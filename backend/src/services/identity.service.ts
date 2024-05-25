import { env } from "../assets/config/environment";
import { IReqIdentifyClient } from "../assets/interfaces/client.interface";
import { JwtProvider } from "../providers/JwtProvider";

// Import services
import { UserModel } from "../models/user.model";

const authenticate = async (data: IReqIdentifyClient) => {
  try {
    // Find user
    const user = await UserModel.findOneByUsername(data.username);

    if(!user) return;

    // Generate token
    const accessToken = await JwtProvider.generateToken(
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_SECRET_LIFE,
      data
    )

    return {
      user,
      token: accessToken
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ getAnswer ~ error:", error)
    }
  }
}

const verifyToken = async (authorization: string) => {
  const [type, token] = authorization.split(" ");

  try {
    const decoded = await JwtProvider.verifyToken(env.ACCESS_TOKEN_SECRET_SIGNATURE, token)

    if (decoded && typeof decoded !== 'string' && decoded.hasOwnProperty('username')) {
      const user = await UserModel.findOneByUsername(decoded['username'])
      return user;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ verifyToken ~ error:", error)
    }
  }
}


export const IdentityService = {
  authenticate,
  verifyToken
}

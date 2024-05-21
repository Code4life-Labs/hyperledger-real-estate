import { env } from "../assets/config/environment";
import { IReqIdentifyClient } from "../assets/interfaces/client.interface";
import { JwtProvider } from "../providers/JwtProvider";

const authenticate = async (data: IReqIdentifyClient) => {
  try {

    // handle tokens
    const accessToken = await JwtProvider.generateToken(
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_SECRET_LIFE,
      data
    )

    return accessToken
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ getAnswer ~ error:", error)
    }
  }
}


export const IdentityService = {
  authenticate
}

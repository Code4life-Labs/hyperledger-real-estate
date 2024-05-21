
import { env } from '../assets/config/environment'
import { HttpStatusCode } from '../assets/utilities/constants'
import { UserModel } from '../models/user.model'
import { JwtProvider } from '../providers/JwtProvider'
import { NextFunction, Request, Response } from 'express'

const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  const clientAccessToken = req.body?.accessToken
  delete req.body?.accessToken
  if (!clientAccessToken) {
    return res.status(401).json({
      errors: 'Unauthorized'
    });
  }

  try {
    // Phuong: Thực hiện giải mã token xem nó có đúng không
    const decoded = await JwtProvider.verifyToken(env.ACCESS_TOKEN_SECRET_SIGNATURE, clientAccessToken)

    //Quan trọng: nếu như cái token hợp lệ, thì sẽ cần hpải lưu thông tin giải mã được vào req, để sử dụng cho các phần xử lý phía sau
    // req.body.jwtDecoded = decoded
    if (decoded && typeof decoded !== 'string' && decoded.hasOwnProperty('username')) {
      const user = await UserModel.findOneByUsername(decoded['username'])
      console.log("🚀 ~ isAuthorized ~ user:", user)
      if (user?.role !== 'admin')
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          errors: "Don't have perrmission to complete this task"
        })
    }
    //Cho phép request đi tiếp
    next()

  } catch (error) {
    if (error instanceof Error) {
      if (error?.message?.includes('jwt expired')) {
        // cais accessToken nó bị hết hạn thì mình trả về cho FE
        return res.status(HttpStatusCode.EXPIRED).json({
          errors: 'Need to refresh token'
        })
      }
      //Nếu như cái accessToken nó không hợp lệ do bất kì điều gì thì chúng ta sẽ trả về mã lỗi 410
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        errors: 'Unauthorized'
      })
    }
  }
}

export const AuthMiddleware = {
  isAuthorized
}
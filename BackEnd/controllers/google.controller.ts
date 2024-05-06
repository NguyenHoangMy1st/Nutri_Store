import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { UserModel } from '../database/models/user.model'
import { signToken } from '../utils/jwt'
import { GoogleConfig } from '../constants/config'

const client = new OAuth2Client(GoogleConfig.GOOGLE_CLIENT_ID)

const googleLoginController = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Lấy token từ header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token not provided' })
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GoogleConfig.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { email, name, picture } = payload

    // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
    let user = await UserModel.findOne({ email })

    if (!user) {
      // Nếu người dùng chưa tồn tại, tạo mới trong cơ sở dữ liệu
      user = new UserModel({
        email,
        name,
        profilePicture: picture,
        // Thêm các thông tin khác nếu cần thiết
      })

      await user.save()
    }

    // Tạo token
    const authToken = signToken(
      {
        userId: user._id,
        // Thêm các thông tin khác vào payload nếu cần thiết
      },
      GoogleConfig.SECRET_KEY,
      GoogleConfig.EXPIRE_ACCESS_TOKEN
    ) // Truyền giá trị SECRET_KEY vào đây

    // Gửi token về cho client
    res.json({ success: true, token: authToken })
  } catch (error) {
    console.error('Error authenticating with Google:', error)
    res.status(401).json({ success: false, message: 'Authentication failed' })
  }
}

export default googleLoginController

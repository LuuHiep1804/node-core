import { generateToken } from "../helpers/auth.js";
import { UserModel } from "../models/UserModel.js";
import { TokenModel } from "../models/TokenModel.js";
import bcrypt from "bcrypt";

const accessTokenSecret = 'dkcmntrata';
const accessTokenLife = '2h';
const refreshTokenSecret = 'kickhtoxoi';
const refreshTokenLife = '4h';

export const login = (req, res) => {
    let token;
    try {
        const email = req.body.email;
        const password = req.body.password;
        let user = await UserModel.findOne({email: email});
        if(user) {
            let isMatch = await bcrypt.compare(password, user.password);
            if(isMatch) {
                const userData = {
                    _id: user._id,
                    nickname: user.nickname
                };
                let accessToken = generateToken(userData, accessTokenSecret, accessTokenLife);
                let refreshToken = generateToken(userData, refreshTokenSecret, refreshTokenLife);
                token = new TokenModel(user._id, accessToken, refreshToken);
                await res.status(200).json({
                    message: success,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            }else {
                await res.status(400).json('Sai thông tin đăng nhập');
            }
        }else {
            await res.status(400).json('Sai thông tin đăng nhập');
        }
    } catch (err) {
        console.log('err' + err);
        await res.status(500).json({
            message: "Lỗi hệ thống",
            error: err
        });
    } finally {
        if(token) {
            await token.save();
        }
    }
}

import { generateToken } from "../helpers/auth.js";
import { UserModel } from "../models/UserModel.js";
import { TokenModel } from "../models/TokenModel.js";
import bcrypt from "bcrypt";

const accessTokenSecret = 'dkcmntrata';
const accessTokenLife = '5m';
const refreshTokenSecret = 'kickhtoxoi';
const refreshTokenLife = '10m';

export const login = async (req, res) => {
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
                    email: user.email,
                    nickname: user.nickname,
                    role: user.role
                };
                let accessToken = generateToken(userData, accessTokenSecret, accessTokenLife);
                let refreshToken = generateToken(userData, refreshTokenSecret, refreshTokenLife);
                token = new TokenModel({
                    user_id: user._id,
                    access: accessToken,
                    refresh: refreshToken
                })
                res.status(200).json({
                    success: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            }else {
                res.status(400).json({
                    message: "Sai thông tin đăng nhập"
                });
            }
        }else {
            res.status(400).json({
                message: "Sai thông tin đăng nhập"
            });
        }
    } catch (err) {
        console.log('err' + err);
        res.status(500).json({
            message: "Lỗi hệ thống",
            error: err
        });
    } finally {
        if(token) {
            await token.save();
        }
    }
}

import jwt from 'jsonwebtoken';
import { TokenModel } from '../models/TokenModel.js';

let accessTokenSecret = 'dkcmntrata';

export const verifyToken = async (req, res, next) => {
    const tokenFromClient  = req.headers["x-access-token"] ||  req.body.token || req.query.token;
    let tokenDb;
    try {
        tokenDb = await TokenModel.findOne({access: tokenFromClient});
    } catch (err) {
        res.json({
            success: false,
            message: "Có lỗi khi xử lý yêu cầu. Vui lòng đăng nhập lại"
        })
    }
    if(tokenFromClient && tokenDb) {
        try {
            let decoded = jwt.verify(tokenFromClient, accessTokenSecret);
            req.user = decoded;
            console.log(req.user);
            next();
        } catch (err) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
    }else {
        res.status(403).json({
            success: false,
            message: 'Không tìm thấy Token trong request'
        })
    }
}

export const authRole = (role) => {
    return (req, res, next) => {
        if(req.user.data.role !== role) {
            res.status(401).json({
                success: false,
                message: 'Not allowed'
            })
        }
        next();
    }
}
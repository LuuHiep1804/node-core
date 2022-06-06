import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
    try {
        const infoUser = req.body;
        let oldUser = await UserModel.findOne({email: infoUser.email});
        if(oldUser) {
            await res.json({
                success: false,
                message: "Email đã được sử dụng"
            })
        }else {
            let encryptedPasswood = await bcrypt.hash(infoUser.password, 10);
            let user = new UserModel({
                email: infoUser.email,
                password: encryptedPasswood,
                nickname: infoUser.nickname,
                phone: infoUser.phone
            });
            let saveUser = await user.save();
            console.log(saveUser);
            await res.status(200).json({
                success: true,
                message: "Đã thêm người dùng thành công",
                username: user.nickname
            })
        }
    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}

export const getUser = async (req, res) => {
    try {
        if(req.query.nickname) {
            const queryNickname = req.query.nickname;
            let user = await UserModel.findOne({nickname : queryNickname});
            if(user) {
                user.password = "";
                await res.status(200).json(user);
            }else {
                await res.json({
                    success: false,
                    message: "Không tìm thấy nickname"
                });
            }

        }else {
            let users = await UserModel.find();
            users = users.map((user) => {
                user.password = "";
                return user;
            })
            res.status(200).json(users);
        }
    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}
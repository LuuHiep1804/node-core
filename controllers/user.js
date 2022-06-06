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
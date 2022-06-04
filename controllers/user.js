import { UserModel } from "../models/UserModel.js";

export const addUser = async (req, res) => {
    try {
        const infoUser = req.body;
        const checkAvailable = await UserModel.find({email: infoUser.email});
        if(checkAvailable == null) {
            let user = new UserModel({
                email: infoUser.email,
                password: infoUser.password,
                nickname: infoUser.nickname,
                phone: infoUser.phone
            });
            let saveUser = await user.save();
            console.log(saveUser);
            res.status(200).json({
                success: true,
                message: "Đã thêm người dùng thành công.",
                username: user.nickname
            })
        }
    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}
import jwt from "jsonwebtoken";

export const generateToken = (user, signature, timeLife) => {
    const userData = {
        _id: user._id,
        email: user.email,
        nickname: user.nickname
    }
    const token = jwt.sign({data: userData}, signature, {expiresIn: timeLife});
    return token;
}


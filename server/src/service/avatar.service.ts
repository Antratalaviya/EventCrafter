import { Avatar } from "../model/avatar.model"


const getAllAvatar = async () => {
    return await Avatar.find().select("-__v");
}

const createAvatar = async (url: string) => {
    return await Avatar.create({ url });
}

export default {
    getAllAvatar,
    createAvatar
}
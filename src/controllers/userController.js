import { getUserById } from "../models/userModel.js";

const getUserByIdController = async (req, res) => {
    const userId = req.params.id;
    console.log("user controlle  enteres")
    try {
        const user = await getUserById(userId);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { getUserByIdController };
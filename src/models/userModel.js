import db from '../config/database.js';

const getUserById = async (userId) => {
    console.log("user model entered")
    try{
        return await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);
    } catch(err) {
        throw err;
    }
};

export { getUserById };
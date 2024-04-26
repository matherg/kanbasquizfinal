
import model from "./model.js";

export const findUserByCredentials = async (username, password) => {
    try {
        const user = await model.findOne({ username: "strider", password: "aragorn123" });
        console.log(user); // Log the user object to see if it's found
        return user;
    } catch (error) {
        console.error("Error in findUserByCredentials:", error);
        throw error;
    }
};
export const createUser = (user) => {
    delete user._id
    return model.create(user);
}
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

import { User } from "./user.model.js";

export class UserService {

    static async findAllUsers() {
        return await User.findAll({
            where: {
                status: true
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
    }

    static async findOne(id) {
        return await User.findOne({
            where: {
                id, 
                status: true
            }, 
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
    }

    static async findOneByEmail(email) {
        return await User.findOne({
            where: {
                email,
                status: true
            }
        })
    }
  
    static async createUser(data) {
        return await User.create(data)
    }

    static async updateUser(user, data) {
        return await user.update(data)
    }

    static async deleteUser(user) {
        return await user.update({status: false})
    }
}
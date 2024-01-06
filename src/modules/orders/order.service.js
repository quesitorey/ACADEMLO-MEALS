import { User } from "../users/user.model.js";
import { Order } from "./order.model.js";

export class OrderService {
    static async findOneOrder(id){
        return await Order.findOne({
            where: {
                id
            }
        })
    }
    static async createOrder(data) {
        return await Order.create(data)
    }

    static async getAllOrders() {
        return await Order.findAll({
            where:{
                status: 'active'
            }
        })
    }

    static async updateOrder(order){
        return await order.update({status: 'completed'})
    }

    static async deleteOrder(order){
        return await order.update({status: 'cancelled'})
    }
}
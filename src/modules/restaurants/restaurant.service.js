import { Restaurant } from "./restaurant.model.js";

export class RestaurantService {
    static async findOneRestaurant(id) {
        return await Restaurant.findOne({
            where: {
                id,
                status: 'active'
            }
        })
    }

    static async findAllRestaurants() {
        return await Restaurant.findAll({
            where: {
                status: 'active'
            }
        })
    }

    static async createRestaurant(data) {
        return await Restaurant.create(data)    }

    static async updateRestaurant(restaurant, data) {
        return await restaurant.update(data)
    }

    static async deleteRestaurant(restaurant) {
        return await restaurant.update({status: 'inactive'})
    }
}
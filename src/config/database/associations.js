import { Meal } from "../../modules/meals/meal.model.js"
import { Order } from "../../modules/orders/order.model.js"
import { Restaurant } from "../../modules/restaurants/restaurant.model.js"
import { Review } from "../../modules/reviews/reviews.model.js"
import { User } from "../../modules/users/user.model.js"

export const initModel = () => {
    User.hasMany(Order)
    Order.belongsTo(User)
    Order.hasOne(Meal)
    Meal.hasOne(Order)
    Meal.belongsTo(Restaurant)
    Restaurant.hasMany(Meal)
    Restaurant.hasMany(Review)
    Review.belongsTo(Restaurant)
    User.hasMany(Review)
    Review.belongsTo(User)
}
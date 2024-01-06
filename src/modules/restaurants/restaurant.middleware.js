import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { RestaurantService } from "./restaurant.service.js";

export const validateExistRestaurant = catchAsync(async(req, res, next) => {
    const { id } = req.params

    const restaurant = await RestaurantService.findOneRestaurant(id)

    if(!restaurant) {
        return next( new AppError('This restaurant does not exist', 404) )
    }

    req.restaurant = restaurant
    next()
})
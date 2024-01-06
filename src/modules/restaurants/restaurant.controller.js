import { catchAsync } from "../../common/errors/catchAsync.js";
import { validatePartialResturant, validateResturant } from "./restaurant.schema.js";
import { RestaurantService } from "./restaurant.service.js";

export const getAllRestaurants = catchAsync(async(req, res, next) => {
    const restaurants = await RestaurantService.findAllRestaurants()

    return res.status(201).json(restaurants)
})
 
export const getOneRestaurant = catchAsync(async(req, res, next) => {
    const { restaurant } = req

    return res.status(200).json( restaurant )
})

export const createRestaurant = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages , restaurantData } = validateResturant(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const restaurant = RestaurantService.createRestaurant(restaurantData)

    return res.status(201).json(restaurant)
})

export const updateRestaurant = catchAsync(async(req, res, next) => {
    const { restaurant } = req
    const { hasError, errorMessages, restaurantData } = validatePartialResturant(req.body)

    const updatedRestaurant = await RestaurantService.updateRestaurant(restaurant, restaurantData)

    return res.status(201).json(updatedRestaurant)
})

export const deleteRestaurant = catchAsync(async(req, res, next) => {
    const { restaurant } = req

    await RestaurantService.deleteRestaurant(restaurant)

    return res.status(204).json()
})
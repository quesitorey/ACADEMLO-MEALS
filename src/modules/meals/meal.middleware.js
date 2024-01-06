import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { MealService } from "./meal.service.js";

export const validateExistMeal = catchAsync(async(req, res, next) => {
    const { id } = req.params

    const meal = await MealService.findOneMeal(id)

    if(!meal) {
        return next(new AppError('This meal does not exist', 404))
    }
    
    req.meal = meal
    next()
})
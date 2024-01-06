import { catchAsync } from "../../common/errors/catchAsync.js";
import { validateMeal, validatePartialMeal } from "./meal.schema.js";
import { MealService } from "./meal.service.js";

export const createMeal = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages, mealData } = validateMeal(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const meal = await MealService.createMeal(mealData)

    return res.status(201).json(meal)
})

export const getAllMeals = catchAsync(async(req, res, next) => {
    const meals = await MealService.findAllMeals()

    return res.status(201).json(meals)
})

export const getOneMeal = catchAsync(async(req, res, next) => {
    const { meal } = req

    return res.status(201).json(meal)
})

export const updateMeal = catchAsync(async(req, res, next) => {
    const { meal } = req
    const { hasError , errorMessages, mealData} = validatePartialMeal(req.body)

    const updatedMeal = await MealService.updateMeal(meal, mealData)

    return res.status(201).json(updatedMeal)
})

export const deleteMeal = catchAsync(async(req, res, next) => {
    const { meal } = req

    await MealService.deleteMeal(meal)

    return res.status(204).json()
})
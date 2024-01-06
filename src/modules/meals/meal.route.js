import express from 'express'
import { createMeal, deleteMeal, getAllMeals, getOneMeal, updateMeal } from './meal.controller.js'
import { validateExistMeal } from './meal.middleware.js'
import { protect } from '../users/user.middleware.js'

export const router = express.Router()

router.get('/', getAllMeals)
router.get('/:id', getOneMeal)
router.use(protect)
router.route('/:id')
    .post(createMeal)
    .patch(validateExistMeal, updateMeal)
    .delete(validateExistMeal, deleteMeal)